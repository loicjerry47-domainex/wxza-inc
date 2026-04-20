import React from "react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";

interface PrototypeHeaderProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  statusBadge?: {
    text: string;
    icon?: React.ReactNode;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
  stats?: {
    label: string;
    value: string;
  };
  gradient?: string;
  backgroundColor?: string;
  isMobile?: boolean;
}

export function PrototypeHeader({
  title,
  subtitle,
  icon,
  statusBadge,
  stats,
  gradient = "from-blue-500/10 to-purple-500/10",
  backgroundColor = "bg-white/80 dark:bg-gray-900/80",
  isMobile = false
}: PrototypeHeaderProps) {
  return (
    <header 
      className={`${backgroundColor} backdrop-blur-xl border-b sticky top-0 z-50`}
      role="banner"
    >
      <div className="flex items-center justify-between p-3 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="relative flex-shrink-0">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${gradient} rounded-2xl p-2 sm:p-3 shadow-lg`}>
              {icon}
            </div>
          </div>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl font-medium truncate">{title}</h1>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">{subtitle}</p>
          </div>
        </div>
        
        {!isMobile && (
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            {stats && (
              <div className="text-right">
                <div className="text-xs sm:text-sm text-muted-foreground">{stats.label}</div>
                <div className="text-lg sm:text-xl font-medium">{stats.value}</div>
              </div>
            )}
            {statusBadge && (
              <Badge variant={statusBadge.variant || 'secondary'} className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
                {statusBadge.icon}
                <span className="ml-1">{statusBadge.text}</span>
              </Badge>
            )}
          </div>
        )}
      </div>
    </header>
  );
}