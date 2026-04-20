import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  Globe, 
  Target, 
  TrendingUp, 
  Users, 
  CheckCircle,
  ArrowRight,
  BarChart3,
  PieChart
} from "lucide-react";
import { VentureData } from "./VentureData";

interface MarketAnalysisProps {
  venture: VentureData;
}

export function MarketAnalysis({ venture }: MarketAnalysisProps) {
  const parseMarketSize = (size: string) => {
    const num = parseFloat(size.replace(/\$|,/g, ''));
    if (size.includes('T')) return num * 1000;
    if (size.includes('B')) return num;
    if (size.includes('M')) return num / 1000;
    return num;
  };

  const tamSize = parseMarketSize(venture.market.tam);
  const samSize = parseMarketSize(venture.market.sam);
  const somSize = parseMarketSize(venture.market.som);

  const marketData = [
    { label: 'TAM', value: tamSize, description: 'Total Addressable Market', color: 'bg-blue-500' },
    { label: 'SAM', value: samSize, description: 'Serviceable Addressable Market', color: 'bg-blue-400' },
    { label: 'SOM', value: somSize, description: 'Serviceable Obtainable Market', color: 'bg-blue-300' },
  ];

  const formatMarketSize = (value: number) => {
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}T`;
    if (value >= 1) return `$${value.toFixed(1)}B`;
    return `$${(value * 1000).toFixed(0)}M`;
  };

  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Market Opportunity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Total Addressable Market (TAM)</h4>
                    <p className="text-sm text-muted-foreground">{venture.market.tam}</p>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatMarketSize(tamSize)}
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Serviceable Addressable Market (SAM)</h4>
                    <p className="text-sm text-muted-foreground">{venture.market.sam}</p>
                  </div>
                  <div className="text-2xl font-bold text-blue-500">
                    {formatMarketSize(samSize)}
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">Serviceable Obtainable Market (SOM)</h4>
                    <p className="text-sm text-muted-foreground">{venture.market.som}</p>
                  </div>
                  <div className="text-2xl font-bold text-blue-400">
                    {formatMarketSize(somSize)}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Market Penetration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>TAM Penetration</span>
                  <span>{((samSize / tamSize) * 100).toFixed(1)}%</span>
                </div>
                <Progress value={(samSize / tamSize) * 100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>SAM Penetration</span>
                  <span>{((somSize / samSize) * 100).toFixed(1)}%</span>
                </div>
                <Progress value={(somSize / samSize) * 100} className="h-2" />
              </div>
              
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Market Growth</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {venture.market.marketGrowth}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Target Customers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Target Customer Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium mb-2">Primary Target Segments</h4>
            <p className="text-sm text-muted-foreground">{venture.market.targetCustomers}</p>
          </div>
        </CardContent>
      </Card>

      {/* Competitive Advantages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Competitive Advantages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {venture.market.competitiveAdvantage.map((advantage, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">{advantage}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Strategy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Market Entry Strategy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Initial Market Entry</h4>
                  <p className="text-sm text-muted-foreground">Target early adopters and beta users</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div>
                  <h4 className="font-medium">Market Expansion</h4>
                  <p className="text-sm text-muted-foreground">Scale to broader customer segments</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Market Leadership</h4>
                  <p className="text-sm text-muted-foreground">Establish dominant market position</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Go-to-Market Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">Phase 1</Badge>
                  <span className="text-sm">Market Validation</span>
                </div>
                <span className="text-sm text-muted-foreground">Months 1-6</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">Phase 2</Badge>
                  <span className="text-sm">Customer Acquisition</span>
                </div>
                <span className="text-sm text-muted-foreground">Months 7-18</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">Phase 3</Badge>
                  <span className="text-sm">Market Expansion</span>
                </div>
                <span className="text-sm text-muted-foreground">Months 19+</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}