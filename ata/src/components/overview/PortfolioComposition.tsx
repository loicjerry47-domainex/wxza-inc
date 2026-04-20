import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BarChart3, Target } from "lucide-react";

interface PortfolioCompositionProps {
  statusDistribution: Record<string, number>;
  categoryDistribution: Record<string, number>;
  totalVentures: number;
}

export function PortfolioComposition({ 
  statusDistribution, 
  categoryDistribution, 
  totalVentures 
}: PortfolioCompositionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <Card>
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <BarChart3 className="h-5 w-5 flex-shrink-0" />
            <span className="leading-tight">Venture Development Stage</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3 sm:space-y-4">
            {Object.entries(statusDistribution).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    status === 'Scale' ? 'bg-purple-500' :
                    status === 'Growth' ? 'bg-blue-500' :
                    status === 'Active' ? 'bg-green-500' : 'bg-orange-500'
                  }`}></div>
                  <span className="font-medium text-sm sm:text-base truncate">{status}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xl sm:text-2xl font-bold">{count}</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">ventures</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Target className="h-5 w-5 flex-shrink-0" />
            <span className="leading-tight">Technology Categories</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3 sm:space-y-4">
            {Object.entries(categoryDistribution).map(([category, count]) => (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate pr-2">{category}</span>
                  <span className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">
                    {count} ventures
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${(count / totalVentures) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}