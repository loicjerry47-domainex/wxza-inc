import { useState } from 'react';
import { VentureNavigation } from '../ventures/shared/VentureNavigation';
import { BreathingTileBackground } from '../shared/BreathingTileBackground';
import { 
  InectPlatformDashboard,
  InectDatabaseSchemaVisualizer,
  InectArchitectureDiagram,
  InectAPIPlayground,
  InectPerformanceMetrics,
  InectUserJourneyMap,
  InectFinancialProjections
} from '../ventures/inect';
import { InectPrototype } from './InectPrototype';

interface InectShowcaseProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
  onBackToHome?: () => void;
  onPreviousVenture?: () => void;
  onNextVenture?: () => void;
  hasNextVenture?: boolean;
  hasPreviousVenture?: boolean;
  currentVentureIndex?: number;
  totalVentures?: number;
}

export function InectShowcase({ 
  deviceView,
  onBackToHome,
  onPreviousVenture,
  onNextVenture,
  hasNextVenture,
  hasPreviousVenture,
  currentVentureIndex,
  totalVentures
}: InectShowcaseProps) {
  const [activeView, setActiveView] = useState('prototype');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <InectPlatformDashboard />;
      case 'database':
        return <InectDatabaseSchemaVisualizer />;
      case 'architecture':
        return <InectArchitectureDiagram />;
      case 'api':
        return <InectAPIPlayground />;
      case 'performance':
        return <InectPerformanceMetrics />;
      case 'journey':
        return <InectUserJourneyMap />;
      case 'financial':
        return <InectFinancialProjections />;
      case 'prototype':
      default:
        return <InectPrototype deviceView={deviceView} />;
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10">
        <VentureNavigation 
          activeView={activeView}
          onViewChange={setActiveView}
          ventureName="INECT"
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
