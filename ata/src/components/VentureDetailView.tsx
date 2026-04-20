import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { 
  ArrowLeft, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Target, 
  Zap, 
  Shield, 
  Award,
  Building2,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  Eye,
  Lightbulb,
  PieChart,
  LineChart,
  BarChart3,
  Globe,
  Calendar,
  Star
} from "lucide-react";
import { VentureData } from "./VentureData";
import { FinancialCharts } from "./FinancialCharts";
import { MarketAnalysis } from "./MarketAnalysis";
import { TechnologyBreakdown } from "./TechnologyBreakdown";
import { RiskAssessment } from "./RiskAssessment";

interface VentureDetailViewProps {
  venture: VentureData;
  onBack: () => void;
  allVentures: VentureData[];
  onSelectVenture: (venture: VentureData) => void;
}

export function VentureDetailView({ venture, onBack, allVentures, onSelectVenture }: VentureDetailViewProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Growth": return "bg-blue-100 text-blue-800";
      case "Launch": return "bg-orange-100 text-orange-800";
      case "Scale": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "High": return "text-red-600";
      case "Medium": return "text-yellow-600";
      case "Low": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  const relatedVentures = allVentures.filter(v => 
    v.id !== venture.id && 
    (v.category === venture.category || v.status === venture.status)
  ).slice(0, 3);

  // Safe array access with defaults
  const safeProducts = venture.products || [];
  const safeUseOfFunds = venture.useOfFunds || [];
  const safeMetrics = venture.metrics || [];
  const safeKeyMembers = venture.team?.keyMembers || [];
  const safeAdvisors = venture.team?.advisors || [];
  const safeRisks = venture.risks || [];
  const safeFutureVision = venture.futureVision || [];
  const safeCompetitiveAdvantage = venture.market?.competitiveAdvantage || [];

  return (
    <div className="min-h-screen bg-black text-white overflow-auto relative">
      {/* Organic Flowing Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '12s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '10s', animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{venture.category}</Badge>
          <Badge className={getStatusColor(venture.status)}>{venture.status}</Badge>
        </div>
      </div>

      {/* Venture Header */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div>
                <CardTitle className="text-3xl">{venture.name}</CardTitle>
                <CardDescription className="text-lg mt-2">{venture.tagline}</CardDescription>
              </div>
              <p className="text-base leading-relaxed max-w-4xl">{venture.description}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="text-2xl font-bold text-primary">{venture.financials?.fundingAsk || 'TBD'}</div>
              <div className="text-sm text-muted-foreground">Funding Ask</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Year 5 Revenue</p>
                <p className="text-xl font-bold">{venture.financials?.projectedRevenue?.year5 || 'TBD'}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">Strong growth</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Market Size</p>
                <p className="text-xl font-bold">{venture.market?.tam?.split(' ')[0] || 'TBD'}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Globe className="h-3 w-3 text-blue-600" />
                  <span className="text-xs text-blue-600">Global reach</span>
                </div>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">ROI Potential</p>
                <p className="text-xl font-bold">{venture.financials?.roi || 'TBD'}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 text-yellow-600" />
                  <span className="text-xs text-yellow-600">High return</span>
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Patents</p>
                <p className="text-xl font-bold">{venture.technology?.patents?.length || 0}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Shield className="h-3 w-3 text-purple-600" />
                  <span className="text-xs text-purple-600">IP protected</span>
                </div>
              </div>
              <Award className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Products */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Products & Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {safeProducts.length > 0 ? (
                  safeProducts.map((product, index) => (
                    <div key={index} className="border-l-2 border-primary/30 pl-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{product.name}</h4>
                        <Badge variant="outline">{product.pricing}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {(product.features || []).slice(0, 3).map((feature, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    Product information coming soon
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Use of Funds */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Use of Funds
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {safeUseOfFunds.length > 0 ? (
                  safeUseOfFunds.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.category}</span>
                        <span className="font-medium">{item.amount}</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                      <div className="text-xs text-muted-foreground text-right">
                        {item.percentage}% of total funding
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    Funding allocation details coming soon
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Key Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Key Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              {safeMetrics.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {safeMetrics.map((metric, index) => (
                    <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{metric.value}</div>
                      <div className="text-sm text-muted-foreground">{metric.label}</div>
                      <div className={`text-xs mt-1 ${
                        metric.trend === 'up' ? 'text-green-600' : 
                        metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {metric.trend === 'up' ? '↗ Trending up' : 
                         metric.trend === 'down' ? '↘ Trending down' : '→ Stable'}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  Performance metrics being tracked
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials">
          <FinancialCharts venture={venture} />
        </TabsContent>

        <TabsContent value="market">
          <MarketAnalysis venture={venture} />
        </TabsContent>

        <TabsContent value="technology">
          <TechnologyBreakdown venture={venture} />
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Leadership Team
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-medium">CEO</h4>
                    <p className="text-sm text-muted-foreground">{venture.team?.ceo || 'Information coming soon'}</p>
                  </div>
                  
                  {venture.team?.cto && (
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium">CTO</h4>
                      <p className="text-sm text-muted-foreground">{venture.team.cto}</p>
                    </div>
                  )}
                  
                  {venture.team?.cfo && (
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-medium">CFO</h4>
                      <p className="text-sm text-muted-foreground">{venture.team.cfo}</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Key Team Members</h4>
                    <div className="space-y-2">
                      {safeKeyMembers.length > 0 ? (
                        safeKeyMembers.map((member, index) => (
                          <div key={index} className="text-sm text-muted-foreground border-l-2 border-muted pl-3">
                            {member}
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-muted-foreground">Team information coming soon</div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Advisors</h4>
                    <div className="space-y-2">
                      {safeAdvisors.length > 0 ? (
                        safeAdvisors.map((advisor, index) => (
                          <div key={index} className="text-sm text-muted-foreground border-l-2 border-muted pl-3">
                            {advisor}
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-muted-foreground">Advisory board information coming soon</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks">
          <RiskAssessment venture={venture} />
        </TabsContent>

        <TabsContent value="strategy">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Future Vision & Strategy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Future Vision</h4>
                  <div className="space-y-3">
                    {safeFutureVision.length > 0 ? (
                      safeFutureVision.map((vision, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          </div>
                          <p className="text-sm text-muted-foreground">{vision}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-muted-foreground">Strategic vision being developed</div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Competitive Advantages</h4>
                  <div className="space-y-3">
                    {safeCompetitiveAdvantage.length > 0 ? (
                      safeCompetitiveAdvantage.map((advantage, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-muted-foreground">{advantage}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-muted-foreground">Competitive analysis in progress</div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Related Ventures */}
      {relatedVentures.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Related Ventures
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedVentures.map((related) => (
                <Card 
                  key={related.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onSelectVenture(related)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{related.name}</CardTitle>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">{related.category}</Badge>
                      <Badge className={`text-xs ${getStatusColor(related.status)}`}>
                        {related.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{related.impact}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      </div>
    </div>
  );
}