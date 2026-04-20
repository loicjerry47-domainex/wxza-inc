import { VentureData } from "../VentureData";

export interface PortfolioMetrics {
  totalFunding: number;
  totalRevenue: number;
  totalCurrentRevenue: number;
  totalTeamSize: number;
  totalPatents: number;
  totalCompanies: number;
  avgTeamSize: number;
  avgROI: number;
}

export const parseFinancialValue = (value: string): number => {
  const amount = parseFloat(value.replace(/\$|,|ARR/g, ''));
  const multiplier = value.includes('B') ? 1000 : 
                    value.includes('M') ? 1 : 
                    value.includes('K') ? 0.001 : 1;
  return amount * multiplier;
};

export const formatCurrency = (amount: number): string => {
  if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}T`;
  if (amount >= 1) return `$${amount.toFixed(1)}B`;
  return `$${(amount * 1000).toFixed(0)}M`;
};

export const calculatePortfolioMetrics = (ventures: VentureData[]): PortfolioMetrics => {
  const totalFunding = ventures.reduce((sum, venture) => {
    return sum + parseFinancialValue(venture.financials.fundingAsk);
  }, 0);

  const totalRevenue = ventures.reduce((sum, venture) => {
    return sum + parseFinancialValue(venture.financials.projectedRevenue.year5);
  }, 0);

  const totalCurrentRevenue = ventures.reduce((sum, venture) => {
    if (!venture.financials.currentRevenue) return sum;
    return sum + parseFinancialValue(venture.financials.currentRevenue);
  }, 0);

  const totalTeamSize = ventures.reduce((sum, venture) => sum + (venture.team?.teamSize || 0), 0);
  const totalPatents = ventures.reduce((sum, venture) => sum + (venture.technology?.patents?.length || 0), 0);
  const totalCompanies = ventures.length;
  const avgTeamSize = totalTeamSize / totalCompanies;
  
  return { 
    totalFunding, 
    totalRevenue, 
    totalCurrentRevenue,
    totalTeamSize, 
    totalPatents,
    totalCompanies,
    avgTeamSize,
    avgROI: totalRevenue / totalFunding
  };
};

export const getStatusDistribution = (ventures: VentureData[]): Record<string, number> => {
  return ventures.reduce((acc, venture) => {
    acc[venture.status] = (acc[venture.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

export const getCategoryDistribution = (ventures: VentureData[]): Record<string, number> => {
  return ventures.reduce((acc, venture) => {
    acc[venture.category] = (acc[venture.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

export const getCurrentDate = (): string => {
  return new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export const getTopVenturesByRevenue = (ventures: VentureData[], limit: number = 3): VentureData[] => {
  return ventures
    .sort((a, b) => {
      const aRev = parseFloat((a.financials.currentRevenue || '0').replace(/\$|,|ARR/g, ''));
      const bRev = parseFloat((b.financials.currentRevenue || '0').replace(/\$|,|ARR/g, ''));
      return bRev - aRev;
    })
    .slice(0, limit);
};

export const getTopVenturesByPatents = (ventures: VentureData[], limit: number = 3): VentureData[] => {
  return ventures
    .sort((a, b) => (b.technology?.patents?.length || 0) - (a.technology?.patents?.length || 0))
    .slice(0, limit);
};

export const getTopVenturesByTeamSize = (ventures: VentureData[], limit: number = 3): VentureData[] => {
  return ventures
    .sort((a, b) => (b.team?.teamSize || 0) - (a.team?.teamSize || 0))
    .slice(0, limit);
};