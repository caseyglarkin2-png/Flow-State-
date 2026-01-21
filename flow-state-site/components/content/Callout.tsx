/**
 * Callout - Styled callout blocks for emphasis
 * Variants: neutral, info, warning, success
 */

import React from 'react';
import { Info, AlertTriangle, CheckCircle, Lightbulb, type LucideIcon } from 'lucide-react';

type CalloutVariant = 'neutral' | 'info' | 'warning' | 'success';

interface CalloutProps {
  /** Callout style */
  variant?: CalloutVariant;
  /** Optional title */
  title?: string;
  /** Content */
  children: React.ReactNode;
  /** Hide icon */
  hideIcon?: boolean;
}

const variantStyles: Record<CalloutVariant, { bg: string; border: string; icon: string; titleColor: string }> = {
  neutral: {
    bg: 'bg-carbon/50',
    border: 'border-neon/20',
    icon: 'text-neon',
    titleColor: 'text-white',
  },
  info: {
    bg: 'bg-neon/5',
    border: 'border-neon/30',
    icon: 'text-neon',
    titleColor: 'text-neon',
  },
  warning: {
    bg: 'bg-ember/5',
    border: 'border-ember/30',
    icon: 'text-ember',
    titleColor: 'text-ember',
  },
  success: {
    bg: 'bg-green-500/5',
    border: 'border-green-500/30',
    icon: 'text-green-400',
    titleColor: 'text-green-400',
  },
};

const variantIcons: Record<CalloutVariant, LucideIcon> = {
  neutral: Lightbulb,
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
};

export default function Callout({
  variant = 'neutral',
  title,
  children,
  hideIcon = false,
}: CalloutProps) {
  const styles = variantStyles[variant];
  const Icon = variantIcons[variant];

  return (
    <div className={`rounded-2xl border ${styles.border} ${styles.bg} p-6`}>
      <div className="flex gap-4">
        {!hideIcon && (
          <div className="shrink-0 mt-0.5">
            <Icon className={`w-5 h-5 ${styles.icon}`} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {title && (
            <p className={`font-semibold mb-2 ${styles.titleColor}`}>
              {title}
            </p>
          )}
          <div className="text-steel leading-relaxed text-[15px] space-y-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
