import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ShowcaseHeader } from "./ShowcaseHeader";
import { ventureData } from "./VentureData";
import { 
  BarChart3, 
  Database, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target,
  Zap,
  Globe,
  Award,
  Rocket,
  Shield,
  Eye,
  ArrowRight
} from "lucide-react";

interface EnhancedShowcaseProps {
  onSwitchToDashboard: () => void;
}

export function EnhancedShowcase({ onSwitchToDashboard }: EnhancedShowcaseProps) {
  const totalFunding = ventureData.reduce((sum, venture) => {
    const amount = parseFloat(venture.financials.fundingAsk.replace(/\$|,/g, ''));
    const multiplier = venture.financials.fundingAsk.includes('B') ? 1000 : 
                      venture.financials.fundingAsk.includes('M') ? 1 : 
                      venture.financials.fundingAsk.includes('K') ? 0.001 : 1;
    return sum + (amount * multiplier);
  }, 0);

  const totalRevenue = ventureData.reduce((sum, venture) => {
    const amount = parseFloat(venture.financials.projectedRevenue.year5.replace(/\$|,/g, ''));
    const multiplier = venture.financials.projectedRevenue.year5.includes('B') ? 1000 : 
                      venture.financials.projectedRevenue.year5.includes('M') ? 1 : 
                      venture.financials.projectedRevenue.year5.includes('K') ? 0.001 : 1;
    return sum + (amount * multiplier);
  }, 0);

  const totalPatents = ventureData.reduce((sum, venture) => sum + (venture.technology?.patents?.length || 0), 0);
  const totalTeamSize = ventureData.reduce((sum, venture) => sum + (venture.team?.teamSize || 0), 0);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}T`;
    if (amount >= 1) return `$${amount.toFixed(1)}B`;
    return `$${(amount * 1000).toFixed(0)}M`;
  };

  const topVentures = ventureData
    .sort((a, b) => parseFloat(b.financials.projectedRevenue.year5.replace(/\$|,/g, '')) - parseFloat(a.financials.projectedRevenue.year5.replace(/\$|,/g, '')))
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-8">
          <ShowcaseHeader />
          <div className="flex flex-col gap-4 lg:items-end">
            <Button onClick={onSwitchToDashboard} size="lg" className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Interactive Dashboard
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Database className="h-4 w-4" />
              <span>Real-time portfolio data</span>
            </div>
          </div>
        </div>

        {/* Portfolio Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Funding</p>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(totalFunding)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenue Potential</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalRevenue)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Patents Filed</p>
                  <p className="text-2xl font-bold text-purple-600">{totalPatents}</p>
                </div>
                <Shield className="h-8 w-8 text-purple-500 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Team Members</p>
                  <p className="text-2xl font-bold text-green-600">{totalTeamSize}</p>
                </div>
                <Users className="h-8 w-8 text-green-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Ventures */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5" />
              Featured Revolutionary Ventures
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topVentures.map((venture) => (
                <Card key={venture.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge className={`${
                        venture.status === 'Scale' ? 'bg-purple-100 text-purple-800' :
                        venture.status === 'Growth' ? 'bg-blue-100 text-blue-800' :
                        venture.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {venture.status}
                      </Badge>
                      <Badge variant="outline">{venture.category}</Badge>
                    </div>
                    <CardTitle className="text-lg">{venture.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {venture.tagline}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Revenue (Y5):</span>
                        <span className="font-medium">{venture.financials.projectedRevenue.year5}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Funding Ask:</span>
                        <span className="font-medium">{venture.financials.fundingAsk}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Team Size:</span>
                        <span className="font-medium">{venture.team?.teamSize || 'N/A'}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Impact Areas */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Global Impact Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Technology Innovation</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Revolutionary AI, holographic computing, and biotechnology advancing human capabilities
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">AI & Machine Learning</Badge>
                  <Badge variant="secondary" className="text-xs">Holographic Systems</Badge>
                  <Badge variant="secondary" className="text-xs">Biotechnology</Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Accessibility & Inclusion</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Empowering individuals with disabilities and democratizing access to premium experiences
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">Assistive Technology</Badge>
                  <Badge variant="secondary" className="text-xs">Universal Design</Badge>
                  <Badge variant="secondary" className="text-xs">Digital Inclusion</Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Sustainability</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Environmental solutions reducing waste and carbon footprint while enhancing quality of life
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">Carbon Reduction</Badge>
                  <Badge variant="secondary" className="text-xs">Waste Elimination</Badge>
                  <Badge variant="secondary" className="text-xs">Clean Technology</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold">Explore the Future of Innovation</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Dive deep into comprehensive financial projections, market analysis, technology assessments, 
            and strategic insights for each revolutionary venture in our interactive enterprise dashboard.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={onSwitchToDashboard} size="lg" className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Explore Enterprise Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Request Investor Access
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}