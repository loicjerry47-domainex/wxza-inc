import React from "react";
import { Card, CardContent } from "../../ui/card";

interface Metric {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
  trend?: 'up' | 'down' | 'neutral';
}

interface MetricsGridProps {
  metrics: Metric[];
  columns?: number;
  isMobile?: boolean;
  variant?: 'default' | 'cyberpunk' | 'glassmorphism';
}

export function MetricsGrid({ 
  metrics, 
  columns = 4, 
  isMobile = false,
  variant = 'default'
}: MetricsGridProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'cyberpunk':
        return 'bg-slate-800/30 backdrop-blur-sm border-slate-700/30 text-center hover:bg-slate-800/40 transition-colors';
      case 'glassmorphism':
        return 'bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-white/20 dark:border-slate-700/20 text-center hover:bg-white/70 dark:hover:bg-slate-800/70 transition-colors';
      default:
        return 'text-center hover:shadow-md transition-shadow';
    }
  };

  const gridCols = isMobile ? Math.min(2, columns) : columns;
  const gridClass = `grid gap-3 sm:gap-4 ${
    gridCols === 4 ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-4' :
    gridCols === 3 ? 'grid-cols-2 sm:grid-cols-3' :
    gridCols === 2 ? 'grid-cols-2' :
    'grid-cols-1'
  }`;

  return (
    <div className={gridClass} role="region" aria-label="Metrics">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index} className={getVariantStyles()}>
            <CardContent className="pt-4 sm:pt-6 pb-3 sm:pb-4">
              <Icon 
                className={`h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 ${metric.color || 'text-primary'}`}
                aria-hidden="true"
              />
              <div className={`text-xl sm:text-2xl font-medium ${metric.color || 'text-foreground'}`}>
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">{metric.label}</div>
              {metric.trend && (
                <div className={`text-xs mt-1 ${
                  metric.trend === 'up' ? 'text-green-600' :
                  metric.trend === 'down' ? 'text-red-600' :
                  'text-muted-foreground'
                }`} aria-label={`Trend: ${metric.trend}`}>
                  {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '−'}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}