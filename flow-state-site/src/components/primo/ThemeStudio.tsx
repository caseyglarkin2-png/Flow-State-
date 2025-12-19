// Primo Singularity Map - Theme Studio Component
// Floating panel for customizing colors, typography, logos, and icons

'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrimoStore } from '@/store/primoStore';
import {
  CloseIcon,
  PaletteIcon,
  TypographyIcon,
  ImageIcon,
  GridIcon,
  DownloadIcon,
  UploadIcon,
} from '@/brand/icons';
import { iconMap, IconName } from '@/brand/icons';
import { logoMap, logoVariantLabels, LogoVariant } from '@/brand/logos';
import { defaultTheme } from '@/types/primo';
import { cn } from '@/lib/utils';

// Tab button
interface TabButtonProps {
  active: boolean;
  icon: React.FC<{ size?: number; color?: string }>;
  label: string;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ active, icon: Icon, label, onClick }) => {
  const theme = usePrimoStore((state) => state.theme);
  
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-md transition-colors',
        active ? '' : 'hover:bg-white/5'
      )}
      style={{
        backgroundColor: active ? `${theme.colors.primary}20` : 'transparent',
        color: active ? theme.colors.primary : theme.colors.textSecondary,
      }}
    >
      <Icon size={16} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

// Color picker input
interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const ColorInput: React.FC<ColorInputProps> = ({ label, value, onChange }) => {
  const theme = usePrimoStore((state) => state.theme);
  
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm" style={{ color: theme.colors.text }}>
        {label}
      </span>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-20 px-2 py-1 text-xs font-mono rounded border"
          style={{
            backgroundColor: theme.colors.background,
            borderColor: `${theme.colors.primary}30`,
            color: theme.colors.text,
          }}
        />
      </div>
    </div>
  );
};

// Font selector
interface FontSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

const FontSelect: React.FC<FontSelectProps> = ({ label, value, onChange, options }) => {
  const theme = usePrimoStore((state) => state.theme);
  
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm" style={{ color: theme.colors.text }}>
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-2 py-1 text-sm rounded border cursor-pointer"
        style={{
          backgroundColor: theme.colors.background,
          borderColor: `${theme.colors.primary}30`,
          color: theme.colors.text,
        }}
      >
        {options.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
    </div>
  );
};

// Size slider
interface SizeSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}

const SizeSlider: React.FC<SizeSliderProps> = ({ label, value, onChange, min, max }) => {
  const theme = usePrimoStore((state) => state.theme);
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm" style={{ color: theme.colors.text }}>
          {label}
        </span>
        <span className="text-sm font-mono" style={{ color: theme.colors.textSecondary }}>
          {value}px
        </span>
      </div>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        className="w-full accent-[var(--primary)]"
        style={{ '--primary': theme.colors.primary } as React.CSSProperties}
      />
    </div>
  );
};

// Colors Tab Content
const ColorsTab: React.FC = () => {
  const theme = usePrimoStore((state) => state.theme);
  const setThemeColors = usePrimoStore((state) => state.setThemeColors);
  
  return (
    <div className="space-y-4">
      <ColorInput
        label="Background"
        value={theme.colors.background}
        onChange={(v) => setThemeColors({ background: v })}
      />
      <ColorInput
        label="Surface"
        value={theme.colors.surface}
        onChange={(v) => setThemeColors({ surface: v })}
      />
      <ColorInput
        label="Primary Accent"
        value={theme.colors.primary}
        onChange={(v) => setThemeColors({ primary: v })}
      />
      <ColorInput
        label="Alert"
        value={theme.colors.alert}
        onChange={(v) => setThemeColors({ alert: v })}
      />
      <ColorInput
        label="Text"
        value={theme.colors.text}
        onChange={(v) => setThemeColors({ text: v })}
      />
      <ColorInput
        label="Text Secondary"
        value={theme.colors.textSecondary}
        onChange={(v) => setThemeColors({ textSecondary: v })}
      />
    </div>
  );
};

// Typography Tab Content
const TypographyTab: React.FC = () => {
  const theme = usePrimoStore((state) => state.theme);
  const setThemeTypography = usePrimoStore((state) => state.setThemeTypography);
  
  const bodyFonts = ['Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins'];
  const monoFonts = ['JetBrains Mono', 'Fira Code', 'Source Code Pro', 'IBM Plex Mono'];
  
  return (
    <div className="space-y-4">
      <FontSelect
        label="Body Font"
        value={theme.typography.bodyFont}
        onChange={(v) => setThemeTypography({ bodyFont: v })}
        options={bodyFonts}
      />
      <FontSelect
        label="Mono Font"
        value={theme.typography.monoFont}
        onChange={(v) => setThemeTypography({ monoFont: v })}
        options={monoFonts}
      />
      <SizeSlider
        label="Base Size"
        value={theme.typography.sizeBase}
        onChange={(v) => setThemeTypography({ sizeBase: v })}
        min={12}
        max={18}
      />
      <SizeSlider
        label="Small Size"
        value={theme.typography.sizeSmall}
        onChange={(v) => setThemeTypography({ sizeSmall: v })}
        min={10}
        max={14}
      />
      <SizeSlider
        label="Large Size"
        value={theme.typography.sizeLarge}
        onChange={(v) => setThemeTypography({ sizeLarge: v })}
        min={16}
        max={24}
      />
    </div>
  );
};

