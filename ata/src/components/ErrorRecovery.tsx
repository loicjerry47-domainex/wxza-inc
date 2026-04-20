import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  AlertTriangle, 
  RefreshCw, 
  Download, 
  Wifi, 
  WifiOff,
  CheckCircle,
  XCircle,
  Clock,
  RotateCcw
} from 'lucide-react';

interface ErrorRecoveryProps {
  error: Error;
  resetError: () => void;
  context?: Record<string, any>;
  onRetry?: () => Promise<void>;
  showDetails?: boolean;
}

interface RecoveryAction {
  id: string;
  label: string;
  action: () => Promise<void> | void;
  icon: React.ReactNode;
  variant: 'primary' | 'secondary' | 'destructive';
  loading?: boolean;
}

interface ErrorContext {
  component?: string;
  userAgent: string;
  timestamp: number;
  url: string;
  viewport: { width: number; height: number };
  networkStatus: 'online' | 'offline';
  localStorage: boolean;
  sessionStorage: boolean;
}

export function ErrorRecovery({ 
  error, 
  resetError, 
  context = {}, 
  onRetry,
  showDetails = false 
}: ErrorRecoveryProps) {
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showErrorDetails, setShowErrorDetails] = useState(showDetails);
  const [autoRetryEnabled, setAutoRetryEnabled] = useState(true);
  const [autoRetryCountdown, setAutoRetryCountdown] = useState(0);

  // Enhanced error context
  const errorContext: ErrorContext = {
    component: context.component || 'Unknown',
    userAgent: navigator.userAgent,
    timestamp: Date.now(),
    url: window.location.href,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    networkStatus: isOnline ? 'online' : 'offline',
    localStorage: (() => {
      try {
        localStorage.setItem('__test__', 'test');
        localStorage.removeItem('__test__');
        return true;
      } catch {
        return false;
      }
    })(),
    sessionStorage: (() => {
      try {
        sessionStorage.setItem('__test__', 'test');
        sessionStorage.removeItem('__test__');
        return true;
      } catch {
        return false;
      }
    })(),
  };

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Auto-retry mechanism
  useEffect(() => {
    if (autoRetryEnabled && isOnline && onRetry && retryCount < 3) {
      const countdown = Math.min(5000 * Math.pow(2, retryCount), 30000); // Exponential backoff
      setAutoRetryCountdown(countdown);

      const interval = setInterval(() => {
        setAutoRetryCountdown(prev => {
          if (prev <= 1000) {
            handleRetry();
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [autoRetryEnabled, isOnline, onRetry, retryCount]);

  const handleRetry = useCallback(async () => {
    if (!onRetry) return;

    setIsRetrying(true);
    setRetryCount(prev => prev + 1);

    try {
      await onRetry();
      resetError();
    } catch (retryError) {
      console.warn('Retry failed:', retryError);
      // Error will remain visible
    } finally {
      setIsRetrying(false);
      setAutoRetryCountdown(0);
    }
  }, [onRetry, resetError]);

  const handleClearData = useCallback(async () => {
    try {
      // Clear relevant caches and storage
      if (errorContext.localStorage) {
        const keys = Object.keys(localStorage).filter(key => 
          key.startsWith('venture_') || key.startsWith('cache_')
        );
        keys.forEach(key => localStorage.removeItem(key));
      }

      if (errorContext.sessionStorage) {
        sessionStorage.clear();
      }

      // Clear browser cache if supported
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      }

      // Reload the page
      window.location.reload();
    } catch (clearError) {
      console.warn('Failed to clear data:', clearError);
    }
  }, [errorContext]);

  const handleDownloadErrorReport = useCallback(() => {
    const errorReport = {
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name,
      },
      context: errorContext,
      additionalContext: context,
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(errorReport, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `error-report-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [error, errorContext, context]);

  const recoveryActions: RecoveryAction[] = [
    {
      id: 'retry',
      label: isRetrying ? 'Retrying...' : 'Try Again',
      action: handleRetry,
      icon: <RefreshCw className={`h-4 w-4 ${isRetrying ? 'animate-spin' : ''}`} />,
      variant: 'primary',
      loading: isRetrying,
    },
    {
      id: 'refresh',
      label: 'Refresh Page',
      action: () => window.location.reload(),
      icon: <RotateCcw className="h-4 w-4" />,
      variant: 'secondary',
    },
    {
      id: 'clear-data',
      label: 'Clear Data & Reload',
      action: handleClearData,
      icon: <XCircle className="h-4 w-4" />,
      variant: 'destructive',
    },
  ];

  const getErrorSeverity = (): 'low' | 'medium' | 'high' => {
    if (error.name === 'ChunkLoadError' || error.message.includes('Loading chunk')) {
      return 'medium';
    }
    if (error.message.includes('Network') || !isOnline) {
      return 'high';
    }
    return 'low';
  };

  const getErrorSuggestions = (): string[] => {
    const suggestions: string[] = [];
    
    if (!isOnline) {
      suggestions.push('Check your internet connection');
    }
    
    if (error.name === 'ChunkLoadError') {
      suggestions.push('The application may have been updated. Try refreshing the page.');
    }
    
    if (error.message.includes('storage')) {
      suggestions.push('Your browser storage may be full. Try clearing data.');
    }
    
    if (retryCount >= 3) {
      suggestions.push('Multiple retry attempts failed. Consider refreshing the page.');
    }

    return suggestions;
  };

  const severity = getErrorSeverity();
  const suggestions = getErrorSuggestions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className={`rounded-full p-3 ${
              severity === 'high' ? 'bg-red-100 text-red-600' :
              severity === 'medium' ? 'bg-yellow-100 text-yellow-600' :
              'bg-blue-100 text-blue-600'
            }`}>
              <AlertTriangle className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-xl">
            {severity === 'high' ? 'Critical Error' : 
             severity === 'medium' ? 'Application Error' : 
             'Something went wrong'}
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            We're sorry for the inconvenience. Here are some options to get you back on track.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Network Status */}
          <Alert className={isOnline ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
            <div className="flex items-center gap-2">
              {isOnline ? <Wifi className="h-4 w-4 text-green-600" /> : <WifiOff className="h-4 w-4 text-red-600" />}
              <AlertDescription className={isOnline ? 'text-green-800' : 'text-red-800'}>
                {isOnline ? 'Connected to internet' : 'No internet connection detected'}
              </AlertDescription>
            </div>
          </Alert>

          {/* Auto-retry countdown */}
          {autoRetryEnabled && autoRetryCountdown > 0 && onRetry && (
            <Alert className="border-blue-200 bg-blue-50">
              <Clock className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                Auto-retry in {Math.ceil(autoRetryCountdown / 1000)} seconds...
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setAutoRetryEnabled(false)}
                  className="ml-2 h-auto p-0 text-blue-800 underline"
                >
                  Cancel
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Suggestions:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recovery Actions */}
          <div className="space-y-3">
            <h4 className="font-medium">Recovery Options:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {recoveryActions.map(action => (
                <Button
                  key={action.id}
                  variant={action.variant}
                  onClick={action.action}
                  disabled={action.loading || (!isOnline && action.id === 'retry')}
                  className="flex items-center gap-2"
                >
                  {action.icon}
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Error Details Toggle */}
          <div className="border-t pt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowErrorDetails(!showErrorDetails)}
              className="text-muted-foreground"
            >
              {showErrorDetails ? 'Hide' : 'Show'} Error Details
            </Button>

            {showErrorDetails && (
              <div className="mt-4 space-y-4">
                <div className="bg-muted rounded-lg p-4">
                  <h5 className="font-medium mb-2">Error Information:</h5>
                  <div className="space-y-1 text-sm font-mono">
                    <p><strong>Type:</strong> {error.name}</p>
                    <p><strong>Message:</strong> {error.message}</p>
                    <p><strong>Component:</strong> {errorContext.component}</p>
                    <p><strong>Retry Count:</strong> {retryCount}</p>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <h5 className="font-medium mb-2">System Information:</h5>
                  <div className="space-y-1 text-sm">
                    <p><strong>Browser:</strong> {navigator.userAgent.split(' ')[0]}</p>
                    <p><strong>Viewport:</strong> {errorContext.viewport.width}×{errorContext.viewport.height}</p>
                    <p><strong>Storage:</strong> 
                      {errorContext.localStorage ? ' Local✓' : ' Local✗'}
                      {errorContext.sessionStorage ? ' Session✓' : ' Session✗'}
                    </p>
                    <p><strong>Network:</strong> {errorContext.networkStatus}</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadErrorReport}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Error Report
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Enhanced Error Boundary with Recovery
interface EnhancedErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorId: string | null;
}

export class EnhancedErrorBoundary extends React.Component<
  React.PropsWithChildren<{
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
    fallback?: React.ComponentType<ErrorRecoveryProps>;
    context?: Record<string, any>;
  }>,
  EnhancedErrorBoundaryState
> {
  private retryTimeoutId: NodeJS.Timeout | null = null;

  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorId: null,
    };
  }

  static getDerivedStateFromError(error: Error): EnhancedErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorId: crypto.randomUUID(),
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const { onError } = this.props;
    if (onError) {
      onError(error, errorInfo);
    }

    // Log error to analytics
    try {
      // Analytics logging would go here
      console.error('Error Boundary caught error:', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        errorId: this.state.errorId,
      });
    } catch (logError) {
      console.warn('Failed to log error:', logError);
    }
  }

  handleRetry = async () => {
    // Clear error state to retry rendering
    this.setState({
      hasError: false,
      error: null,
      errorId: null,
    });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const Fallback = this.props.fallback || ErrorRecovery;
      
      return (
        <Fallback
          error={this.state.error}
          resetError={this.handleRetry}
          context={{
            ...this.props.context,
            errorId: this.state.errorId,
          }}
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}