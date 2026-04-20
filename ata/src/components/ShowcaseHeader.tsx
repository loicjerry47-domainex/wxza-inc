import { Badge } from "./ui/badge";
import { Building2, Users, DollarSign, TrendingUp } from "lucide-react";

export function ShowcaseHeader() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Revolutionary Venture Portfolio
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Nine exceptional companies solving global challenges through innovative technology, 
          sustainable practices, and visionary leadership
        </p>
      </div>
      
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-primary" />
          <span className="font-medium">9 Active Ventures</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-primary" />
          <span className="font-medium">$630B+ Market Potential</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <span className="font-medium">1.5B+ People Impacted</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="font-medium">Revolutionary Innovation</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="secondary">Biophilic Technology</Badge>
        <Badge variant="secondary">Augmented Reality</Badge>
        <Badge variant="secondary">Communication AI</Badge>
        <Badge variant="secondary">Digital Floriculture</Badge>
        <Badge variant="secondary">Fintech Innovation</Badge>
        <Badge variant="secondary">Assistive Technology</Badge>
        <Badge variant="secondary">Holographic AI</Badge>
        <Badge variant="secondary">Immersive Broadcasting</Badge>
        <Badge variant="secondary">Urban Mobility</Badge>
      </div>
    </div>
  );
}