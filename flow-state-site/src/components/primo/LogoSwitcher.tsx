// Primo Singularity Map - Logo Switcher Component
// Clickable logo that cycles through variants

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePrimoStore } from '@/store/primoStore';
import { logoMap, LogoVariant } from '@/brand/logos';

const LOGO_VARIANTS: LogoVariant[] = ['mark', 'wordmark', 'horizontal', 'stacked'];

export const LogoSwitcher: React.FC = () => {
  const theme = usePrimoStore((state) => state.theme);
  const setThemeLogos = usePrimoStore((state) => state.setThemeLogos);
  
  const currentVariant = theme.logos.variant;
  const Logo = logoMap[currentVariant];
  
  const cycleVariant = () => {
    const currentIndex = LOGO_VARIANTS.indexOf(currentVariant);
    const nextIndex = (currentIndex + 1) % LOGO_VARIANTS.length;
    setThemeLogos({ variant: LOGO_VARIANTS[nextIndex] });
  };
  
  return (
    <motion.button
      onClick={cycleVariant}
      className="cursor-pointer hover:opacity-80 transition-opacity"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      title="Click to cycle logo variants"
    >
      <Logo
        size={currentVariant === 'stacked' ? 24 : 32}
        color={theme.colors.primary}
        secondaryColor={theme.colors.text}
        appName="YardFlow by FreightRoll"
      />
    </motion.button>
  );
};

export default LogoSwitcher;
