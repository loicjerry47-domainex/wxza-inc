import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Star, Activity, Calendar, Briefcase, Menu } from "lucide-react";
import { getCurrentDate } from "./utils/portfolioUtils";
import { useState } from "react";

interface DashboardHeaderProps {
  totalCompanies: number;
  onSwitchToShowcase: () => void;
}

export function DashboardHeader({ totalCompanies, onSwitchToShowcase }: DashboardHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="mb-6 sm:mb-8">
      {/* Main Header Content */}
      <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-start lg:justify-between">
        {/* Title and Description */}
        <div className="space-y-2 sm:space-y-3 lg:space-y-2 flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent leading-tight">
            Enterprise Venture Analytics
          </h1>
          <p className="text-base sm:text-lg lg:text-lg text-muted-foreground leading-relaxed">
            Comprehensive portfolio intelligence and strategic insights
          </p>
          
          {/* Mobile-first info row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5 min-w-0">
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="truncate">Updated: {getCurrentDate()}</span>
            </div>
            <div className="flex items-center gap-1.5 min-w-0">
              <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="truncate">{totalCompanies} Active Ventures</span>
            </div>
          </div>
        </div>
        
        {/* Action Buttons - Mobile Optimized */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-3 lg:ml-4">
          {/* Primary Action Button */}
          <Button 
            onClick={onSwitchToShowcase}
            className="flex items-center justify-center gap-2 h-11 sm:h-10 px-4 sm:px-4 lg:px-6 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Star className="h-4 w-4 flex-shrink-0" />
            <span className="whitespace-nowrap">Showcase View</span>
          </Button>
          
          {/* Status Badge */}
          <Badge 
            variant="secondary" 
            className="flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 h-11 sm:h-auto bg-secondary/80 hover:bg-secondary transition-colors"
          >
            <Activity className="h-3 w-3 text-green-600 animate-pulse flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Live Data</span>
          </Badge>
        </div>
      </div>

      {/* Optional: Mobile Menu Toggle for future expandability */}
      <div className="sm:hidden mt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-full justify-between text-muted-foreground"
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          <span className="text-sm">Quick Actions</span>
          <Menu className="h-4 w-4" />
        </Button>
        
        {/* Expandable Quick Actions for Mobile */}
        {isMenuOpen && (
          <div className="mt-3 p-4 bg-muted/30 rounded-lg border border-border/50 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center p-3 bg-background/60 rounded-md border border-border/30">
                <div className="text-sm font-medium text-primary">{totalCompanies}</div>
                <div className="text-xs text-muted-foreground">Ventures</div>
              </div>
              <div className="text-center p-3 bg-background/60 rounded-md border border-border/30">
                <div className="text-sm font-medium text-green-600">$630B+</div>
                <div className="text-xs text-muted-foreground">Market Cap</div>
              </div>
            </div>
            <div className="text-xs text-center text-muted-foreground pt-2 border-t border-border/30">
              Real-time portfolio analytics and insights
            </div>
          </div>
        )}
      </div>
    </div>
  );
}