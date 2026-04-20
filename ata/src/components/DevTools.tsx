import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { 
  Settings, 
  Monitor, 
  Database, 
  Activity, 
  Smartphone, 
  Tablet, 
  Laptop,
  Eye,
  EyeOff,
  RefreshCw,
  Download,
  Trash2,
  BarChart3,
  Clock,
  Wifi,
  Cpu,
  HardDrive
} from 'lucide-react';
import { globalCache, ventureCache, analyticsCache } from '../utils/CacheManager';
import { analytics } from '../utils/AdvancedAnalytics';

interface DevToolsProps {
  isVisible: boolean;
  onToggle: () => void;
}

interface PerformanceData {
  renderCount: number;
  lastRender: number;
  avgRenderTime: number;
  memoryUsage?: number;
  cacheHitRate?: number;
}

const BREAKPOINTS = {
  mobile: { max: 767 },
  tablet: { min: 768, max: 1023 },
  desktop: { min: 1024 },
};

export function DevTools({ isVisible, onToggle }: DevToolsProps) {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('desktop');
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    renderCount: 0,
    lastRender: Date.now(),
    avgRenderTime: 0,
  });
  const [refreshKey, setRefreshKey] = useState(0);

  // Only render in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  // Monitor viewport changes
  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width <= BREAKPOINTS.mobile.max) {
        setCurrentBreakpoint('mobile');
      } else if (width <= BREAKPOINTS.tablet.max!) {
        setCurrentBreakpoint('tablet');
      } else {
        setCurrentBreakpoint('desktop');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  // Performance monitoring
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      setPerformanceData(prev => ({
        renderCount: prev.renderCount + 1,
        lastRender: Date.now(),
        avgRenderTime: (prev.avgRenderTime + renderTime) / 2,
        memoryUsage: (performance as any).memory?.usedJSHeapSize,
      }));
    };
  }, [refreshKey]); // Add dependency on refreshKey to control when this effect runs

  const cacheStats = useMemo(() => ({
    global: globalCache.getStats(),
    venture: ventureCache.getStats(),
    analytics: analyticsCache.getStats(),
  }), [refreshKey]);

  const sessionInfo = useMemo(() => analytics.getSessionInfo(), [refreshKey]);
  const performanceMetrics = useMemo(() => analytics.getPerformanceMetrics(), [refreshKey]);

  const handleClearCache = (cacheType: 'global' | 'venture' | 'analytics' | 'all') => {
    switch (cacheType) {
      case 'global':
        globalCache.clear();
        break;
      case 'venture':
        ventureCache.clear();
        break;
      case 'analytics':
        analyticsCache.clear();
        break;
      case 'all':
        globalCache.clear();
        ventureCache.clear();
        analyticsCache.clear();
        break;
    }
    setRefreshKey(prev => prev + 1);
  };

  const handleExportData = () => {
    const data = {
      timestamp: new Date().toISOString(),
      session: sessionInfo,
      performance: performanceMetrics,
      cache: cacheStats,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        breakpoint: currentBreakpoint,
      },
      userAgent: navigator.userAgent,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devtools-export-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isVisible) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-4 left-4 z-50 bg-black/80 text-white hover:bg-black/90 no-print"
        size="sm"
      >
        <Settings className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-96 max-h-[80vh] overflow-hidden bg-black/90 text-white rounded-lg border border-gray-700 no-print">
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span className="font-medium">Dev Tools</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setRefreshKey(prev => prev + 1)}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
          >
            <RefreshCw className="h-3 w-3" />
          </Button>
          <Button
            onClick={onToggle}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
          >
            <EyeOff className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="max-h-[calc(80vh-60px)] overflow-y-auto">
        <Tabs defaultValue="viewport" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="viewport" className="text-xs">Viewport</TabsTrigger>
            <TabsTrigger value="performance" className="text-xs">Perf</TabsTrigger>
            <TabsTrigger value="cache" className="text-xs">Cache</TabsTrigger>
            <TabsTrigger value="session" className="text-xs">Session</TabsTrigger>
          </TabsList>

          <TabsContent value="viewport" className="p-3 space-y-3">
            <div className="flex items-center gap-2">
              {currentBreakpoint === 'mobile' && <Smartphone className="h-4 w-4" />}
              {currentBreakpoint === 'tablet' && <Tablet className="h-4 w-4" />}
              {currentBreakpoint === 'desktop' && <Laptop className="h-4 w-4" />}
              <Badge variant="secondary" className="text-xs">
                {currentBreakpoint}
              </Badge>
            </div>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Width:</span>
                <span>{window.innerWidth}px</span>
              </div>
              <div className="flex justify-between">
                <span>Height:</span>
                <span>{window.innerHeight}px</span>
              </div>
              <div className="flex justify-between">
                <span>Ratio:</span>
                <span>{(window.innerWidth / window.innerHeight).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Device Pixel Ratio:</span>
                <span>{window.devicePixelRatio}</span>
              </div>
            </div>

            <Separator className="bg-gray-700" />

            <div className="space-y-2">
              <h4 className="text-xs font-medium">Breakpoint Tests:</h4>
              {Object.entries(BREAKPOINTS).map(([name, range]) => {
                const isActive = currentBreakpoint === name;
                return (
                  <div key={name} className="flex items-center justify-between text-xs">
                    <span>{name}</span>
                    <Badge variant={isActive ? "default" : "outline"} className="text-xs">
                      {range.min ? `${range.min}+` : `<${range.max! + 1}`}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="p-3 space-y-3">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Renders:</span>
                <span>{performanceData.renderCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Avg Render:</span>
                <span>{performanceData.avgRenderTime.toFixed(2)}ms</span>
              </div>
              {performanceData.memoryUsage && (
                <div className="flex justify-between">
                  <span>Memory:</span>
                  <span>{(performanceData.memoryUsage / 1024 / 1024).toFixed(1)}MB</span>
                </div>
              )}
            </div>

            <Separator className="bg-gray-700" />

            <div className="space-y-2">
              <h4 className="text-xs font-medium">Core Web Vitals:</h4>
              <div className="space-y-1 text-xs">
                {performanceMetrics.lcp && (
                  <div className="flex justify-between">
                    <span>LCP:</span>
                    <Badge variant={performanceMetrics.lcp < 2500 ? "default" : "destructive"} className="text-xs">
                      {performanceMetrics.lcp.toFixed(0)}ms
                    </Badge>
                  </div>
                )}
                {performanceMetrics.fid && (
                  <div className="flex justify-between">
                    <span>FID:</span>
                    <Badge variant={performanceMetrics.fid < 100 ? "default" : "destructive"} className="text-xs">
                      {performanceMetrics.fid.toFixed(0)}ms
                    </Badge>
                  </div>
                )}
                {performanceMetrics.cls && (
                  <div className="flex justify-between">
                    <span>CLS:</span>
                    <Badge variant={performanceMetrics.cls < 0.1 ? "default" : "destructive"} className="text-xs">
                      {performanceMetrics.cls.toFixed(3)}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cache" className="p-3 space-y-3">
            <div className="space-y-3">
              {Object.entries(cacheStats).map(([name, stats]) => (
                <div key={name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-medium capitalize">{name}</h4>
                    <Button
                      onClick={() => handleClearCache(name as any)}
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs text-white hover:bg-white/10"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span>{stats.totalSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expired:</span>
                      <span>{stats.expired}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Memory:</span>
                      <span>{(stats.memoryUsage / 1024).toFixed(1)}KB</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="bg-gray-700" />

            <Button
              onClick={() => handleClearCache('all')}
              variant="destructive"
              size="sm"
              className="w-full text-xs"
            >
              Clear All Caches
            </Button>
          </TabsContent>

          <TabsContent value="session" className="p-3 space-y-3">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Session ID:</span>
                <span className="font-mono text-xs truncate">{sessionInfo.sessionId.slice(0, 8)}...</span>
              </div>
              <div className="flex justify-between">
                <span>Page Views:</span>
                <span>{sessionInfo.pageViews}</span>
              </div>
              <div className="flex justify-between">
                <span>Interactions:</span>
                <span>{sessionInfo.interactions}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span>{Math.round((Date.now() - sessionInfo.startTime) / 1000)}s</span>
              </div>
            </div>

            <Separator className="bg-gray-700" />

            <div className="space-y-2">
              <h4 className="text-xs font-medium">Device Info:</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span>{sessionInfo.deviceInfo.deviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Browser:</span>
                  <span>{sessionInfo.deviceInfo.browser}</span>
                </div>
                <div className="flex justify-between">
                  <span>OS:</span>
                  <span>{sessionInfo.deviceInfo.os}</span>
                </div>
                {sessionInfo.deviceInfo.connectionType && (
                  <div className="flex justify-between">
                    <span>Connection:</span>
                    <span>{sessionInfo.deviceInfo.connectionType}</span>
                  </div>
                )}
              </div>
            </div>

            <Separator className="bg-gray-700" />

            <Button
              onClick={handleExportData}
              variant="outline"
              size="sm"
              className="w-full text-xs"
            >
              <Download className="h-3 w-3 mr-1" />
              Export Data
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Hook for using dev tools
export function useDevTools() {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle dev tools with keyboard shortcut (Ctrl/Cmd + Shift + D)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'D') {
        event.preventDefault();
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    isVisible,
    setIsVisible,
    toggle: () => setIsVisible(prev => !prev),
  };
}