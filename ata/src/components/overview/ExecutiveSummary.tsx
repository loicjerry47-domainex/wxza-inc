import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Award } from "lucide-react";
import { PortfolioMetrics, formatCurrency } from "../utils/portfolioUtils";

interface ExecutiveSummaryProps {
  metrics: PortfolioMetrics;
}

export function ExecutiveSummary({ metrics }: ExecutiveSummaryProps) {
  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader className="pb-4 sm:pb-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Award className="h-5 w-5 flex-shrink-0" />
          <span className="leading-tight">Executive Portfolio Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-bold text-primary leading-none">{metrics.totalCompanies}</div>
            <div className="text-sm text-muted-foreground leading-tight">Active Ventures</div>
            <div className="text-xs text-green-600">Portfolio Growth</div>
          </div>
          
          <div className="space-y-2 text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-bold text-primary leading-none">{formatCurrency(metrics.totalFunding)}</div>
            <div className="text-sm text-muted-foreground leading-tight">Total Funding Ask</div>
            <div className="text-xs text-blue-600">Capital Required</div>
          </div>
          
          <div className="space-y-2 text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-bold text-primary leading-none">{formatCurrency(metrics.totalCurrentRevenue)}</div>
            <div className="text-sm text-muted-foreground leading-tight">Current Revenue</div>
            <div className="text-xs text-green-600">Operational Traction</div>
          </div>
          
          <div className="space-y-2 text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-bold text-primary leading-none">{formatCurrency(metrics.totalRevenue)}</div>
            <div className="text-sm text-muted-foreground leading-tight">Revenue Potential</div>
            <div className="text-xs text-purple-600">5-Year Projection</div>
          </div>
          
          <div className="space-y-2 text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-bold text-primary leading-none">{metrics.avgROI.toFixed(0)}×</div>
            <div className="text-sm text-muted-foreground leading-tight">Average ROI</div>
            <div className="text-xs text-yellow-600">Return Multiple</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}