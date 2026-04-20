import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  AlertTriangle, 
  Shield, 
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingDown,
  TrendingUp
} from "lucide-react";
import { VentureData } from "./VentureData";

interface RiskAssessmentProps {
  venture: VentureData;
}

export function RiskAssessment({ venture }: RiskAssessmentProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "High": return { bg: "bg-red-100", text: "text-red-800", border: "border-red-500" };
      case "Medium": return { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-500" };
      case "Low": return { bg: "bg-green-100", text: "text-green-800", border: "border-green-500" };
      default: return { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-500" };
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "High": return <XCircle className="h-5 w-5 text-red-600" />;
      case "Medium": return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case "Low": return <CheckCircle className="h-5 w-5 text-green-600" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-600" />;
    }
  };

  const safeRisks = venture.risks || [];

  const calculateRiskScore = () => {
    if (safeRisks.length === 0) {
      return { impact: 0, probability: 0, overall: 0 };
    }

    const scores = { High: 3, Medium: 2, Low: 1 };
    const impactScore = safeRisks.reduce((sum, risk) => sum + (scores[risk.impact] || 1), 0);
    const probabilityScore = safeRisks.reduce((sum, risk) => sum + (scores[risk.probability] || 1), 0);
    const maxScore = safeRisks.length * 3;
    
    return {
      impact: (impactScore / maxScore) * 100,
      probability: (probabilityScore / maxScore) * 100,
      overall: ((impactScore + probabilityScore) / (maxScore * 2)) * 100
    };
  };

  const riskScores = calculateRiskScore();

  const riskCategories = {
    Technology: safeRisks.filter(r => r.risk?.toLowerCase().includes('tech') || r.risk?.toLowerCase().includes('failure')),
    Market: safeRisks.filter(r => r.risk?.toLowerCase().includes('adoption') || r.risk?.toLowerCase().includes('competition')),
    Operational: safeRisks.filter(r => r.risk?.toLowerCase().includes('delay') || r.risk?.toLowerCase().includes('operational')),
    Financial: safeRisks.filter(r => r.risk?.toLowerCase().includes('economic') || r.risk?.toLowerCase().includes('funding'))
  };

  if (safeRisks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Risk assessment data is being compiled. This venture is currently under evaluation for potential risks and mitigation strategies.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Risk Score</p>
                <p className="text-2xl font-bold">{riskScores.overall.toFixed(0)}%</p>
                <div className="flex items-center gap-1 mt-1">
                  {riskScores.overall < 40 ? (
                    <CheckCircle className="h-3 w-3 text-green-600" />
                  ) : riskScores.overall < 70 ? (
                    <AlertCircle className="h-3 w-3 text-yellow-600" />
                  ) : (
                    <XCircle className="h-3 w-3 text-red-600" />
                  )}
                  <span className={`text-xs ${
                    riskScores.overall < 40 ? 'text-green-600' : 
                    riskScores.overall < 70 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {riskScores.overall < 40 ? 'Low Risk' : 
                     riskScores.overall < 70 ? 'Moderate Risk' : 'High Risk'}
                  </span>
                </div>
              </div>
              <AlertTriangle className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Impact Assessment</p>
                <p className="text-2xl font-bold">{riskScores.impact.toFixed(0)}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-red-600" />
                  <span className="text-xs text-red-600">Potential Impact</span>
                </div>
              </div>
              <TrendingDown className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Probability Score</p>
                <p className="text-2xl font-bold">{riskScores.probability.toFixed(0)}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-blue-600" />
                  <span className="text-xs text-blue-600">Likelihood</span>
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Risk Assessment Matrix
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {safeRisks.map((risk, index) => {
              const impactColor = getRiskColor(risk.impact);
              const probabilityColor = getRiskColor(risk.probability);
              
              return (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      {getRiskIcon(risk.impact)}
                      <div>
                        <h4 className="font-medium">{risk.risk}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`${impactColor.bg} ${impactColor.text}`}>
                            Impact: {risk.impact}
                          </Badge>
                          <Badge className={`${probabilityColor.bg} ${probabilityColor.text}`}>
                            Probability: {risk.probability}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-8">
                    <div className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-green-900 text-sm">Mitigation Strategy</h5>
                        <p className="text-sm text-muted-foreground">{risk.mitigation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Risk Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Risk Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(riskCategories).map(([category, risks]) => (
                <div key={category} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      risks.length > 2 ? 'bg-red-500' : 
                      risks.length > 1 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <span className="font-medium">{category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{risks.length} risks</span>
                    <Badge variant={risks.length > 2 ? 'destructive' : risks.length > 1 ? 'secondary' : 'default'}>
                      {risks.length > 2 ? 'High' : risks.length > 1 ? 'Medium' : 'Low'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Risk Mitigation Strength
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Technology Risks</span>
                  <span>90%</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Market Risks</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Operational Risks</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Financial Risks</span>
                  <span>70%</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Risk Monitoring & Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium">Active Monitoring</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Monthly risk assessment reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Real-time market monitoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Technology performance tracking</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Risk Controls</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Diversified supplier base</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">IP protection strategies</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Financial contingency plans</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}