import { useEffect } from 'react';
import { analytics } from '../utils/AdvancedAnalytics';

/**
 * Performance Monitor Component
 * Tracks Core Web Vitals and reports performance metrics
 * Provides real-time monitoring and alerting for performance issues
 */
export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return; // Only monitor in production
    }

    // Track page load performance
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        const metrics = {
          dns: navigation.domainLookupEnd - navigation.domainLookupStart,
          tcp: navigation.connectEnd - navigation.connectStart,
          ttfb: navigation.responseStart - navigation.requestStart,
          download: navigation.responseEnd - navigation.responseStart,
          domInteractive: navigation.domInteractive - navigation.fetchStart,
          domComplete: navigation.domComplete - navigation.fetchStart,
          loadComplete: navigation.loadEventEnd - navigation.fetchStart,
        };

        analytics.trackPerformance({
          ttfb: metrics.ttfb,
          loadTime: metrics.loadComplete,
        });

        // Alert if performance is poor
        if (metrics.ttfb > 600) {
          console.warn('⚠️ Slow TTFB detected:', metrics.ttfb.toFixed(0), 'ms');
        }
        if (metrics.loadComplete > 3000) {
          console.warn('⚠️ Slow page load detected:', metrics.loadComplete.toFixed(0), 'ms');
        }
      }
    }

    // Track resource timing
    if ('PerformanceObserver' in window) {
      try {
        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          const lcp = lastEntry.startTime;

          analytics.trackPerformance({ lcp });

          if (lcp > 2500) {
            console.warn('⚠️ Poor LCP detected:', lcp.toFixed(0), 'ms');
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const fid = entry.processingStart - entry.startTime;
            analytics.trackPerformance({ fid });

            if (fid > 100) {
              console.warn('⚠️ Poor FID detected:', fid.toFixed(0), 'ms');
            }
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }

          analytics.trackPerformance({ cls: clsValue });

          if (clsValue > 0.1) {
            console.warn('⚠️ Poor CLS detected:', clsValue.toFixed(3));
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Long tasks monitoring
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              console.warn('⚠️ Long task detected:', entry.duration.toFixed(0), 'ms');
              analytics.trackEvent({
                category: 'Performance',
                action: 'Long_Task',
                value: entry.duration,
                customParameters: {
                  duration: entry.duration,
                  startTime: entry.startTime,
                },
              });
            }
          }
        });
        longTaskObserver.observe({ entryTypes: ['longtask'] });

        // Cleanup observers
        return () => {
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
          longTaskObserver.disconnect();
        };
      } catch (error) {
        console.warn('Performance monitoring setup failed:', error);
      }
    }

    // Track bundle size (approximate)
    if ('performance' in window) {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const jsResources = resources.filter(r => r.name.includes('.js'));
      const totalJsSize = jsResources.reduce((sum, r) => sum + (r.transferSize || 0), 0);
      
      if (totalJsSize > 0) {
        const bundleSizeKB = totalJsSize / 1024;
        analytics.trackEvent({
          category: 'Performance',
          action: 'Bundle_Size',
          value: bundleSizeKB,
          customParameters: {
            size_kb: bundleSizeKB.toFixed(0),
            resource_count: jsResources.length,
          },
        });

        if (bundleSizeKB > 500) {
          console.warn('⚠️ Large bundle size:', bundleSizeKB.toFixed(0), 'KB');
        }
      }
    }

    // Memory monitoring (Chrome only)
    if ('memory' in performance) {
      const checkMemory = () => {
        const memory = (performance as any).memory;
        if (memory) {
          const usedMB = memory.usedJSHeapSize / 1024 / 1024;
          const limitMB = memory.jsHeapSizeLimit / 1024 / 1024;
          const percentUsed = (usedMB / limitMB) * 100;

          if (percentUsed > 80) {
            console.warn('⚠️ High memory usage:', usedMB.toFixed(0), 'MB (', percentUsed.toFixed(0), '%)');
            analytics.trackEvent({
              category: 'Performance',
              action: 'High_Memory',
              value: usedMB,
              customParameters: {
                used_mb: usedMB.toFixed(0),
                limit_mb: limitMB.toFixed(0),
                percent: percentUsed.toFixed(0),
              },
            });
          }
        }
      };

      const memoryInterval = setInterval(checkMemory, 30000); // Check every 30s
      return () => clearInterval(memoryInterval);
    }
  }, []);

  return null; // This component doesn't render anything
}

/**
 * Hook for component-specific performance tracking
 */
export function useComponentPerformance(componentName: string) {
  useEffect(() => {
    const startTime = performance.now();
    let renderCount = 0;

    return () => {
      renderCount++;
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      if (renderTime > 16) { // More than one frame (60fps)
        console.warn(`⚠️ Slow render in ${componentName}:`, renderTime.toFixed(2), 'ms');
        analytics.trackEvent({
          category: 'Performance',
          action: 'Slow_Render',
          label: componentName,
          value: renderTime,
          customParameters: {
            component: componentName,
            render_count: renderCount,
            render_time: renderTime.toFixed(2),
          },
        });
      }
    };
  });
}

/**
 * Report performance metrics to console in development
 */
export function reportWebVitals(metric: any) {
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Web Vital:', metric.name, metric.value.toFixed(0), metric.rating);
  }

  analytics.trackEvent({
    category: 'Web Vitals',
    action: metric.name,
    value: metric.value,
    customParameters: {
      id: metric.id,
      name: metric.name,
      rating: metric.rating,
      delta: metric.delta,
    },
  });
}
