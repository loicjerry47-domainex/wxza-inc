import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  Zap, 
  Shield, 
  Cpu, 
  Lightbulb,
  CheckCircle,
  Clock,
  Award,
  Rocket
} from "lucide-react";
import { VentureData } from "./VentureData";

interface TechnologyBreakdownProps {
  venture: VentureData;
}

export function TechnologyBreakdown({ venture }: TechnologyBreakdownProps) {
  const safeCoretech = venture.technology?.coretech || [];
  const safePatents = venture.technology?.patents || [];
  const safeCompetitiveEdge = venture.technology?.competitive_edge || [];
  const safeRoadmap = venture.technology?.roadmap || [];

  if (!venture.technology || (safeCoretech.length === 0 && safePatents.length === 0 && safeCompetitiveEdge.length === 0 && safeRoadmap.length === 0)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-5 w-5" />
            Technology Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Technology details are being compiled. This venture's technical specifications and roadmap are currently under development.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Core Technology Stack */}
      {safeCoretech.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5" />
              Core Technology Stack
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {safeCoretech.map((tech, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <Zap className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">{tech}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">Core Tech</Badge>
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Intellectual Property */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {safePatents.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Intellectual Property Portfolio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {safePatents.map((patent, index) => (
                <div key={index} className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-purple-900">{patent}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {patent.includes('pending') ? 'Pending' : 'Filed'}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {patent.includes('USPTO') ? 'US Patent' : 'International'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {safeCompetitiveEdge.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Competitive Technology Edge
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {safeCompetitiveEdge.map((edge, index) => (
                <div key={index} className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900">{edge}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">Competitive Advantage</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Technology Roadmap */}
      {safeRoadmap.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5" />
              Technology Development Roadmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {safeRoadmap.map((milestone, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    {index < safeRoadmap.length - 1 && (
                      <div className="w-0.5 h-8 bg-muted-foreground/30 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-medium mb-2">{milestone}</h4>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {milestone.includes('2024') ? 'Q4 2024' : 
                           milestone.includes('2025') ? 'Q1 2025' : 
                           milestone.includes('2026') ? 'Q2 2026' : 
                           milestone.includes('2027') ? 'Q3 2027' : 'Future'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Technology Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Patents Filed</p>
                <p className="text-2xl font-bold">{safePatents.length}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Shield className="h-3 w-3 text-purple-600" />
                  <span className="text-xs text-purple-600">IP Protected</span>
                </div>
              </div>
              <Award className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Core Technologies</p>
                <p className="text-2xl font-bold">{safeCoretech.length}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Cpu className="h-3 w-3 text-blue-600" />
                  <span className="text-xs text-blue-600">Tech Stack</span>
                </div>
              </div>
              <Zap className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Milestones</p>
                <p className="text-2xl font-bold">{safeRoadmap.length}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Rocket className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">Planned</span>
                </div>
              </div>
              <Lightbulb className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technology Maturity Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Technology Maturity Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Core Technology Development</span>
                <span>85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>IP Portfolio Strength</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Market Readiness</span>
                <span>70%</span>
              </div>
              <Progress value={70} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Scalability Potential</span>
                <span>90%</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}