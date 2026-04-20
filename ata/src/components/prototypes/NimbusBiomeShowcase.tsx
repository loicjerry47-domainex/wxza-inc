import { useState } from 'react';
import { VentureNavigation } from '../ventures/shared/VentureNavigation';
import { BreathingTileBackground } from '../shared/BreathingTileBackground';
import { 
  NimbusPlatformDashboard,
  NimbusDatabaseSchemaVisualizer,
  NimbusArchitectureDiagram,
  NimbusAPIPlayground,
  NimbusPerformanceMetrics,
  NimbusUserJourneyMap,
  NimbusFinancialProjections
} from '../ventures/nimbus';
import { NimbusBiomePrototype } from './NimbusBiomePrototype';

interface NimbusBiomeShowcaseProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
  onBackToHome?: () => void;
  onPreviousVenture?: () => void;
  onNextVenture?: () => void;
  hasNextVenture?: boolean;
  hasPreviousVenture?: boolean;
  currentVentureIndex?: number;
  totalVentures?: number;
}

export function NimbusBiomeShowcase({ 
  deviceView,
  onBackToHome,
  onPreviousVenture,
  onNextVenture,
  hasNextVenture,
  hasPreviousVenture,
  currentVentureIndex,
  totalVentures
}: NimbusBiomeShowcaseProps) {
  const [activeView, setActiveView] = useState('prototype');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <NimbusPlatformDashboard />;
      case 'database':
        return <NimbusDatabaseSchemaVisualizer />;
      case 'architecture':
        return <NimbusArchitectureDiagram />;
      case 'api':
        return <NimbusAPIPlayground />;
      case 'performance':
        return <NimbusPerformanceMetrics />;
      case 'journey':
        return <NimbusUserJourneyMap />;
      case 'financial':
        return <NimbusFinancialProjections />;
      case 'prototype':
      default:
        return <NimbusBiomePrototype deviceView={deviceView} />;
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10">
        <VentureNavigation 
          activeView={activeView}
          onViewChange={setActiveView}
          ventureName="NIMBUS BIOME™"
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