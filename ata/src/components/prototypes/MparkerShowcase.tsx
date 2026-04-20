import { useState } from 'react';
import { VentureNavigation } from '../ventures/shared/VentureNavigation';
import { BreathingTileBackground } from '../shared/BreathingTileBackground';
import { 
  MparkerPlatformDashboard,
  MparkerDatabaseSchemaVisualizer,
  MparkerArchitectureDiagram,
  MparkerAPIPlayground,
  MparkerPerformanceMetrics,
  MparkerUserJourneyMap,
  MparkerFinancialProjections
} from '../ventures/mparker';
import { MparkerPrototype } from './MparkerPrototype';

interface MparkerShowcaseProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
  onBackToHome?: () => void;
  onPreviousVenture?: () => void;
  onNextVenture?: () => void;
  hasNextVenture?: boolean;
  hasPreviousVenture?: boolean;
  currentVentureIndex?: number;
  totalVentures?: number;
}

export function MparkerShowcase({ 
  deviceView,
  onBackToHome,
  onPreviousVenture,
  onNextVenture,
  hasNextVenture,
  hasPreviousVenture,
  currentVentureIndex,
  totalVentures
}: MparkerShowcaseProps) {
  const [activeView, setActiveView] = useState('prototype');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <MparkerPlatformDashboard />;
      case 'database':
        return <MparkerDatabaseSchemaVisualizer />;
      case 'architecture':
        return <MparkerArchitectureDiagram />;
      case 'api':
        return <MparkerAPIPlayground />;
      case 'performance':
        return <MparkerPerformanceMetrics />;
      case 'journey':
        return <MparkerUserJourneyMap />;
      case 'financial':
        return <MparkerFinancialProjections />;
      case 'prototype':
      default:
        return <MparkerPrototype deviceView={deviceView} />;
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10">
        <VentureNavigation 
          activeView={activeView}
          onViewChange={setActiveView}
          ventureName="Mparker"
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
