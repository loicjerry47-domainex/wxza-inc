import React, { Component, ReactNode } from 'react';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <Alert className="border-destructive/50 text-destructive [&>svg]:text-destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="mt-2">
                <div className="space-y-3">
                  <div>
                    <p className="font-medium mb-1">Something went wrong</p>
                    <p className="text-sm opacity-90">
                      {this.state.error?.message || 'An unexpected error occurred'}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={this.handleReset}
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Try again
                    </Button>
                    
                    <Button 
                      onClick={() => window.location.reload()}
                      size="sm"
                    >
                      Reload page
                    </Button>
                  </div>
                  
                  {process.env.NODE_ENV === 'development' && this.state.error && (
                    <details className="mt-3">
                      <summary className="text-xs cursor-pointer">Technical details</summary>
                      <pre className="text-xs mt-2 p-2 bg-muted rounded overflow-auto max-h-32">
                        {this.state.error.stack}
                      </pre>
                    </details>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}