import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Activity } from "lucide-react";
import { VentureData } from "../VentureData";
import { 
  getTopVenturesByRevenue, 
  getTopVenturesByPatents, 
  getTopVenturesByTeamSize 
} from "../utils/portfolioUtils";

interface PortfolioActivityProps {
  ventures: VentureData[];
}

export function PortfolioActivity({ ventures }: PortfolioActivityProps) {
  const revenueLeaders = getTopVenturesByRevenue(ventures);
  const innovationLeaders = getTopVenturesByPatents(ventures);
  const teamLeaders = getTopVenturesByTeamSize(ventures);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Portfolio Activity & Performance Highlights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium text-green-600">Revenue Leaders</h4>
            <div className="space-y-2">
              {revenueLeaders.map(venture => (
                <div key={venture.id} className="flex justify-between text-sm">
                  <span className="font-medium">{venture.name}</span>
                  <span className="text-muted-foreground">
                    {venture.financials.currentRevenue || 'Pre-revenue'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-blue-600">Innovation Leaders</h4>
            <div className="space-y-2">
              {innovationLeaders.map(venture => (
                <div key={venture.id} className="flex justify-between text-sm">
                  <span className="font-medium">{venture.name}</span>
                  <span className="text-muted-foreground">
                    {venture.technology?.patents?.length || 0} patents
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-purple-600">Team Scale</h4>
            <div className="space-y-2">
              {teamLeaders.map(venture => (
                <div key={venture.id} className="flex justify-between text-sm">
                  <span className="font-medium">{venture.name}</span>
                  <span className="text-muted-foreground">
                    {venture.team?.teamSize || 0} members
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}