import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  Plus, 
  X, 
  TrendingUp, 
  DollarSign, 
  Target, 
  Shield, 
  Clock,
  BarChart3,
  PieChart,
  Users,
  Globe,
  Star,
  AlertTriangle,
  Calculator,
  FileText
} from 'lucide-react';
import { VentureData } from '../VentureData';
import { useInvestor } from '../investor/InvestorContext';
import { useAnalytics } from '../analytics/AnalyticsTracker';

interface ComparisonProps {
  ventures: VentureData[];
  selectedVentures: string[];
  onBack: () => void;
  onAddVenture: () => void;
}

interface FinancialModel {
  investmentAmount: number;
  timeHorizon: number; // years
  expectedROI: number;
  riskAdjustment: number;
  marketGrowthRate: number;
}

interface ComparisonMetric {
  key: string;
  label: string;
  getValue: (venture: VentureData) => number | string;
  format: (value: any) => string;
  category: 'financial' | 'market' | 'risk' | 'team' | 'technology';
  weight: number;
}

export function AdvancedVentureComparison({ ventures, selectedVentures, onBack, onAddVenture }: ComparisonProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [financialModel, setFinancialModel] = useState<FinancialModel>({
    investmentAmount: 1000000,
    timeHorizon: 5,
    expectedROI: 15,
    riskAdjustment: 10,
    marketGrowthRate: 12,
  });
  const [sortBy, setSortBy] = useState<string>('totalScore');

  const { createComparison, addNote } = useInvestor();
  const { trackEvent, trackVentureEngagement } = useAnalytics();

  const comparedVentures = useMemo(() => {
    return ventures.filter(v => selectedVentures.includes(v.id));
  }, [ventures, selectedVentures]);

  const comparisonMetrics: ComparisonMetric[] = [
    {
      key: 'funding',
      label: 'Funding Required',
      getValue: (v) => parseFloat(v.funding.replace(/[^0-9.]/g, '')),
      format: (val) => `$${val}M`,
      category: 'financial',
      weight: 0.2,
    },
    {
      key: 'revenue',
      label: 'Projected Revenue',
      getValue: (v) => parseFloat(v.projectedRevenue.replace(/[^0-9.]/g, '')),
      format: (val) => `$${val}B`,
      category: 'financial',
      weight: 0.25,
    },
    {
      key: 'roi',
      label: 'Expected ROI',
      getValue: (v) => v.roi,
      format: (val) => `${val}×`,
      category: 'financial',
      weight: 0.3,
    },
    {
      key: 'market',
      label: 'Market Size',
      getValue: (v) => parseFloat(v.marketSize.replace(/[^0-9.]/g, '')),
      format: (val) => `$${val}B`,
      category: 'market',
      weight: 0.15,
    },
    {
      key: 'team',
      label: 'Team Size',
      getValue: (v) => v.teamSize || 0,
      format: (val) => `${val} people`,
      category: 'team',
      weight: 0.1,
    },
  ];

  const calculateVentureScore = (venture: VentureData) => {
    let totalScore = 0;
    let maxScore = 0;

    comparisonMetrics.forEach(metric => {
      const value = metric.getValue(venture);
      const numericValue = typeof value === 'string' ? 0 : value;
      
      // Normalize score based on metric type
      let normalizedScore = 0;
      switch (metric.key) {
        case 'roi':
          normalizedScore = Math.min(numericValue / 50, 1) * 100; // Max ROI of 50x = 100 points
          break;
        case 'funding':
          normalizedScore = Math.max(0, 100 - (numericValue / 10)); // Lower funding = higher score
          break;
        case 'revenue':
          normalizedScore = Math.min(numericValue / 100, 1) * 100; // Max revenue of 100B = 100 points
          break;
        case 'market':
          normalizedScore = Math.min(numericValue / 1000, 1) * 100; // Max market of 1T = 100 points
          break;
        case 'team':
          normalizedScore = Math.min(numericValue / 100, 1) * 100; // Max team of 100 = 100 points
          break;
        default:
          normalizedScore = 50; // Default neutral score
      }

      totalScore += normalizedScore * metric.weight;
      maxScore += 100 * metric.weight;
    });

    return Math.round((totalScore / maxScore) * 100);
  };

  const calculateFinancialProjection = (venture: VentureData) => {
    const score = calculateVentureScore(venture);
    const riskMultiplier = (100 - financialModel.riskAdjustment) / 100;
    const projectedReturn = financialModel.investmentAmount * (venture.roi * riskMultiplier);
    const annualizedReturn = Math.pow(projectedReturn / financialModel.investmentAmount, 1 / financialModel.timeHorizon) - 1;

    return {
      totalReturn: projectedReturn,
      annualizedReturn: annualizedReturn * 100,
      netProfit: projectedReturn - financialModel.investmentAmount,
      breakEvenTime: financialModel.timeHorizon * 0.6, // Estimated breakeven
      riskScore: 100 - score, // Higher score = lower risk
    };
  };

  const sortedVentures = useMemo(() => {
    return [...comparedVentures].sort((a, b) => {
      switch (sortBy) {
        case 'totalScore':
          return calculateVentureScore(b) - calculateVentureScore(a);
        case 'roi':
          return b.roi - a.roi;
        case 'funding':
          return parseFloat(a.funding.replace(/[^0-9.]/g, '')) - parseFloat(b.funding.replace(/[^0-9.]/g, ''));
        case 'revenue':
          return parseFloat(b.projectedRevenue.replace(/[^0-9.]/g, '')) - parseFloat(a.projectedRevenue.replace(/[^0-9.]/g, ''));
        default:
          return 0;
      }
    });
  }, [comparedVentures, sortBy, financialModel]);

  const handleSaveComparison = () => {
    const comparisonId = createComparison(selectedVentures, `Comparison ${new Date().toLocaleDateString()}`);
    trackEvent('comparison_saved', {
      comparison_id: comparisonId,
      venture_count: selectedVentures.length,
      ventures: selectedVentures,
    });
  };

  const handleExportComparison = () => {
    const data = {
      ventures: sortedVentures.map(v => ({
        ...v,
        score: calculateVentureScore(v),
        financialProjection: calculateFinancialProjection(v),
      })),
      financialModel,
      createdAt: new Date().toISOString(),
      metrics: comparisonMetrics,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `venture-comparison-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    trackEvent('comparison_exported', {
      venture_count: selectedVentures.length,
      format: 'json',
    });
  };

  const removeVenture = (ventureId: string) => {
    const newSelection = selectedVentures.filter(id => id !== ventureId);
    window.history.replaceState(null, '', `?compare=${newSelection.join(',')}`);
    trackVentureEngagement({ ventureId, action: 'compare' });
  };

  if (comparedVentures.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-6">
            <PieChart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Ventures Selected</h3>
            <p className="text-muted-foreground mb-4">Please select at least 2 ventures to compare.</p>
            <Button onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <Button onClick={onBack} variant="ghost" className="p-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Venture Comparison</h1>
                <p className="text-muted-foreground">
                  Analyzing {comparedVentures.length} ventures side-by-side
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleSaveComparison} variant="outline" size="sm">
                <Star className="h-4 w-4 mr-2" />
                Save Comparison
              </Button>
              <Button onClick={handleExportComparison} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button onClick={onAddVenture} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Venture
              </Button>
            </div>
          </div>

          {/* Venture Pills */}
          <div className="flex flex-wrap gap-2">
            {comparedVentures.map(venture => (
              <Badge
                key={venture.id}
                variant="secondary"
                className="flex items-center gap-2 px-3 py-1 text-sm"
              >
                {venture.name}
                <button
                  onClick={() => removeVenture(venture.id)}
                  className="hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Financial Modeling Controls */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Financial Modeling Parameters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Investment Amount</label>
                <div className="space-y-2">
                  <Slider
                    value={[financialModel.investmentAmount]}
                    onValueChange={([value]) => setFinancialModel(prev => ({ ...prev, investmentAmount: value }))}
                    min={100000}
                    max={10000000}
                    step={100000}
                  />
                  <div className="text-xs text-muted-foreground">
                    ${(financialModel.investmentAmount / 1000000).toFixed(1)}M
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Time Horizon</label>
                <div className="space-y-2">
                  <Slider
                    value={[financialModel.timeHorizon]}
                    onValueChange={([value]) => setFinancialModel(prev => ({ ...prev, timeHorizon: value }))}
                    min={1}
                    max={10}
                    step={1}
                  />
                  <div className="text-xs text-muted-foreground">
                    {financialModel.timeHorizon} years
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Risk Adjustment</label>
                <div className="space-y-2">
                  <Slider
                    value={[financialModel.riskAdjustment]}
                    onValueChange={([value]) => setFinancialModel(prev => ({ ...prev, riskAdjustment: value }))}
                    min={0}
                    max={50}
                    step={5}
                  />
                  <div className="text-xs text-muted-foreground">
                    {financialModel.riskAdjustment}% discount
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="totalScore">Overall Score</SelectItem>
                    <SelectItem value="roi">ROI Potential</SelectItem>
                    <SelectItem value="funding">Funding Required</SelectItem>
                    <SelectItem value="revenue">Revenue Potential</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Comparison Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedVentures.map(venture => {
                const score = calculateVentureScore(venture);
                const projection = calculateFinancialProjection(venture);
                
                return (
                  <Card key={venture.id} className="relative">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-lg">{venture.name}</h3>
                          <p className="text-sm text-muted-foreground">{venture.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">{score}</div>
                          <div className="text-xs text-muted-foreground">Score</div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Funding</div>
                          <div className="font-medium">{venture.funding}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">ROI</div>
                          <div className="font-medium">{venture.roi}×</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Market</div>
                          <div className="font-medium">{venture.marketSize}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Status</div>
                          <Badge variant="outline" className="text-xs">
                            {venture.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Investment Score</div>
                        <Progress value={score} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          Based on financial metrics, market size, and risk factors
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t">
                        <div className="text-sm font-medium mb-2">Projected Returns</div>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Return:</span>
                            <span className="font-medium">${(projection.totalReturn / 1000000).toFixed(1)}M</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Annual Return:</span>
                            <span className="font-medium">{projection.annualizedReturn.toFixed(1)}%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Projections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Venture</th>
                        <th className="text-right p-2">Investment</th>
                        <th className="text-right p-2">Total Return</th>
                        <th className="text-right p-2">Net Profit</th>
                        <th className="text-right p-2">Annual Return</th>
                        <th className="text-right p-2">Breakeven</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedVentures.map(venture => {
                        const projection = calculateFinancialProjection(venture);
                        return (
                          <tr key={venture.id} className="border-b">
                            <td className="p-2 font-medium">{venture.name}</td>
                            <td className="p-2 text-right">${(financialModel.investmentAmount / 1000000).toFixed(1)}M</td>
                            <td className="p-2 text-right text-green-600">
                              ${(projection.totalReturn / 1000000).toFixed(1)}M
                            </td>
                            <td className="p-2 text-right">
                              ${(projection.netProfit / 1000000).toFixed(1)}M
                            </td>
                            <td className="p-2 text-right">
                              {projection.annualizedReturn.toFixed(1)}%
                            </td>
                            <td className="p-2 text-right">
                              {projection.breakEvenTime.toFixed(1)} years
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Metrics Tab */}
          <TabsContent value="metrics" className="space-y-6">
            <div className="space-y-6">
              {comparisonMetrics.map(metric => (
                <Card key={metric.key}>
                  <CardHeader>
                    <CardTitle className="text-lg">{metric.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sortedVentures.map(venture => {
                        const value = metric.getValue(venture);
                        const maxValue = Math.max(...comparedVentures.map(v => 
                          typeof metric.getValue(v) === 'number' ? metric.getValue(v) as number : 0
                        ));
                        const percentage = typeof value === 'number' ? (value / maxValue) * 100 : 0;
                        
                        return (
                          <div key={venture.id} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{venture.name}</span>
                              <span className="text-sm">{metric.format(value)}</span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Risk Analysis Tab */}
          <TabsContent value="risk" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sortedVentures.map(venture => {
                const projection = calculateFinancialProjection(venture);
                
                return (
                  <Card key={venture.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        {venture.name} Risk Assessment
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Overall Risk Score</span>
                          <Badge variant={projection.riskScore > 70 ? "destructive" : projection.riskScore > 40 ? "secondary" : "default"}>
                            {projection.riskScore}/100
                          </Badge>
                        </div>
                        <Progress value={100 - projection.riskScore} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Market Risk</div>
                          <div className="font-medium">Medium</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Technology Risk</div>
                          <div className="font-medium">Low</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Execution Risk</div>
                          <div className="font-medium">Medium</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Financial Risk</div>
                          <div className="font-medium">Low</div>
                        </div>
                      </div>
                      
                      <div className="pt-3 border-t">
                        <div className="text-sm font-medium mb-2">Risk Factors</div>
                        <ul className="text-xs space-y-1 text-muted-foreground">
                          <li>• Competitive market landscape</li>
                          <li>• Regulatory approval requirements</li>
                          <li>• Technology adoption timeline</li>
                          <li>• Market penetration challenges</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}