// Logos Tab Content
const LogosTab: React.FC = () => {
  const theme = usePrimoStore((state) => state.theme);
  const setThemeLogos = usePrimoStore((state) => state.setThemeLogos);
  
  const variants: LogoVariant[] = ['mark', 'wordmark', 'horizontal', 'stacked'];
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {variants.map((variant) => {
          const Logo = logoMap[variant];
          const isSelected = theme.logos.variant === variant;
          
          return (
            <button
              key={variant}
              onClick={() => setThemeLogos({ variant })}
              className={cn(
                'p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2',
                isSelected ? 'scale-105' : 'hover:scale-102'
              )}
              style={{
                backgroundColor: theme.colors.background,
                borderColor: isSelected ? theme.colors.primary : 'transparent',
              }}
            >
              <div className="h-12 flex items-center justify-center">
                <Logo
                  size={variant === 'stacked' ? 24 : 32}
                  color={theme.colors.primary}
                  secondaryColor={theme.colors.text}
                />
              </div>
              <span
                className="text-xs"
                style={{
                  color: isSelected ? theme.colors.primary : theme.colors.textSecondary,
                }}
              >
                {logoVariantLabels[variant]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Icons Tab Content
const IconsTab: React.FC = () => {
  const theme = usePrimoStore((state) => state.theme);
  
  // Display a subset of icons
  const displayIcons: IconName[] = [
    'Plant',
    'DC',
    'CrossDock',
    'Yard',
    'Terminal',
    'Gate',
    'GuardShack',
    'Truck',
    'Trailer',
    'InboundLane',
    'OutboundLane',
    'DropDock',
    'TrailerYard',
    'Filter',
    'Search',
    'Settings',
  ];
  
  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
        Flow Icons v1 (Active)
      </p>
      <div className="grid grid-cols-4 gap-2">
        {displayIcons.map((iconName) => {
          const Icon = iconMap[iconName];
          return (
            <div
              key={iconName}
              className="p-3 rounded-lg flex flex-col items-center gap-2"
              style={{ backgroundColor: `${theme.colors.background}60` }}
            >
              <Icon size={20} color={theme.colors.primary} />
              <span
                className="text-xs truncate w-full text-center"
                style={{ color: theme.colors.textSecondary }}
              >
                {iconName}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Main Theme Studio Component
export const ThemeStudio: React.FC = () => {
  const theme = usePrimoStore((state) => state.theme);
  const isOpen = usePrimoStore((state) => state.isThemeStudioOpen);
  const setThemeStudioOpen = usePrimoStore((state) => state.setThemeStudioOpen);
  const resetTheme = usePrimoStore((state) => state.resetTheme);
  const exportTheme = usePrimoStore((state) => state.exportTheme);
  const importTheme = usePrimoStore((state) => state.importTheme);
  
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'logos' | 'icons'>('colors');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleExport = () => {
    const json = exportTheme();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flow-state-theme.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importTheme(content);
      if (!success) {
        alert('Invalid theme file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[480px] rounded-xl overflow-hidden shadow-2xl"
          style={{
            backgroundColor: `${theme.colors.surface}F8`,
            border: `1px solid ${theme.colors.primary}30`,
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{ borderColor: `${theme.colors.primary}20` }}
          >
            <div className="flex items-center gap-2">
              <PaletteIcon size={20} color={theme.colors.primary} />
              <span className="font-semibold" style={{ color: theme.colors.text }}>
                Theme Studio
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleExport}
                className="p-1.5 rounded hover:bg-white/10 transition-colors"
                title="Export Theme"
              >
                <DownloadIcon size={16} color={theme.colors.textSecondary} />
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 rounded hover:bg-white/10 transition-colors"
                title="Import Theme"
              >
                <UploadIcon size={16} color={theme.colors.textSecondary} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
              <button
                onClick={() => setThemeStudioOpen(false)}
                className="p-1.5 rounded hover:bg-white/10 transition-colors ml-2"
              >
                <CloseIcon size={16} color={theme.colors.textSecondary} />
              </button>
            </div>
          </div>
          
          {/* Tabs */}
          <div
            className="flex items-center gap-1 px-4 py-2 border-b"
            style={{ borderColor: `${theme.colors.primary}10` }}
          >
            <TabButton
              active={activeTab === 'colors'}
              icon={PaletteIcon}
              label="Colors"
              onClick={() => setActiveTab('colors')}
            />
            <TabButton
              active={activeTab === 'typography'}
              icon={TypographyIcon}
              label="Typography"
              onClick={() => setActiveTab('typography')}
            />
            <TabButton
              active={activeTab === 'logos'}
              icon={ImageIcon}
              label="Logos"
              onClick={() => setActiveTab('logos')}
            />
            <TabButton
              active={activeTab === 'icons'}
              icon={GridIcon}
              label="Icons"
              onClick={() => setActiveTab('icons')}
            />
          </div>
          
          {/* Content */}
          <div className="p-4 max-h-[400px] overflow-y-auto">
            {activeTab === 'colors' && <ColorsTab />}
            {activeTab === 'typography' && <TypographyTab />}
            {activeTab === 'logos' && <LogosTab />}
            {activeTab === 'icons' && <IconsTab />}
          </div>
          
          {/* Footer */}
          <div
            className="px-4 py-3 border-t flex items-center justify-between"
            style={{ borderColor: `${theme.colors.primary}20` }}
          >
            <button
              onClick={resetTheme}
              className="px-3 py-1.5 text-sm rounded transition-colors hover:bg-white/10"
              style={{ color: theme.colors.textSecondary }}
            >
              Reset to Default
            </button>
            <span className="text-xs" style={{ color: theme.colors.textSecondary }}>
              Changes saved automatically
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThemeStudio;
