import { useState } from 'react';
import { VentureNavigation } from '../ventures/shared/VentureNavigation';
import { BreathingTileBackground } from '../shared/BreathingTileBackground';
import { 
  LensstormPlatformDashboard,
  LensstormDatabaseSchemaVisualizer,
  LensstormArchitectureDiagram,
  LensstormAPIPlayground,
  LensstormPerformanceMetrics,
  LensstormUserJourneyMap,
  LensstormFinancialProjections
} from '../ventures/lensstorm';
import { LensstormPrototype } from './LensstormPrototype';

interface LensstormShowcaseProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
  onBackToHome?: () => void;
  onPreviousVenture?: () => void;
  onNextVenture?: () => void;
  hasNextVenture?: boolean;
  hasPreviousVenture?: boolean;
  currentVentureIndex?: number;
  totalVentures?: number;
}

export function LensstormShowcase({ 
  deviceView,
  onBackToHome,
  onPreviousVenture,
  onNextVenture,
  hasNextVenture,
  hasPreviousVenture,
  currentVentureIndex,
  totalVentures
}: LensstormShowcaseProps) {
  const [activeView, setActiveView] = useState('prototype');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <LensstormPlatformDashboard />;
      case 'database':
        return <LensstormDatabaseSchemaVisualizer />;
      case 'architecture':
        return <LensstormArchitectureDiagram />;
      case 'api':
        return <LensstormAPIPlayground />;
      case 'performance':
        return <LensstormPerformanceMetrics />;
      case 'journey':
        return <LensstormUserJourneyMap />;
      case 'financial':
        return <LensstormFinancialProjections />;
      case 'prototype':
      default:
        return <LensstormPrototype deviceView={deviceView} />;
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10">
        <VentureNavigation 
          activeView={activeView}
          onViewChange={setActiveView}
          ventureName="LENSSTORM"
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