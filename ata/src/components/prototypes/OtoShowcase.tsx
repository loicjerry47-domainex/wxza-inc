import { useState } from 'react';
import { VentureNavigation } from '../ventures/shared/VentureNavigation';
import { BreathingTileBackground } from '../shared/BreathingTileBackground';
import { 
  OtoPlatformDashboard,
  OtoDatabaseSchemaVisualizer,
  OtoArchitectureDiagram,
  OtoAPIPlayground,
  OtoPerformanceMetrics,
  OtoUserJourneyMap,
  OtoFinancialProjections
} from '../ventures/oto';
import { OtoPrototype } from './OtoPrototype';

interface OtoShowcaseProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
  onBackToHome?: () => void;
  onPreviousVenture?: () => void;
  onNextVenture?: () => void;
  hasNextVenture?: boolean;
  hasPreviousVenture?: boolean;
  currentVentureIndex?: number;
  totalVentures?: number;
}

export function OtoShowcase({ 
  deviceView,
  onBackToHome,
  onPreviousVenture,
  onNextVenture,
  hasNextVenture,
  hasPreviousVenture,
  currentVentureIndex,
  totalVentures
}: OtoShowcaseProps) {
  const [activeView, setActiveView] = useState('prototype');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <OtoPlatformDashboard />;
      case 'database':
        return <OtoDatabaseSchemaVisualizer />;
      case 'architecture':
        return <OtoArchitectureDiagram />;
      case 'api':
        return <OtoAPIPlayground />;
      case 'performance':
        return <OtoPerformanceMetrics />;
      case 'journey':
        return <OtoUserJourneyMap />;
      case 'financial':
        return <OtoFinancialProjections />;
      case 'prototype':
      default:
        return <OtoPrototype deviceView={deviceView} />;
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10">
        <VentureNavigation 
          activeView={activeView}
          onViewChange={setActiveView}
          ventureName="OTO"
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
