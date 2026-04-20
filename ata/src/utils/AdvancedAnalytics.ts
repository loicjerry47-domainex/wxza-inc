interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, any>;
  timestamp?: number;
  sessionId?: string;
  userId?: string;
}

interface UserSession {
  sessionId: string;
  startTime: number;
  lastActivity: number;
  pageViews: number;
  interactions: number;
  deviceInfo: DeviceInfo;
  referrer?: string;
}

interface DeviceInfo {
  userAgent: string;
  viewport: { width: number; height: number };
  deviceType: 'mobile' | 'tablet' | 'desktop';
  browser: string;
  os: string;
  connectionType?: string;
}

interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
  loadTime?: number;
  bundleSize?: number;
}

class AdvancedAnalyticsManager {
  private session: UserSession;
  private eventQueue: AnalyticsEvent[] = [];
  private performanceMetrics: PerformanceMetrics = {};
  private isOnline: boolean = true;
  private retryQueue: AnalyticsEvent[] = [];
  private flushInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.session = this.initializeSession();
    this.setupPerformanceTracking();
    this.setupOnlineStatusTracking();
    this.startPeriodicFlush();
    
    // Track page visibility changes
    this.setupVisibilityTracking();
  }

  private initializeSession(): UserSession {
    const sessionId = this.getOrCreateSessionId();
    const deviceInfo = this.getDeviceInfo();
    
    return {
      sessionId,
      startTime: Date.now(),
      lastActivity: Date.now(),
      pageViews: 0,
      interactions: 0,
      deviceInfo,
      referrer: document.referrer || undefined,
    };
  }

  private getOrCreateSessionId(): string {
    const existing = sessionStorage.getItem('analytics_session_id');
    if (existing) return existing;
    
    const newId = crypto.randomUUID();
    sessionStorage.setItem('analytics_session_id', newId);
    return newId;
  }

  private getDeviceInfo(): DeviceInfo {
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const deviceType = this.detectDeviceType();
    const browser = this.detectBrowser();
    const os = this.detectOS();
    const connectionType = this.getConnectionType();

    return {
      userAgent: navigator.userAgent,
      viewport,
      deviceType,
      browser,
      os,
      connectionType,
    };
  }

  private detectDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  private detectBrowser(): string {
    const ua = navigator.userAgent;
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    return 'Unknown';
  }

  private detectOS(): string {
    const platform = navigator.platform;
    const ua = navigator.userAgent;
    
    if (platform.includes('Win')) return 'Windows';
    if (platform.includes('Mac')) return 'macOS';
    if (platform.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
    return 'Unknown';
  }

  private getConnectionType(): string | undefined {
    // @ts-ignore - Navigator.connection is experimental
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    return connection?.effectiveType;
  }

  private setupPerformanceTracking(): void {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    try {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.performanceMetrics.lcp = entry.startTime;
          this.trackEvent({
            category: 'Performance',
            action: 'LCP',
            value: entry.startTime,
            customParameters: { metric: 'largest_contentful_paint' },
          });
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fid = entry.processingStart - entry.startTime;
          this.performanceMetrics.fid = fid;
          this.trackEvent({
            category: 'Performance',
            action: 'FID',
            value: fid,
            customParameters: { metric: 'first_input_delay' },
          });
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        this.performanceMetrics.cls = clsValue;
        this.trackEvent({
          category: 'Performance',
          action: 'CLS',
          value: clsValue,
          customParameters: { metric: 'cumulative_layout_shift' },
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

    } catch (error) {
      console.warn('Performance tracking setup failed:', error);
    }
  }

  private setupOnlineStatusTracking(): void {
    this.isOnline = navigator.onLine;
    
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.trackEvent({
        category: 'System',
        action: 'Online',
        label: 'Connection restored',
      });
      this.flushRetryQueue();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.trackEvent({
        category: 'System',
        action: 'Offline',
        label: 'Connection lost',
      });
    });
  }

  private setupVisibilityTracking(): void {
    let visibilityStart = Date.now();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        const visibleTime = Date.now() - visibilityStart;
        this.trackEvent({
          category: 'Engagement',
          action: 'Page_Hidden',
          value: visibleTime,
          customParameters: { visible_time: visibleTime },
        });
      } else {
        visibilityStart = Date.now();
        this.trackEvent({
          category: 'Engagement',
          action: 'Page_Visible',
        });
      }
    });
  }

  private startPeriodicFlush(): void {
    this.flushInterval = setInterval(() => {
      this.flushEvents();
    }, 30000); // Flush every 30 seconds
  }

  trackEvent(event: Omit<AnalyticsEvent, 'timestamp' | 'sessionId'>): void {
    const fullEvent: AnalyticsEvent = {
      ...event,
      timestamp: Date.now(),
      sessionId: this.session.sessionId,
      customParameters: {
        ...event.customParameters,
        deviceType: this.session.deviceInfo.deviceType,
        browser: this.session.deviceInfo.browser,
        viewport: `${this.session.deviceInfo.viewport.width}x${this.session.deviceInfo.viewport.height}`,
      },
    };

    this.eventQueue.push(fullEvent);
    this.session.lastActivity = Date.now();

    // Immediate flush for critical events
    if (this.isCriticalEvent(event)) {
      this.flushEvents();
    }
  }

  trackPageView(page: string, title?: string): void {
    this.session.pageViews++;
    this.trackEvent({
      category: 'Navigation',
      action: 'Page_View',
      label: page,
      customParameters: {
        page_title: title || document.title,
        page_url: window.location.href,
        referrer: document.referrer,
        page_view_count: this.session.pageViews,
      },
    });
  }

  trackUserInteraction(element: string, action: string, details?: Record<string, any>): void {
    this.session.interactions++;
    this.trackEvent({
      category: 'Interaction',
      action: `${element}_${action}`,
      customParameters: {
        ...details,
        interaction_count: this.session.interactions,
        time_since_load: Date.now() - this.session.startTime,
      },
    });
  }

  trackError(error: Error, context?: Record<string, any>): void {
    this.trackEvent({
      category: 'Error',
      action: 'JavaScript_Error',
      label: error.message,
      customParameters: {
        error_stack: error.stack,
        error_name: error.name,
        ...context,
      },
    });
  }

  trackPerformance(metrics: Partial<PerformanceMetrics>): void {
    Object.entries(metrics).forEach(([key, value]) => {
      if (value !== undefined) {
        this.trackEvent({
          category: 'Performance',
          action: key.toUpperCase(),
          value: value,
          customParameters: { metric: key },
        });
      }
    });
  }

  trackBusinessMetric(metric: string, value: number, context?: Record<string, any>): void {
    this.trackEvent({
      category: 'Business',
      action: metric,
      value: value,
      customParameters: context,
    });
  }

  getSessionInfo(): UserSession {
    return { ...this.session };
  }

  getPerformanceMetrics(): PerformanceMetrics {
    return { ...this.performanceMetrics };
  }

  private isCriticalEvent(event: Pick<AnalyticsEvent, 'category' | 'action'>): boolean {
    const criticalEvents = [
      { category: 'Error', action: 'JavaScript_Error' },
      { category: 'Business', action: 'Purchase' },
      { category: 'System', action: 'Offline' },
    ];

    return criticalEvents.some(
      critical => critical.category === event.category && critical.action === event.action
    );
  }

  private async flushEvents(): Promise<void> {
    if (this.eventQueue.length === 0) return;

    const eventsToSend = [...this.eventQueue];
    this.eventQueue = [];

    try {
      await this.sendEvents(eventsToSend);
    } catch (error) {
      console.warn('Failed to send analytics events:', error);
      this.retryQueue.push(...eventsToSend);
    }
  }

  private async flushRetryQueue(): Promise<void> {
    if (this.retryQueue.length === 0) return;

    const eventsToRetry = [...this.retryQueue];
    this.retryQueue = [];

    try {
      await this.sendEvents(eventsToRetry);
    } catch (error) {
      console.warn('Failed to retry analytics events:', error);
      // Don't add back to retry queue to prevent infinite loops
    }
  }

  private async sendEvents(events: AnalyticsEvent[]): Promise<void> {
    if (!this.isOnline) {
      throw new Error('Device is offline');
    }

    // In production, send to your analytics service
    if (process.env.NODE_ENV === 'production') {
      try {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            events,
            session: this.session,
            performance: this.performanceMetrics,
          }),
        });
      } catch (error) {
        throw new Error(`Analytics API failed: ${error}`);
      }
    } else {
      // Development mode - log to console
      console.group('📊 Analytics Events');
      events.forEach(event => {
        console.log(`${event.category}.${event.action}`, event);
      });
      console.groupEnd();
    }
  }

  destroy(): void {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
    this.flushEvents(); // Final flush
  }
}

