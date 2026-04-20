import { useState } from 'react';
import { VentureNavigation } from '../ventures/shared/VentureNavigation';
import { BreathingTileBackground } from '../shared/BreathingTileBackground';
import { 
  GcraftPlatformDashboard,
  GcraftDatabaseSchemaVisualizer,
  GcraftArchitectureDiagram,
  GcraftAPIPlayground,
  GcraftPerformanceMetrics,
  GcraftUserJourneyMap,
  GcraftFinancialProjections
} from '../ventures/gcraft';
import { GcraftPrototype } from './GcraftPrototype';

interface GcraftShowcaseProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
  onBackToHome?: () => void;
  onPreviousVenture?: () => void;
  onNextVenture?: () => void;
  hasNextVenture?: boolean;
  hasPreviousVenture?: boolean;
  currentVentureIndex?: number;
  totalVentures?: number;
}

export function GcraftShowcase({ 
  deviceView,
  onBackToHome,
  onPreviousVenture,
  onNextVenture,
  hasNextVenture,
  hasPreviousVenture,
  currentVentureIndex,
  totalVentures
}: GcraftShowcaseProps) {
  const [activeView, setActiveView] = useState('prototype');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <GcraftPlatformDashboard />;
      case 'database':
        return <GcraftDatabaseSchemaVisualizer />;
      case 'architecture':
        return <GcraftArchitectureDiagram />;
      case 'api':
        return <GcraftAPIPlayground />;
      case 'performance':
        return <GcraftPerformanceMetrics />;
      case 'journey':
        return <GcraftUserJourneyMap />;
      case 'financial':
        return <GcraftFinancialProjections />;
      case 'prototype':
      default:
        return <GcraftPrototype deviceView={deviceView} />;
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10">
        <VentureNavigation 
          activeView={activeView}
          onViewChange={setActiveView}
          ventureName="Gcraft"
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
