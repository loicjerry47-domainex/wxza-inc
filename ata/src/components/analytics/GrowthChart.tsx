import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, BarChart3 } from "lucide-react";
import { formatCurrency } from "./analyticsUtils";

interface GrowthChartProps {
  timelineData: any[];
  revenueData: any[];
}

export function GrowthChart({ timelineData, revenueData }: GrowthChartProps) {
  return (
    <div className="space-y-6">
      {/* Portfolio Growth Trajectory */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Portfolio Revenue Growth Projection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => [formatCurrency(value as number), 'Total Revenue']} />
              <Line type="monotone" dataKey="totalRevenue" stroke="#0ea5e9" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Individual Venture Growth */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Revenue Growth by Venture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={revenueData.slice(0, 6)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => [formatCurrency(value as number)]} />
              <Bar dataKey="year1" fill="#93c5fd" name="Year 1" />
              <Bar dataKey="year3" fill="#60a5fa" name="Year 3" />
              <Bar dataKey="year5" fill="#3b82f6" name="Year 5" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}