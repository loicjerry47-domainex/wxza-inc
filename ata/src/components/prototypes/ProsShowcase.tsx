import { useState } from 'react';
import { VentureNavigation } from '../ventures/shared/VentureNavigation';
import { BreathingTileBackground } from '../shared/BreathingTileBackground';
import { 
  PROSTechDashboard,
  DatabaseSchemaVisualizer,
  ArchitectureDiagramVisualizer,
  APIPlayground,
  RealTimeMetricsDashboard,
  UserJourneyMap,
  FinancialProjections
} from '../ventures/pros';
import { ProsPrototype } from './ProsPrototype';

interface ProsShowcaseProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
  onBackToHome?: () => void;
  onPreviousVenture?: () => void;
  onNextVenture?: () => void;
  hasNextVenture?: boolean;
  hasPreviousVenture?: boolean;
  currentVentureIndex?: number;
  totalVentures?: number;
}

export function ProsShowcase({ 
  deviceView,
  onBackToHome,
  onPreviousVenture,
  onNextVenture,
  hasNextVenture,
  hasPreviousVenture,
  currentVentureIndex,
  totalVentures
}: ProsShowcaseProps) {
  const [activeView, setActiveView] = useState('prototype');

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <PROSTechDashboard />;
      case 'database':
        return <DatabaseSchemaVisualizer />;
      case 'architecture':
        return <ArchitectureDiagramVisualizer />;
      case 'api':
        return <APIPlayground />;
      case 'performance':
        return <RealTimeMetricsDashboard />;
      case 'journey':
        return <UserJourneyMap />;
      case 'financial':
        return <FinancialProjections />;
      case 'prototype':
      default:
        return <ProsPrototype deviceView={deviceView} />;
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="relative z-10">
        <VentureNavigation 
          activeView={activeView}
          onViewChange={setActiveView}
          ventureName="PRO'S: Divine Machine"
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