// Global analytics instance
export const analytics = new AdvancedAnalyticsManager();

// Enhanced hook for analytics
export function useAdvancedAnalytics() {
  const trackVentureView = (ventureId: string, ventureName: string) => {
    analytics.trackEvent({
      category: 'Venture',
      action: 'View',
      label: ventureId,
      customParameters: { venture_name: ventureName },
    });
  };

  const trackVentureInteraction = (ventureId: string, action: string, details?: Record<string, any>) => {
    analytics.trackUserInteraction('venture', action, {
      venture_id: ventureId,
      ...details,
    });
  };

  const trackSearchEvent = (query: string, resultCount: number, filters?: Record<string, any>) => {
    analytics.trackEvent({
      category: 'Search',
      action: 'Query',
      label: query,
      value: resultCount,
      customParameters: { filters, result_count: resultCount },
    });
  };

  const trackFilterUsage = (filterType: string, filterValue: string) => {
    analytics.trackEvent({
      category: 'Filter',
      action: 'Apply',
      label: `${filterType}:${filterValue}`,
    });
  };

  const trackComparisonEvent = (ventureIds: string[], action: string) => {
    analytics.trackEvent({
      category: 'Comparison',
      action: action,
      customParameters: {
        venture_ids: ventureIds,
        venture_count: ventureIds.length,
      },
    });
  };

  return {
    trackVentureView,
    trackVentureInteraction,
    trackSearchEvent,
    trackFilterUsage,
    trackComparisonEvent,
    trackEvent: analytics.trackEvent.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    trackUserInteraction: analytics.trackUserInteraction.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    getSessionInfo: analytics.getSessionInfo.bind(analytics),
  };
}