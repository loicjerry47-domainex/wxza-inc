import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Users, Zap, Globe, TrendingUp } from "lucide-react";
import { PortfolioMetrics } from "../utils/portfolioUtils";

interface KeyHighlightsProps {
  metrics: PortfolioMetrics;
}

export function KeyHighlights({ metrics }: KeyHighlightsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            Team Strength
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold">{metrics.totalTeamSize}</div>
            <div className="text-sm text-muted-foreground">Total Team Members</div>
            <div className="text-xs text-green-600">Avg: {Math.round(metrics.avgTeamSize)} per venture</div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            Innovation Power
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold">{metrics.totalPatents}</div>
            <div className="text-sm text-muted-foreground">Patents Filed</div>
            <div className="text-xs text-blue-600">IP Protection Secured</div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Globe className="h-5 w-5 text-purple-600" />
            Market Reach
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold">3.2B+</div>
            <div className="text-sm text-muted-foreground">People Addressable</div>
            <div className="text-xs text-purple-600">Global Impact</div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            Growth Trajectory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold">28%</div>
            <div className="text-sm text-muted-foreground">Avg CAGR</div>
            <div className="text-xs text-orange-600">Market Growth</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}