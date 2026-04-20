import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Users } from "lucide-react";
import { formatCurrency } from "./analyticsUtils";

interface EfficiencyChartProps {
  marketData: any[];
  teamData: any[];
}

export function EfficiencyChart({ marketData, teamData }: EfficiencyChartProps) {
  return (
    <div className="space-y-6">
      {/* Investment Efficiency Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Investment Efficiency Matrix
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart data={marketData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fundingAsk" tickFormatter={formatCurrency} />
              <YAxis dataKey="efficiency" />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'efficiency' ? `${(value as number).toFixed(1)}×` : formatCurrency(value as number), 
                  name === 'efficiency' ? 'ROI Multiple' : name
                ]}
                labelFormatter={(label) => marketData.find(d => d.fundingAsk === label)?.name || ''}
              />
              <Scatter name="ROI Efficiency" dataKey="efficiency" fill="#10b981" />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Team Efficiency */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Size vs Revenue Potential
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart data={teamData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="teamSize" />
              <YAxis dataKey="revenue" tickFormatter={formatCurrency} />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'revenue' ? formatCurrency(value as number) : value,
                  name === 'revenue' ? 'Projected Revenue' : 'Team Size'
                ]}
                labelFormatter={(label) => teamData.find(d => d.teamSize === label)?.name || ''}
              />
              <Scatter name="Team Efficiency" dataKey="revenue" fill="#f59e0b" />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}