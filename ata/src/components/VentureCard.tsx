import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Users, TrendingUp, Award } from "lucide-react";

interface VentureCardProps {
  name: string;
  description: string;
  category: string;
  highlights: string[];
  impact: string;
  website?: string;
  status: "Active" | "Growth" | "Launch" | "Scale";
}

export function VentureCard({ name, description, category, highlights, impact, website, status }: VentureCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Growth": return "bg-blue-100 text-blue-800";
      case "Launch": return "bg-orange-100 text-orange-800";
      case "Scale": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-primary">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl">{name}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{category}</Badge>
              <Badge className={getStatusColor(status)}>{status}</Badge>
            </div>
          </div>
          {website && (
            <Button variant="ghost" size="sm" className="p-2">
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>
        <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="font-medium">Impact:</span>
            <span className="text-muted-foreground">{impact}</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Award className="h-4 w-4 text-primary" />
              Key Highlights:
            </div>
            <ul className="text-sm text-muted-foreground space-y-1 ml-6">
              {highlights.map((highlight, index) => (
                <li key={index} className="relative">
                  <span className="absolute -left-4 text-primary">•</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}