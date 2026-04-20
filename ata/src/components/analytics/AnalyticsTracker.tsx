import { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react';

// Enhanced analytics event types
interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: number;
  sessionId: string;
  userId?: string;
}

interface UserEngagement {
  ventureId: string;
  action: 'view' | 'click' | 'download' | 'share' | 'favorite' | 'compare';
  duration?: number;
  scrollDepth?: number;
  timestamp: number;
}

interface ConversionFunnel {
  step: 'landing' | 'browse' | 'venture_detail' | 'analytics' | 'contact' | 'download';
  ventureId?: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

interface AnalyticsContextType {
  sessionId: string;
  userId?: string;
  trackEvent: (event: string, properties?: Record<string, any>) => void;
  trackVentureEngagement: (engagement: Omit<UserEngagement, 'timestamp'>) => void;
  trackConversion: (conversion: Omit<ConversionFunnel, 'timestamp'>) => void;
  trackPageView: (page: string, properties?: Record<string, any>) => void;
  getEngagementMetrics: () => EngagementMetrics;
}

interface EngagementMetrics {
  totalEvents: number;
  uniqueVenturesViewed: number;
  sessionDuration: number;
  averageTimePerVenture: number;
  conversionFunnel: Record<string, number>;
  topVentures: Array<{ ventureId: string; engagementScore: number }>;
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}

interface AnalyticsProviderProps {
  children: ReactNode;
  userId?: string;
}

export function AnalyticsProvider({ children, userId }: AnalyticsProviderProps) {
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [engagements, setEngagements] = useState<UserEngagement[]>([]);
  const [conversions, setConversions] = useState<ConversionFunnel[]>([]);
  const [sessionStart] = useState(Date.now());

  // Enhanced event tracking with local storage persistence
  const trackEvent = (event: string, properties: Record<string, any> = {}) => {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        userAgent: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        referrer: document.referrer,
        url: window.location.href,
      },
      timestamp: Date.now(),
      sessionId,
      userId,
    };

    setEvents(prev => {
      const newEvents = [...prev, analyticsEvent];
      // Persist to localStorage for crash recovery
      // Debounce this if events come in bursts, but for now it's likely okay as trackEvent isn't high frequency (except scroll depth)
      try {
        localStorage.setItem(`analytics_events_${sessionId}`, JSON.stringify(newEvents.slice(-100))); // Keep last 100 events
      } catch (e) {
        console.warn('Failed to persist analytics events:', e);
      }
      return newEvents;
    });

    // In production, send to analytics service
    if (process.env.NODE_ENV === 'production') {
      // Example: sendToAnalyticsService(analyticsEvent);
    }

