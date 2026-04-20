import { VentureData } from "../VentureData";
import { 
  calculatePortfolioMetrics, 
  getStatusDistribution, 
  getCategoryDistribution 
} from "../utils/portfolioUtils";
import { ExecutiveSummary } from "./ExecutiveSummary";
import { PortfolioComposition } from "./PortfolioComposition";
import { KeyHighlights } from "./KeyHighlights";
import { PortfolioActivity } from "./PortfolioActivity";

interface OverviewDashboardProps {
  ventures: VentureData[];
}

export function OverviewDashboard({ ventures }: OverviewDashboardProps) {
  const metrics = calculatePortfolioMetrics(ventures);
  const statusDistribution = getStatusDistribution(ventures);
  const categoryDistribution = getCategoryDistribution(ventures);

  return (
    <div className="space-y-6">
      <ExecutiveSummary metrics={metrics} />
      <PortfolioComposition 
        statusDistribution={statusDistribution}
        categoryDistribution={categoryDistribution}
        totalVentures={ventures.length}
      />
      <KeyHighlights metrics={metrics} />
      <PortfolioActivity ventures={ventures} />
    </div>
  );
}