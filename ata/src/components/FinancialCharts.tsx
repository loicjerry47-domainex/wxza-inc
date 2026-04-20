import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, TrendingUp, Target, PieChart as PieChartIcon } from "lucide-react";
import { VentureData } from "./VentureData";

interface FinancialChartsProps {
  venture: VentureData;
}

export function FinancialCharts({ venture }: FinancialChartsProps) {
  // Parse revenue data for charts
  const parseRevenue = (amount: string) => {
    const num = parseFloat(amount.replace(/\$|,/g, ''));
    const multiplier = amount.includes('B') ? 1000 : amount.includes('M') ? 1 : amount.includes('K') ? 0.001 : 1;
    return num * multiplier;
  };

  const revenueData = [
    { year: 'Year 1', revenue: parseRevenue(venture.financials.projectedRevenue.year1) },
    { year: 'Year 3', revenue: parseRevenue(venture.financials.projectedRevenue.year3) },
    { year: 'Year 5', revenue: parseRevenue(venture.financials.projectedRevenue.year5) },
  ];

  const profitData = [
    { year: 'Year 1', profit: parseRevenue(venture.financials.netProfit.year1) },
    { year: 'Year 3', profit: parseRevenue(venture.financials.netProfit.year3) },
    { year: 'Year 5', profit: parseRevenue(venture.financials.netProfit.year5) },
  ];

  const fundingData = venture.useOfFunds.map(item => ({
    name: item.category,
    value: item.percentage,
    amount: item.amount
  }));

  const COLORS = ['#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#c026d3'];

  const formatCurrency = (value: number) => {
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}B`;
    if (value >= 1) return `$${value.toFixed(1)}M`;
    return `$${(value * 1000).toFixed(0)}K`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Revenue Projection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip formatter={(value) => [formatCurrency(value as number), 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Profit Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Profit Projection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={profitData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip formatter={(value) => [formatCurrency(value as number), 'Profit']} />
                <Bar dataKey="profit" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Use of Funds Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5" />
            Use of Funds Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={fundingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {fundingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="space-y-3">
              {fundingData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{item.amount}</div>
                    <div className="text-xs text-muted-foreground">{item.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Funding Ask</span>
              </div>
              <div className="text-2xl font-bold">{venture.financials.fundingAsk}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Break Even</span>
              </div>
              <div className="text-2xl font-bold">{venture.financials.breakEven}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Gross Margin</span>
              </div>
              <div className="text-2xl font-bold">{venture.financials.grossMargin}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">ROI</span>
              </div>
              <div className="text-2xl font-bold">{venture.financials.roi}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}