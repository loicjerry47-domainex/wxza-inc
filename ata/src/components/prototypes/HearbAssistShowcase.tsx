import { useState } from 'react';
import { VentureNavigation } from '../ventures/shared/VentureNavigation';
import { BreathingTileBackground } from '../shared/BreathingTileBackground';
import { 
  HearbPlatformDashboard,
  HearbDatabaseSchemaVisualizer,
  HearbArchitectureDiagram,
  HearbAPIPlayground,
  HearbPerformanceMetrics,
  HearbUserJourneyMap,
  HearbFinancialProjections
} from '../ventures/hearb';
import { HearbAssistPrototype } from './HearbAssistPrototype';

interface HearbAssistShowcaseProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
  onBackToHome?: () => void;
  onPreviousVenture?: () => void;
  onNextVenture?: () => void;
  hasNextVenture?: boolean;
  hasPreviousVenture?: boolean;
  currentVentureIndex?: number;
  totalVentures?: number;
}

export function HearbAssistShowcase({ 
  deviceView,
  onBackToHome,
  onPreviousVenture,
  onNextVenture,
  hasNextVenture,
  hasPreviousVenture,
  currentVentureIndex,
  totalVentures
}: HearbAssistShowcaseProps) {
  const [activeView, setActiveView] = useState('prototype');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <HearbPlatformDashboard />;
      case 'database':
        return <HearbDatabaseSchemaVisualizer />;
      case 'architecture':
        return <HearbArchitectureDiagram />;
      case 'api':
        return <HearbAPIPlayground />;
      case 'performance':
        return <HearbPerformanceMetrics />;
      case 'journey':
        return <HearbUserJourneyMap />;
      case 'financial':
        return <HearbFinancialProjections />;
      case 'prototype':
      default:
        return <HearbAssistPrototype deviceView={deviceView} />;
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10">
        <VentureNavigation 
          activeView={activeView}
          onViewChange={setActiveView}
          ventureName="HEARb ASSIST"
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
