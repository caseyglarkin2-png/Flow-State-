// Primo Singularity Map - Control Panel Component
// Search, filters, and toggles for the map

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrimoStore, selectUniqueBrands, selectUniqueRegions, DataSource } from '@/store/primoStore';
import { useDigitalTwinStore } from '@/store/digitalTwinStore';
import {
  SearchIcon,
  FilterIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  LayersIcon,
  FlowStatusIcon,
  ActivatingStatusIcon,
  ChaosStatusIcon,
  PlantIcon,
  DCIcon,
  CrossDockIcon,
  YardIcon,
  TerminalIcon,
  SettingsIcon,
  UploadIcon,
} from '@/brand/icons';
import { FacilityType, FacilityStatus } from '@/types/primo';
import { cn } from '@/lib/utils';

// Filter section component
interface FilterSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, isOpen, onToggle, children }) => {
  const theme = usePrimoStore((state) => state.theme);
  
  return (
    <div className="border-b border-white/5">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full px-4 py-3 hover:bg-white/5 transition-colors"
      >
        <span className="text-sm font-medium" style={{ color: theme.colors.text }}>
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRightIcon size={16} color={theme.colors.textSecondary} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 space-y-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Checkbox item
interface CheckboxItemProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  icon?: React.ReactNode;
  color?: string;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({ label, checked, onChange, icon, color }) => {
  const theme = usePrimoStore((state) => state.theme);
  
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div
        className={cn(
          'w-4 h-4 rounded border flex items-center justify-center transition-colors',
          checked ? 'border-transparent' : 'border-white/30'
        )}
        style={{
          backgroundColor: checked ? (color || theme.colors.primary) : 'transparent',
        }}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke={theme.colors.background}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      {icon && <span className="opacity-70">{icon}</span>}
      <span
        className="text-sm group-hover:opacity-100 transition-opacity"
        style={{ color: theme.colors.text, opacity: checked ? 1 : 0.7 }}
      >
        {label}
      </span>
    </label>
  );
};

// Toggle switch
interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, checked, onChange }) => {
  const theme = usePrimoStore((state) => state.theme);
  
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm" style={{ color: theme.colors.text }}>
        {label}
      </span>
      <button
        onClick={() => onChange(!checked)}
        className={cn(
          'relative w-10 h-5 rounded-full transition-colors',
          checked ? '' : 'bg-white/20'
        )}
        style={{
          backgroundColor: checked ? theme.colors.primary : undefined,
        }}
      >
        <motion.div
          animate={{ x: checked ? 20 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow"
        />
      </button>
    </label>
  );
};

export const ControlPanel: React.FC = () => {
  const theme = usePrimoStore((state) => state.theme);
  const filters = usePrimoStore((state) => state.filters);
  const toggles = usePrimoStore((state) => state.toggles);
  const isOpen = usePrimoStore((state) => state.isControlPanelOpen);
  const brands = usePrimoStore(selectUniqueBrands);
  const regions = usePrimoStore(selectUniqueRegions);
  const dataSource = usePrimoStore((state) => state.dataSource);
  const setDataSource = usePrimoStore((state) => state.setDataSource);
  
  const { setDigitalTwinPanelOpen } = useDigitalTwinStore();
  
  const {
    setSearch,
    toggleBrand,
    toggleFacilityType,
    toggleStatus,
    toggleRegion,
    resetFilters,
    setShowLanes,
    setShowLabels,
    setShowClusters,
    setAnimationEnabled,
    setControlPanelOpen,
    setThemeStudioOpen,
    setCSVImportOpen,
  } = usePrimoStore();
  
  const [openSections, setOpenSections] = useState({
    status: true,
    type: true,
    brand: false,
    region: false,
  });
  
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };
  
  const facilityTypes: { type: FacilityType; icon: React.ReactNode }[] = [
    { type: 'Plant', icon: <PlantIcon size={14} color={theme.colors.textSecondary} /> },
    { type: 'DC', icon: <DCIcon size={14} color={theme.colors.textSecondary} /> },
    { type: 'CrossDock', icon: <CrossDockIcon size={14} color={theme.colors.textSecondary} /> },
    { type: 'Yard', icon: <YardIcon size={14} color={theme.colors.textSecondary} /> },
    { type: 'Terminal', icon: <TerminalIcon size={14} color={theme.colors.textSecondary} /> },
  ];
  
  const statuses: { status: FacilityStatus; color: string; icon: React.ReactNode }[] = [
    { status: 'Flow', color: '#00B4FF', icon: <FlowStatusIcon size={14} /> },
    { status: 'Activating', color: '#FFB800', icon: <ActivatingStatusIcon size={14} /> },
    { status: 'Chaos', color: '#FF2A00', icon: <ChaosStatusIcon size={14} /> },
  ];
  
  const hasActiveFilters = 
    filters.search ||
    filters.brands.length > 0 ||
    filters.facilityTypes.length > 0 ||
    filters.statuses.length > 0 ||
    filters.regions.length > 0;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: -320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -320, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed left-4 top-20 bottom-4 w-72 z-30 flex flex-col rounded-lg overflow-hidden"
          style={{
            backgroundColor: `${theme.colors.surface}F2`,
            border: `1px solid ${theme.colors.primary}20`,
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{ borderColor: `${theme.colors.primary}20` }}
          >
            <div className="flex items-center gap-2">
              <FilterIcon size={18} color={theme.colors.primary} />
              <span className="font-semibold" style={{ color: theme.colors.text }}>
                Network Control
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setThemeStudioOpen(true)}
                className="p-1.5 rounded hover:bg-white/10 transition-colors"
                title="Theme Studio"
              >
                <SettingsIcon size={16} color={theme.colors.textSecondary} />
              </button>
              <button
                onClick={() => setCSVImportOpen(true)}
                className="p-1.5 rounded hover:bg-white/10 transition-colors"
                title="Import CSV"
              >
                <UploadIcon size={16} color={theme.colors.textSecondary} />
              </button>
              <button
                onClick={() => setControlPanelOpen(false)}
                className="p-1.5 rounded hover:bg-white/10 transition-colors"
              >
                <CloseIcon size={16} color={theme.colors.textSecondary} />
              </button>
            </div>
          </div>
          
          {/* Search */}
          <div className="p-4 border-b" style={{ borderColor: `${theme.colors.primary}10` }}>
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-md"
              style={{ backgroundColor: `${theme.colors.background}80` }}
            >
              <SearchIcon size={16} color={theme.colors.textSecondary} />
              <input
                type="text"
                placeholder="Search facilities..."
                value={filters.search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-50"
                style={{ color: theme.colors.text }}
              />
              {filters.search && (
                <button onClick={() => setSearch('')}>
                  <CloseIcon size={14} color={theme.colors.textSecondary} />
                </button>
              )}
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex-1 overflow-y-auto">
            {/* Status Filter */}
            <FilterSection
              title="Status"
              isOpen={openSections.status}
              onToggle={() => toggleSection('status')}
            >
              {statuses.map(({ status, color, icon }) => (
                <CheckboxItem
                  key={status}
                  label={status}
                  checked={filters.statuses.includes(status)}
                  onChange={() => toggleStatus(status)}
                  icon={icon}
                  color={color}
                />
              ))}
            </FilterSection>
            
            {/* Type Filter */}
            <FilterSection
              title="Facility Type"
              isOpen={openSections.type}
              onToggle={() => toggleSection('type')}
            >
              {facilityTypes.map(({ type, icon }) => (
                <CheckboxItem
                  key={type}
                  label={type}
                  checked={filters.facilityTypes.includes(type)}
                  onChange={() => toggleFacilityType(type)}
                  icon={icon}
                />
              ))}
            </FilterSection>
            
            {/* Brand Filter */}
            <FilterSection
              title="Brand"
              isOpen={openSections.brand}
              onToggle={() => toggleSection('brand')}
            >
              {brands.map((brand) => (
                <CheckboxItem
                  key={brand}
                  label={brand}
                  checked={filters.brands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                />
              ))}
            </FilterSection>
            
            {/* Region Filter */}
            <FilterSection
              title="Region"
              isOpen={openSections.region}
              onToggle={() => toggleSection('region')}
            >
              {regions.map((region) => (
                <CheckboxItem
                  key={region}
                  label={region}
                  checked={filters.regions.includes(region)}
                  onChange={() => toggleRegion(region)}
                />
              ))}
            </FilterSection>
          </div>
          
          {/* Reset Filters */}
          {hasActiveFilters && (
            <div className="p-3 border-t" style={{ borderColor: `${theme.colors.primary}10` }}>
              <button
                onClick={resetFilters}
                className="w-full py-2 rounded text-sm font-medium transition-colors hover:opacity-80"
                style={{
                  backgroundColor: `${theme.colors.alert}20`,
                  color: theme.colors.alert,
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
          
          {/* Display Toggles */}
          <div
            className="p-4 border-t space-y-3"
            style={{ borderColor: `${theme.colors.primary}20` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <LayersIcon size={16} color={theme.colors.primary} />
              <span className="text-sm font-medium" style={{ color: theme.colors.text }}>
                Display Options
              </span>
            </div>
            <ToggleSwitch
              label="Show Lanes"
              checked={toggles.showLanes}
              onChange={setShowLanes}
            />
            <ToggleSwitch
              label="Show Labels"
              checked={toggles.showLabels}
              onChange={setShowLabels}
            />
            <ToggleSwitch
              label="Cluster Points"
              checked={toggles.showClusters}
              onChange={setShowClusters}
            />
            <ToggleSwitch
              label="Animations"
              checked={toggles.animationEnabled}
              onChange={setAnimationEnabled}
            />
          </div>
          
          {/* Data Source */}
          <div
            className="p-4 border-t space-y-3"
            style={{ borderColor: `${theme.colors.primary}20` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium" style={{ color: theme.colors.text }}>
                Data Source
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {(['real', 'sample', 'combined'] as DataSource[]).map((source) => (
                <button
                  key={source}
                  onClick={() => setDataSource(source)}
                  className="px-2 py-1.5 rounded text-xs font-medium transition-all"
                  style={{
                    backgroundColor: dataSource === source 
                      ? theme.colors.primary 
                      : `${theme.colors.background}60`,
                    color: dataSource === source 
                      ? theme.colors.background 
                      : theme.colors.text,
                  }}
                >
                  {source === 'real' ? 'Primo' : source === 'sample' ? 'Sample' : 'All'}
                </button>
              ))}
            </div>
            <p className="text-xs" style={{ color: theme.colors.textSecondary }}>
              {dataSource === 'real' && '16 verified Primo facilities'}
              {dataSource === 'sample' && '260 sample facilities'}
              {dataSource === 'combined' && '276 total facilities'}
            </p>
          </div>
          
          {/* Digital Twin */}
          <div className="p-4 border-t" style={{ borderColor: `${theme.colors.primary}20` }}>
            <button
              onClick={() => setDigitalTwinPanelOpen(true)}
              className="w-full py-3 rounded-lg text-sm font-medium transition-all hover:scale-[1.02]"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.alert})`,
                color: theme.colors.background,
              }}
            >
              Digital Twin Generator
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Toggle button for when panel is closed
export const ControlPanelToggle: React.FC = () => {
  const theme = usePrimoStore((state) => state.theme);
  const isOpen = usePrimoStore((state) => state.isControlPanelOpen);
  const setControlPanelOpen = usePrimoStore((state) => state.setControlPanelOpen);
  
  if (isOpen) return null;
  
  return (
    <motion.button
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      onClick={() => setControlPanelOpen(true)}
      className="fixed left-4 top-20 z-30 p-3 rounded-lg backdrop-blur-md transition-colors hover:scale-105"
      style={{
        backgroundColor: `${theme.colors.surface}E6`,
        border: `1px solid ${theme.colors.primary}40`,
      }}
    >
      <FilterIcon size={20} color={theme.colors.primary} />
    </motion.button>
  );
};

export default ControlPanel;
