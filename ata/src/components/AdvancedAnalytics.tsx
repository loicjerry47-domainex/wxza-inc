import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { VentureData } from "./VentureData";
import { GrowthChart } from "./analytics/GrowthChart";
import { MarketChart } from "./analytics/MarketChart";
import { EfficiencyChart } from "./analytics/EfficiencyChart";
import { 
  calculatePortfolioTimeline, 
  calculateMarketData, 
  calculateCategoryPerformance,
  calculateRiskMatrix,
  parseRevenue
} from "./analytics/analyticsUtils";

interface AdvancedAnalyticsProps {
  ventures: VentureData[];
}

export function AdvancedAnalytics({ ventures }: AdvancedAnalyticsProps) {
  // Calculate all data for charts
  const timelineData = calculatePortfolioTimeline(ventures);
  const marketData = calculateMarketData(ventures);
  const categoryData = calculateCategoryPerformance(ventures);
  const riskData = calculateRiskMatrix(ventures);

  // Revenue growth data for individual ventures
  const revenueGrowthData = ventures.map(venture => ({
    name: venture.name,
    year1: parseRevenue(venture.financials.projectedRevenue.year1),
    year3: parseRevenue(venture.financials.projectedRevenue.year3),
    year5: parseRevenue(venture.financials.projectedRevenue.year5),
    category: venture.category
  }));

  // Team data for efficiency analysis
  const teamData = ventures.map(venture => ({
    name: venture.name,
    teamSize: venture.team?.teamSize || 0,
    revenue: parseRevenue(venture.financials.projectedRevenue.year5),
    patents: venture.technology?.patents?.length || 0,
    category: venture.category
  }));

  return (
    <div className="space-y-6">
      <Tabs defaultValue="growth" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="growth">Growth Analysis</TabsTrigger>
          <TabsTrigger value="market">Market Intelligence</TabsTrigger>
          <TabsTrigger value="efficiency">Investment Efficiency</TabsTrigger>
          <TabsTrigger value="performance">Performance Matrix</TabsTrigger>
        </TabsList>

        <TabsContent value="growth" className="space-y-6">
          <GrowthChart timelineData={timelineData} revenueData={revenueGrowthData} />
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <MarketChart marketData={marketData} categoryData={categoryData} />
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-6">
          <EfficiencyChart marketData={marketData} teamData={teamData} />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Top Performing Ventures</h3>
                  <div className="space-y-2">
                    {ventures
                      .sort((a, b) => parseRevenue(b.financials.projectedRevenue.year5) - parseRevenue(a.financials.projectedRevenue.year5))
                      .slice(0, 3)
                      .map(venture => (
                        <div key={venture.id} className="p-3 bg-muted/30 rounded-lg">
                          <div className="font-medium">{venture.name}</div>
                          <div className="text-sm text-muted-foreground">{venture.financials.projectedRevenue.year5} projected</div>
                        </div>
                      ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Most Efficient ROI</h3>
                  <div className="space-y-2">
                    {marketData
                      .sort((a, b) => b.efficiency - a.efficiency)
                      .slice(0, 3)
                      .map(venture => (
                        <div key={venture.name} className="p-3 bg-muted/30 rounded-lg">
                          <div className="font-medium">{venture.name}</div>
                          <div className="text-sm text-muted-foreground">{venture.efficiency.toFixed(1)}× ROI</div>
                        </div>
                      ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Innovation Leaders</h3>
                  <div className="space-y-2">
                    {ventures
                      .sort((a, b) => (b.technology?.patents?.length || 0) - (a.technology?.patents?.length || 0))
                      .slice(0, 3)
                      .map(venture => (
                        <div key={venture.id} className="p-3 bg-muted/30 rounded-lg">
                          <div className="font-medium">{venture.name}</div>
                          <div className="text-sm text-muted-foreground">{venture.technology?.patents?.length || 0} patents</div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}