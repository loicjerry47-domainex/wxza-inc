import { Card, CardContent } from "./ui/card";
import { Building2, Users, Globe, TrendingUp, DollarSign, Target, Zap, Award } from "lucide-react";

export function PortfolioStats() {
  const stats = [
    {
      icon: Building2,
      label: "Active Ventures",
      value: "9",
      description: "Revolutionary companies"
    },
    {
      icon: DollarSign,
      label: "Revenue Projection",
      value: "$630B+",
      description: "Combined 5-year potential"
    },
    {
      icon: Users,
      label: "Global Impact",
      value: "1.5B+",
      description: "People potentially served"
    },
    {
      icon: Globe,
      label: "Market Reach",
      value: "Global",
      description: "Multi-continental presence"
    },
    {
      icon: Target,
      label: "Industries",
      value: "9",
      description: "Sectors disrupted"
    },
    {
      icon: Zap,
      label: "Technology Edge",
      value: "AI/AR/IoT",
      description: "Cutting-edge integration"
    },
    {
      icon: TrendingUp,
      label: "Growth Stage",
      value: "Scaling",
      description: "Proven market traction"
    },
    {
      icon: Award,
      label: "Innovation",
      value: "Patents",
      description: "IP protection secured"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {stats.map((stat, index) => (
        <Card key={index} className="text-center hover:shadow-md transition-shadow">
          <CardContent className="pt-6 pb-4">
            <div className="flex flex-col items-center space-y-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm font-medium">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.description}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}