    console.log('📊 Analytics Event:', analyticsEvent);
  };

  const trackVentureEngagement = (engagement: Omit<UserEngagement, 'timestamp'>) => {
    const fullEngagement: UserEngagement = {
      ...engagement,
      timestamp: Date.now(),
    };

    setEngagements(prev => [...prev, fullEngagement]);
    
    // Track as general event too
    trackEvent('venture_engagement', {
      venture_id: engagement.ventureId,
      action: engagement.action,
      duration: engagement.duration,
      scroll_depth: engagement.scrollDepth,
    });
  };

  const trackConversion = (conversion: Omit<ConversionFunnel, 'timestamp'>) => {
    const fullConversion: ConversionFunnel = {
      ...conversion,
      timestamp: Date.now(),
    };

    setConversions(prev => [...prev, fullConversion]);
    
    trackEvent('conversion_step', {
      step: conversion.step,
      venture_id: conversion.ventureId,
      metadata: conversion.metadata,
    });
  };

  const trackPageView = (page: string, properties: Record<string, any> = {}) => {
    trackEvent('page_view', {
      page,
      ...properties,
    });
  };

  const getEngagementMetrics = (): EngagementMetrics => {
    const sessionDuration = Date.now() - sessionStart;
    const uniqueVentures = new Set(engagements.map(e => e.ventureId));
    
    // Calculate engagement scores
    const ventureEngagement = engagements.reduce((acc, engagement) => {
      const score = 
        (engagement.action === 'view' ? 1 : 0) +
        (engagement.action === 'click' ? 2 : 0) +
        (engagement.action === 'favorite' ? 5 : 0) +
        (engagement.action === 'compare' ? 3 : 0) +
        (engagement.action === 'download' ? 10 : 0) +
        (engagement.action === 'share' ? 8 : 0) +
        ((engagement.duration || 0) / 1000 * 0.1); // Time bonus

      acc[engagement.ventureId] = (acc[engagement.ventureId] || 0) + score;
      return acc;
    }, {} as Record<string, number>);

    const topVentures = Object.entries(ventureEngagement)
      .map(([ventureId, score]) => ({ ventureId, engagementScore: score }))
      .sort((a, b) => b.engagementScore - a.engagementScore)
      .slice(0, 5);

    const conversionFunnel = conversions.reduce((acc, conversion) => {
      acc[conversion.step] = (acc[conversion.step] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalEvents: events.length,
      uniqueVenturesViewed: uniqueVentures.size,
      sessionDuration,
      averageTimePerVenture: uniqueVentures.size > 0 ? sessionDuration / uniqueVentures.size : 0,
      conversionFunnel,
      topVentures,
    };
  };

  // Track initial page load
  useEffect(() => {
    trackPageView('app_load', {
      session_id: sessionId,
      user_id: userId,
    });

    // Track conversion funnel entry
    trackConversion({ step: 'landing' });

    // Performance tracking
    if (typeof window !== 'undefined' && 'performance' in window) {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (perfData) {
        trackEvent('performance_metrics', {
          load_time: perfData.loadEventEnd - perfData.loadEventStart,
          dom_ready: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
          first_byte: perfData.responseStart - perfData.requestStart,
        });
      }
    }

    // Track viewport and device info
    trackEvent('device_info', {
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      user_agent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    // Cleanup function to send final session data
    return () => {
      const finalMetrics = getEngagementMetrics();
      trackEvent('session_end', {
        session_duration: finalMetrics.sessionDuration,
        total_events: finalMetrics.totalEvents,
        unique_ventures_viewed: finalMetrics.uniqueVenturesViewed,
        top_venture: finalMetrics.topVentures[0]?.ventureId,
      });
    };
  }, []);

  // Track scroll depth - Optimized
  useEffect(() => {
    let maxScrollDepth = 0;
    let scrollTimeout: NodeJS.Timeout;
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Prevent division by zero or negative height issues
        if (documentHeight <= 0) {
          rafId = null;
          return;
        }

        const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);
        
        if (scrollPercentage > maxScrollDepth) {
          maxScrollDepth = scrollPercentage;
          
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            trackEvent('scroll_depth', {
              depth_percentage: maxScrollDepth,
              absolute_position: scrollTop,
            });
          }, 1000); // Debounce scroll tracking
        }
        
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Track time on page
  useEffect(() => {
    const startTime = Date.now();
    let isActive = true;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isActive = false;
        trackEvent('page_blur', {
          time_on_page: Date.now() - startTime,
        });
      } else {
        isActive = true;
        trackEvent('page_focus');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (isActive) {
        trackEvent('page_unload', {
          time_on_page: Date.now() - startTime,
        });
      }
    };
  }, []);

  const value: AnalyticsContextType = {
    sessionId,
    userId,
    trackEvent,
    trackVentureEngagement,
    trackConversion,
    trackPageView,
    getEngagementMetrics,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

// Hook for real-time analytics dashboard
export function useRealTimeAnalytics() {
  const analytics = useAnalytics();
  const [metrics, setMetrics] = useState<EngagementMetrics | null>(null);

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics(analytics.getEngagementMetrics());
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [analytics]);

  return metrics;
}

// Error tracking hook
export function useErrorTracking() {
  const { trackEvent } = useAnalytics();

  const trackError = (error: Error, errorInfo?: any) => {
    trackEvent('error_occurred', {
      error_message: error.message,
      error_stack: error.stack,
      error_info: errorInfo,
      url: window.location.href,
      user_agent: navigator.userAgent,
    });
  };

  const trackApiError = (endpoint: string, status: number, message: string) => {
    trackEvent('api_error', {
      endpoint,
      status_code: status,
      error_message: message,
      timestamp: Date.now(),
    });
  };

  return { trackError, trackApiError };
}
