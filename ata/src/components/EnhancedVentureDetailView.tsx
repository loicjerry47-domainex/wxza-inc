import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { 
  ArrowLeft, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Target, 
  MapPin,
  Calendar,
  Building2,
  Globe,
  Star,
  Award,
  Zap,
  Shield,
  Eye,
  Lightbulb,
  BarChart3,
  Activity,
  ChevronRight,
  ExternalLink,
  Download,
  Share,
  Bookmark,
  Heart,
  MessageCircle
} from "lucide-react";
import { VentureData } from "./VentureData";
import { FinancialCharts } from "./FinancialCharts";
import { MarketAnalysis } from "./MarketAnalysis";
import { TechnologyBreakdown } from "./TechnologyBreakdown";
import { RiskAssessment } from "./RiskAssessment";

interface EnhancedVentureDetailViewProps {
  venture: VentureData;
  onBack: () => void;
  allVentures: VentureData[];
  onSelectVenture: (venture: VentureData) => void;
}

export function EnhancedVentureDetailView({ venture, onBack, allVentures, onSelectVenture }: EnhancedVentureDetailViewProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 border-green-200";
      case "Growth": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Launch": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Scale": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
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
  const safeMilestones = venture.milestones || [];
  const safeTestimonials = venture.media?.testimonials || [];

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

      <div className="relative z-10 space-y-8 p-6">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 hover:bg-muted">
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Button>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Bookmark className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      {/* Company Hero Section */}
      <Card className="border-l-4 border-l-primary bg-gradient-to-r from-background to-muted/20">
        <CardHeader className="pb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="space-y-4 flex-1">
              <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-4xl font-bold">{venture.name}</h1>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{venture.category}</Badge>
                    <Badge className={getStatusColor(venture.status)}>{venture.status}</Badge>
                  </div>
                </div>
                <p className="text-xl text-muted-foreground italic">{venture.tagline}</p>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Established in {venture.established}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{venture.headquarters}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{venture.employees} employees</span>
                </div>
              </div>
              
              <p className="text-base leading-relaxed max-w-4xl">
                {venture.fullDescription}
              </p>
            </div>
            
            <div className="lg:text-right space-y-4 lg:min-w-[250px]">
              <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
                <div className="text-3xl font-bold text-primary mb-1">
                  {venture.financials?.fundingAsk || 'TBD'}
                </div>
                <div className="text-sm text-muted-foreground mb-3">Funding Ask</div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Valuation:</span>
                    <span className="font-medium">{venture.financials?.valuation || 'TBD'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ROI:</span>
                    <span className="font-medium">{venture.financials?.roi || 'TBD'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <DollarSign className="h-5 w-5 text-primary" />
                <TrendingUp className="h-3 w-3 text-green-600" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{venture.financials?.projectedRevenue?.year5 || 'TBD'}</p>
                <p className="text-xs text-muted-foreground">5-Year Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Target className="h-5 w-5 text-primary" />
                <Globe className="h-3 w-3 text-blue-600" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{venture.market?.tam?.split(' ')[0] || 'Large'}</p>
                <p className="text-xs text-muted-foreground">Market Size</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Shield className="h-5 w-5 text-primary" />
                <Award className="h-3 w-3 text-purple-600" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{venture.technology?.patents?.length || 0}</p>
                <p className="text-xs text-muted-foreground">Patents Filed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Users className="h-5 w-5 text-primary" />
                <Activity className="h-3 w-3 text-green-600" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{venture.team?.teamSize || 'N/A'}</p>
                <p className="text-xs text-muted-foreground">Team Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-8 bg-muted/50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-background">Overview</TabsTrigger>
          <TabsTrigger value="story" className="data-[state=active]:bg-background">Story</TabsTrigger>
          <TabsTrigger value="financials" className="data-[state=active]:bg-background">Financials</TabsTrigger>
          <TabsTrigger value="market" className="data-[state=active]:bg-background">Market</TabsTrigger>
          <TabsTrigger value="technology" className="data-[state=active]:bg-background">Technology</TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-background">Team</TabsTrigger>
          <TabsTrigger value="risks" className="data-[state=active]:bg-background">Risks</TabsTrigger>
          <TabsTrigger value="impact" className="data-[state=active]:bg-background">Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Business Model */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Business Model
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {venture.businessModel?.revenueStreams ? (
                  venture.businessModel.revenueStreams.map((stream, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{stream.stream}</h4>
                        <Badge variant="outline">{stream.percentage}%</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{stream.description}</p>
                      <div className="text-xs text-muted-foreground">{stream.pricing}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    Business model details coming soon
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Key Milestones */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Key Milestones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {safeMilestones.length > 0 ? (
                    safeMilestones.map((milestone, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`w-3 h-3 rounded-full mt-2 ${
                          milestone.status === 'Completed' ? 'bg-green-500' :
                          milestone.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-300'
                        }`}></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{milestone.milestone}</h4>
                            <span className="text-xs text-muted-foreground">{milestone.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{milestone.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      Milestone timeline being developed
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products & Services */}
          {safeProducts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Products & Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {safeProducts.map((product, index) => (
                    <Card key={index} className="border-l-4 border-l-primary/50">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{product.name}</CardTitle>
                          <Badge variant="outline" className="text-xs">{product.pricing}</Badge>
                        </div>
                        <CardDescription className="text-sm">{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="text-xs text-muted-foreground">Target: {product.targetMarket}</div>
                          <div className="text-xs text-muted-foreground">Stage: {product.stage}</div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {product.features.slice(0, 3).map((feature, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="story" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Founding Story
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed">{venture.foundingStory}</p>
            </CardContent>
          </Card>

          {safeTestimonials.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Customer Testimonials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {safeTestimonials.map((testimonial, index) => (
                    <div key={index} className="p-4 bg-muted/20 rounded-lg border-l-4 border-l-primary">
                      <blockquote className="text-sm italic mb-3">"{testimonial.quote}"</blockquote>
                      <div className="text-xs text-muted-foreground">
                        <div className="font-medium">{testimonial.author}</div>
                        <div>{testimonial.position}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
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
                Leadership Team & Advisors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-lg">Executive Team</h4>
                  
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg border-l-4 border-l-primary">
                      <h5 className="font-medium">Chief Executive Officer</h5>
                      <p className="text-sm text-muted-foreground">{venture.team?.ceo || 'Information coming soon'}</p>
                    </div>
                    
                    {venture.team?.cto && (
                      <div className="p-4 border rounded-lg border-l-4 border-l-blue-500">
                        <h5 className="font-medium">Chief Technology Officer</h5>
                        <p className="text-sm text-muted-foreground">{venture.team.cto}</p>
                      </div>
                    )}
                    
                    {venture.team?.cfo && (
                      <div className="p-4 border rounded-lg border-l-4 border-l-green-500">
                        <h5 className="font-medium">Chief Financial Officer</h5>
                        <p className="text-sm text-muted-foreground">{venture.team.cfo}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-lg">Advisory Board</h4>
                  
                  <div className="space-y-3">
                    {(venture.team?.advisors || []).length > 0 ? (
                      venture.team.advisors.map((advisor, index) => (
                        <div key={index} className="p-3 bg-muted/30 rounded-lg">
                          <p className="text-sm">{advisor}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-muted-foreground">Advisory board information coming soon</div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks">
          <RiskAssessment venture={venture} />
        </TabsContent>

        <TabsContent value="impact">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Sustainability & Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {venture.sustainability ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-medium text-green-900 mb-2">Environmental Impact</h4>
                      <p className="text-sm text-green-800">{venture.sustainability.environmentalImpact}</p>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-medium text-blue-900 mb-2">Social Impact</h4>
                      <p className="text-sm text-blue-800">{venture.sustainability.socialImpact}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-medium text-purple-900 mb-2">Governance</h4>
                      <p className="text-sm text-purple-800">{venture.sustainability.governance}</p>
                    </div>
                    
                    {venture.sustainability.sdgs && (
                      <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                        <h4 className="font-medium text-orange-900 mb-2">UN SDGs</h4>
                        <div className="flex flex-wrap gap-1">
                          {venture.sustainability.sdgs.map((sdg, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {sdg}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Sustainability and impact metrics being developed
                </div>
              )}
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
              Related Portfolio Companies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedVentures.map((related) => (
                <Card 
                  key={related.id} 
                  className="cursor-pointer hover:shadow-md transition-all hover:border-primary/50"
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
                    <p className="text-sm text-muted-foreground line-clamp-2">{related.tagline}</p>
                    <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                      <span>{related.headquarters}</span>
                      <span>{related.established}</span>
                    </div>
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