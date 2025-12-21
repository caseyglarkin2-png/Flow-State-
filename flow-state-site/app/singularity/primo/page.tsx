// Primo Singularity Map - Main Page
// /singularity/primo route

'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Dynamic import for all components to avoid SSR issues
const KPIStrip = dynamic(() => import('@/components/primo/KPIStrip'), { ssr: false });
const ControlPanel = dynamic(() => import('@/components/primo/ControlPanel').then(m => m.default), { ssr: false });
const ControlPanelToggle = dynamic(() => import('@/components/primo/ControlPanel').then(m => m.ControlPanelToggle), { ssr: false });
const FacilityDrawer = dynamic(() => import('@/components/primo/FacilityDrawer'), { ssr: false });
const ThemeStudio = dynamic(() => import('@/components/primo/ThemeStudio'), { ssr: false });
const CSVImport = dynamic(() => import('@/components/primo/CSVImport'), { ssr: false });
const LogoSwitcher = dynamic(() => import('@/components/primo/LogoSwitcher'), { ssr: false });
const DigitalTwinGenerator = dynamic(() => import('@/components/primo/DigitalTwinGenerator').then(m => m.DigitalTwinGenerator), { ssr: false });

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
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-screen h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#00B4FF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#888] text-sm">Loading Primo Singularity Map...</p>
        </div>
      </div>
    );
  }

  return <PrimoSingularityContent />;
}

// Separate component that only renders on client
function PrimoSingularityContent() {
  const [storeLoaded, setStoreLoaded] = useState(false);
  const [storeState, setStoreState] = useState<any>(null);
  
  useEffect(() => {
    // Dynamically load store on client side only
    const loadStore = async () => {
      const { usePrimoStore } = await import('@/store/primoStore');
      setStoreState({
        theme: usePrimoStore.getState().theme,
        isControlPanelOpen: usePrimoStore.getState().isControlPanelOpen,
        setControlPanelOpen: usePrimoStore.getState().setControlPanelOpen,
        setThemeStudioOpen: usePrimoStore.getState().setThemeStudioOpen,
      });
      
      // Subscribe to changes
      usePrimoStore.subscribe((state) => {
        setStoreState({
          theme: state.theme,
          isControlPanelOpen: state.isControlPanelOpen,
          setControlPanelOpen: state.setControlPanelOpen,
          setThemeStudioOpen: state.setThemeStudioOpen,
        });
      });
      
      setStoreLoaded(true);
    };
    loadStore();
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (!storeState?.theme?.colors) return;
    const theme = storeState.theme;
    document.documentElement.style.setProperty('--color-background', theme.colors.background);
    document.documentElement.style.setProperty('--color-surface', theme.colors.surface);
    document.documentElement.style.setProperty('--color-primary', theme.colors.primary);
    document.documentElement.style.setProperty('--color-alert', theme.colors.alert);
    document.documentElement.style.setProperty('--color-text', theme.colors.text);
    document.documentElement.style.setProperty('--color-text-secondary', theme.colors.textSecondary);
    document.documentElement.style.setProperty('--font-body', theme.typography.bodyFont);
    document.documentElement.style.setProperty('--font-mono', theme.typography.monoFont);
  }, [storeState?.theme]);

  if (!storeLoaded || !storeState?.theme) {
    return (
      <div className="w-screen h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#00B4FF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#888] text-sm">Initializing...</p>
        </div>
      </div>
    );
  }

  const { theme, isControlPanelOpen, setControlPanelOpen, setThemeStudioOpen } = storeState;

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
      <DigitalTwinGenerator />

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
            {/* Filter Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.colors.primary} strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
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
          {/* Settings Icon */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.colors.primary} strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
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
