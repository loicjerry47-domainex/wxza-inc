import { VentureData } from "../VentureData";

export const parseRevenue = (amount: string): number => {
  const num = parseFloat(amount.replace(/\$|,/g, ''));
  const multiplier = amount.includes('B') ? 1000 : 
                    amount.includes('M') ? 1 : 
                    amount.includes('K') ? 0.001 : 1;
  return num * multiplier;
};

export const formatCurrency = (value: number): string => {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}T`;
  if (value >= 1) return `$${value.toFixed(1)}B`;
  return `$${(value * 1000).toFixed(0)}M`;
};

export const calculatePortfolioTimeline = (ventures: VentureData[]) => {
  const revenueData = ventures.map(venture => ({
    name: venture.name,
    year1: parseRevenue(venture.financials.projectedRevenue.year1),
    year2: parseRevenue(venture.financials.projectedRevenue.year2),
    year3: parseRevenue(venture.financials.projectedRevenue.year3),
    year4: parseRevenue(venture.financials.projectedRevenue.year4),
    year5: parseRevenue(venture.financials.projectedRevenue.year5),
  }));

  return [
    { year: 'Year 1', totalRevenue: revenueData.reduce((sum, v) => sum + v.year1, 0) },
    { year: 'Year 2', totalRevenue: revenueData.reduce((sum, v) => sum + v.year2, 0) },
    { year: 'Year 3', totalRevenue: revenueData.reduce((sum, v) => sum + v.year3, 0) },
    { year: 'Year 4', totalRevenue: revenueData.reduce((sum, v) => sum + v.year4, 0) },
    { year: 'Year 5', totalRevenue: revenueData.reduce((sum, v) => sum + v.year5, 0) }
  ];
};

export const calculateMarketData = (ventures: VentureData[]) => {
  return ventures.map(venture => {
    const tamValue = parseRevenue(venture.market.tam.split(' ')[0] || '0');
    const fundingValue = parseRevenue(venture.financials.fundingAsk);
    const revenue5Year = parseRevenue(venture.financials.projectedRevenue.year5);
    
    return {
      name: venture.name,
      tamSize: tamValue,
      fundingAsk: fundingValue,
      projectedRevenue: revenue5Year,
      efficiency: revenue5Year / fundingValue,
      category: venture.category
    };
  });
};

export const calculateCategoryPerformance = (ventures: VentureData[]) => {
  const categoryData = ventures.reduce((acc, venture) => {
    const category = venture.category;
    if (!acc[category]) {
      acc[category] = {
        name: category,
        count: 0,
        totalRevenue: 0,
        totalFunding: 0,
        avgTeamSize: 0,
        patents: 0
      };
    }
    acc[category].count += 1;
    acc[category].totalRevenue += parseRevenue(venture.financials.projectedRevenue.year5);
    acc[category].totalFunding += parseRevenue(venture.financials.fundingAsk);
    acc[category].avgTeamSize += venture.team?.teamSize || 0;
    acc[category].patents += venture.technology?.patents?.length || 0;
    return acc;
  }, {} as any);

  return Object.values(categoryData).map((cat: any) => ({
    ...cat,
    avgTeamSize: Math.round(cat.avgTeamSize / cat.count),
    roi: cat.totalRevenue / cat.totalFunding
  }));
};

export const calculateRiskMatrix = (ventures: VentureData[]) => {
  return ventures.flatMap(venture => 
    (venture.risks || []).map(risk => ({
      venture: venture.name,
      risk: risk.risk,
      impact: risk.impact === 'High' ? 3 : risk.impact === 'Medium' ? 2 : 1,
      probability: risk.probability === 'High' ? 3 : risk.probability === 'Medium' ? 2 : 1,
      riskScore: (risk.impact === 'High' ? 3 : risk.impact === 'Medium' ? 2 : 1) * 
                 (risk.probability === 'High' ? 3 : risk.probability === 'Medium' ? 2 : 1)
    }))
  );
};