import { useState } from 'react';
import { VentureNavigation } from '../ventures/shared/VentureNavigation';
import { BreathingTileBackground } from '../shared/BreathingTileBackground';
import { 
  HfloPlatformDashboard,
  HfloDatabaseSchemaVisualizer,
  HfloArchitectureDiagram,
  HfloAPIPlayground,
  HfloPerformanceMetrics,
  HfloUserJourneyMap,
  HfloFinancialProjections
} from '../ventures/hflo';
import { HfloPrototype } from './HfloPrototype';

interface HfloShowcaseProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
  onBackToHome?: () => void;
  onPreviousVenture?: () => void;
  onNextVenture?: () => void;
  hasNextVenture?: boolean;
  hasPreviousVenture?: boolean;
  currentVentureIndex?: number;
  totalVentures?: number;
}

export function HfloShowcase({ 
  deviceView,
  onBackToHome,
  onPreviousVenture,
  onNextVenture,
  hasNextVenture,
  hasPreviousVenture,
  currentVentureIndex,
  totalVentures
}: HfloShowcaseProps) {
  const [activeView, setActiveView] = useState('prototype');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <HfloPlatformDashboard />;
      case 'database':
        return <HfloDatabaseSchemaVisualizer />;
      case 'architecture':
        return <HfloArchitectureDiagram />;
      case 'api':
        return <HfloAPIPlayground />;
      case 'performance':
        return <HfloPerformanceMetrics />;
      case 'journey':
        return <HfloUserJourneyMap />;
      case 'financial':
        return <HfloFinancialProjections />;
      case 'prototype':
      default:
        return <HfloPrototype deviceView={deviceView} />;
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10">
        <VentureNavigation 
          activeView={activeView}
          onViewChange={setActiveView}
          ventureName="HFLO"
          onBackToHome={onBackToHome}
          onPreviousVenture={onPreviousVenture}
          onNextVenture={onNextVenture}
          hasNextVenture={hasNextVenture}
          hasPreviousVenture={hasPreviousVenture}
          currentVentureIndex={currentVentureIndex}
          totalVentures={totalVentures}
        />
        {renderContent()}
      </div>
    </div>
  );
}
