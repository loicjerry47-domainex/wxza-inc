import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Globe, DollarSign } from "lucide-react";
import { formatCurrency } from "./analyticsUtils";

interface MarketChartProps {
  marketData: any[];
  categoryData: any[];
}

const COLORS = ['#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#c026d3', '#dc2626', '#ea580c', '#d97706'];

export function MarketChart({ marketData, categoryData }: MarketChartProps) {
  return (
    <div className="space-y-6">
      {/* Market Size Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Total Addressable Market Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={marketData.slice(0, 6)}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, tamSize }) => `${name}: ${formatCurrency(tamSize)}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="tamSize"
              >
                {marketData.slice(0, 6).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [formatCurrency(value as number), 'Market Size']} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Market Opportunity vs Investment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Market Opportunity vs Funding Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart data={marketData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fundingAsk" tickFormatter={formatCurrency} />
              <YAxis dataKey="tamSize" tickFormatter={formatCurrency} />
              <Tooltip 
                formatter={(value, name) => [formatCurrency(value as number), name]}
                labelFormatter={(label) => `Venture: ${label}`}
              />
              <Scatter name="Market Size vs Funding" dataKey="tamSize" fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}