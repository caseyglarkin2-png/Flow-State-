// Primo Singularity Map - Main Page
// /singularity/primo route

'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { usePrimoStore, selectSelectedFacility } from '@/store/primoStore';
import { useDigitalTwinStore } from '@/store/digitalTwinStore';
import {
  KPIStrip,
  ControlPanel,
  ControlPanelToggle,
  FacilityDrawer,
  ThemeStudio,
  CSVImport,
  LogoSwitcher,
  DigitalTwinGenerator,
  Yard3DView,
  AgentChat,
  PredictiveAlertsPanel,
  HistoricalPlayback,
  MultiFacilityDashboard,
  IntegrationHooks,
} from '@/components/primo';
import { SettingsIcon, FilterIcon } from '@/brand/icons';

// Dynamic import for map to avoid SSR issues
const PrimoMap = dynamic(
  () => import('@/components/primo/PrimoMap'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-void">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-neon border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-steel text-sm">Loading map...</p>
        </div>
      </div>
    ),
  }
);

export default function PrimoSingularityPage() {
  const theme = usePrimoStore((state) => state.theme);
  const isControlPanelOpen = usePrimoStore((state) => state.isControlPanelOpen);
  const setControlPanelOpen = usePrimoStore((state) => state.setControlPanelOpen);
  const setThemeStudioOpen = usePrimoStore((state) => state.setThemeStudioOpen);
  const selectedFacility = usePrimoStore(selectSelectedFacility);
  
  // Enhancement panel states
  const [enhancementPanels, setEnhancementPanels] = useState({
    yard3d: false,
    agentChat: false,
    predictiveAlerts: false,
    historicalPlayback: false,
    multiFacility: false,
    integrationHooks: false,
  });
  
  const handleOpenPanel = (panel: string) => {
    setEnhancementPanels(prev => ({ ...prev, [panel]: true }));
  };
  
  const handleClosePanel = (panel: string) => {
    setEnhancementPanels(prev => ({ ...prev, [panel]: false }));
  };
  
  // Get current twin for panels that need it
  const twins = useDigitalTwinStore((state) => state.twins);
  const currentTwin = selectedFacility ? twins[selectedFacility.id] : null;

  // Apply theme to document
  useEffect(() => {
    document.documentElement.style.setProperty('--color-background', theme.colors.background);
    document.documentElement.style.setProperty('--color-surface', theme.colors.surface);
    document.documentElement.style.setProperty('--color-primary', theme.colors.primary);
    document.documentElement.style.setProperty('--color-alert', theme.colors.alert);
    document.documentElement.style.setProperty('--color-text', theme.colors.text);
    document.documentElement.style.setProperty('--color-text-secondary', theme.colors.textSecondary);
    document.documentElement.style.setProperty('--font-body', theme.typography.bodyFont);
    document.documentElement.style.setProperty('--font-mono', theme.typography.monoFont);
  }, [theme]);

  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{
        backgroundColor: theme.colors.background,
        fontFamily: `${theme.typography.bodyFont}, sans-serif`,
      }}
    >
      {/* KPI Strip at top */}
      <KPIStrip />

      {/* Main map area */}
      <PrimoMap className="absolute inset-0 pt-16" />

      {/* Control Panel (left sidebar) */}
      <ControlPanel />
      <ControlPanelToggle />

      {/* Facility Detail Drawer (right sidebar) */}
      <FacilityDrawer />

      {/* Theme Studio (floating panel) */}
      <ThemeStudio />

      {/* CSV Import Modal */}
      <CSVImport />

      {/* Digital Twin Generator Panel */}
      <DigitalTwinGenerator onOpenPanel={handleOpenPanel} />

      {/* Enhancement Panels */}
      {currentTwin && (
        <>
          <Yard3DView
            twin={currentTwin}
            isOpen={enhancementPanels.yard3d}
            onClose={() => handleClosePanel('yard3d')}
          />
          
          <AgentChat
            twin={currentTwin}
            isOpen={enhancementPanels.agentChat}
            onClose={() => handleClosePanel('agentChat')}
          />
          
          <PredictiveAlertsPanel
            twin={currentTwin}
            isOpen={enhancementPanels.predictiveAlerts}
            onClose={() => handleClosePanel('predictiveAlerts')}
          />
          
          <HistoricalPlayback
            twin={currentTwin}
            isOpen={enhancementPanels.historicalPlayback}
            onClose={() => handleClosePanel('historicalPlayback')}
          />
          
          <IntegrationHooks
            twin={currentTwin}
            isOpen={enhancementPanels.integrationHooks}
            onClose={() => handleClosePanel('integrationHooks')}
          />
        </>
      )}
      
      <MultiFacilityDashboard
        isOpen={enhancementPanels.multiFacility}
        onClose={() => handleClosePanel('multiFacility')}
      />

      {/* Header overlay with logo and controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-16 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4"
      >
        <LogoSwitcher />
        <div className="h-6 w-px bg-white/20" />
        <span
          className="text-sm font-medium"
          style={{ color: theme.colors.textSecondary }}
        >
          Primo Network
        </span>
      </motion.div>

      {/* Quick action buttons (bottom left) */}
      <div className="fixed bottom-4 left-4 z-20 flex items-center gap-2">
        {!isControlPanelOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setControlPanelOpen(true)}
            className="p-3 rounded-lg backdrop-blur-md transition-colors hover:scale-105"
            style={{
              backgroundColor: `${theme.colors.surface}E6`,
              border: `1px solid ${theme.colors.primary}40`,
            }}
            title="Open Control Panel"
          >
            <FilterIcon size={20} color={theme.colors.primary} />
          </motion.button>
        )}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setThemeStudioOpen(true)}
          className="p-3 rounded-lg backdrop-blur-md transition-colors hover:scale-105"
          style={{
            backgroundColor: `${theme.colors.surface}E6`,
            border: `1px solid ${theme.colors.primary}40`,
          }}
          title="Open Theme Studio"
        >
          <SettingsIcon size={20} color={theme.colors.primary} />
        </motion.button>
      </div>

      {/* Attribution */}
      <div
        className="fixed bottom-4 right-4 z-10 text-xs px-2 py-1 rounded"
        style={{
          backgroundColor: `${theme.colors.surface}80`,
          color: theme.colors.textSecondary,
        }}
      >
        Flow State Singularity Map
      </div>
    </div>
  );
}
