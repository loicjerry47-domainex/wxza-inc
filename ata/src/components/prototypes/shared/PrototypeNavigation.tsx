import React from "react";
import { Button } from "../../ui/button";

interface NavigationTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface PrototypeNavigationProps {
  tabs: NavigationTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  isMobile?: boolean;
  variant?: 'glassmorphism' | 'cyberpunk' | 'urban' | 'default';
}

export function PrototypeNavigation({ 
  tabs, 
  activeTab, 
  onTabChange, 
  isMobile = false,
  variant = 'default'
}: PrototypeNavigationProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'glassmorphism':
        return {
          container: 'bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-1.5 sm:p-2 rounded-2xl border border-white/20 dark:border-slate-700/20',
          active: 'bg-blue-600 text-white shadow-lg',
          inactive: 'text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-700/60'
        };
      case 'cyberpunk':
        return {
          container: 'bg-gray-900/50 p-1.5 sm:p-2 rounded-none border border-red-500/30',
          active: 'bg-red-600 text-black border border-red-400 shadow-lg shadow-red-500/50',
          inactive: 'text-red-400 hover:bg-red-500/20 border border-red-500/30'
        };
      case 'urban':
        return {
          container: 'bg-gray-900/50 p-1 sm:p-1.5 rounded-none border border-green-500/30',
          active: 'bg-green-600 text-white border border-green-400 shadow-lg',
          inactive: 'text-green-300 hover:bg-green-500/20 border border-transparent'
        };
      default:
        return {
          container: 'bg-muted/50 p-1 sm:p-1.5 rounded-2xl',
          active: 'bg-primary text-primary-foreground shadow-lg',
          inactive: 'text-muted-foreground hover:bg-muted/80'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <nav 
      className="px-3 sm:px-4 pb-3 sm:pb-4" 
      role="navigation" 
      aria-label="Prototype sections"
    >
      <div className={`flex gap-1 ${styles.container}`}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 rounded-xl font-medium transition-all touch-target ${
                isActive ? styles.active : styles.inactive
              }`}
              aria-current={isActive ? 'page' : undefined}
              aria-label={tab.label}
            >
              <Icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              {!isMobile && <span className="ml-2 truncate">{tab.label}</span>}
            </Button>
          );
        })}
      </div>
    </nav>
  );
}