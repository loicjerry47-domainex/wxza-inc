import { useState } from 'react';
import { VentureNavigation } from '../ventures/shared/VentureNavigation';
import { BreathingTileBackground } from '../shared/BreathingTileBackground';
import { 
  AtablePlatformDashboard,
  AtableDatabaseSchemaVisualizer,
  AtableArchitectureDiagram,
  AtableAPIPlayground,
  AtablePerformanceMetrics,
  AtableUserJourneyMap,
  AtableFinancialProjections
} from '../ventures/atable';
import { AtableNeuralPrototype } from './AtableNeuralPrototype';

interface AtableNeuralShowcaseProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
  onBackToHome?: () => void;
  onPreviousVenture?: () => void;
  onNextVenture?: () => void;
  hasNextVenture?: boolean;
  hasPreviousVenture?: boolean;
  currentVentureIndex?: number;
  totalVentures?: number;
}

export function AtableNeuralShowcase({ 
  deviceView,
  onBackToHome,
  onPreviousVenture,
  onNextVenture,
  hasNextVenture,
  hasPreviousVenture,
  currentVentureIndex,
  totalVentures
}: AtableNeuralShowcaseProps) {
  const [activeView, setActiveView] = useState('prototype');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <AtablePlatformDashboard />;
      case 'database':
        return <AtableDatabaseSchemaVisualizer />;
      case 'architecture':
        return <AtableArchitectureDiagram />;
      case 'api':
        return <AtableAPIPlayground />;
      case 'performance':
        return <AtablePerformanceMetrics />;
      case 'journey':
        return <AtableUserJourneyMap />;
      case 'financial':
        return <AtableFinancialProjections />;
      case 'prototype':
      default:
        return <AtableNeuralPrototype deviceView={deviceView} />;
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10">
        <VentureNavigation 
          activeView={activeView}
          onViewChange={setActiveView}
          ventureName="ATABLE NEURAL 2077"
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