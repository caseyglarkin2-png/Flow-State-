// Product visual components - temporary placeholders until assets are ready

import React from 'react';

export const DigitalGuardVisual: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative aspect-video bg-gradient-to-br from-neon/10 to-ember/10 rounded-lg border border-neon/20 flex items-center justify-center ${className}`}>
    <div className="text-center p-8">
      <svg className="w-24 h-24 mx-auto mb-4 text-neon/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" strokeLinejoin="round" />
        <path d="M12 22V12M12 12L3 7M12 12l9-5" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <p className="text-steel/60 text-sm font-mono">Digital Guard Animation</p>
      <p className="text-steel/40 text-xs mt-1">ID Verification & Security</p>
    </div>
  </div>
);

export const DigitalCommsVisual: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative aspect-video bg-gradient-to-br from-neon/10 to-steel/10 rounded-lg border border-neon/20 flex items-center justify-center ${className}`}>
    <div className="text-center p-8">
      <svg className="w-24 h-24 mx-auto mb-4 text-neon/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8M12 8v8" opacity="0.4" />
        <circle cx="12" cy="6" r="1.5" fill="currentColor" />
        <circle cx="18" cy="12" r="1.5" fill="currentColor" />
        <circle cx="12" cy="18" r="1.5" fill="currentColor" />
        <circle cx="6" cy="12" r="1.5" fill="currentColor" />
      </svg>
      <p className="text-steel/60 text-sm font-mono">Digital Comms Animation</p>
      <p className="text-steel/40 text-xs mt-1">Multi-Language Messaging</p>
    </div>
  </div>
);

export const DigitalBOLVisual: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative aspect-video bg-gradient-to-br from-neon/10 to-void rounded-lg border border-neon/20 flex items-center justify-center ${className}`}>
    <div className="text-center p-8">
      <svg className="w-24 h-24 mx-auto mb-4 text-neon/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" opacity="0.4" />
        <path d="M16 16l2 2 4-4" strokeWidth="2" />
      </svg>
      <p className="text-steel/60 text-sm font-mono">Digital BOL Animation</p>
      <p className="text-steel/40 text-xs mt-1">Touchless Documentation</p>
    </div>
  </div>
);

export const DigitalYMSVisual: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative aspect-video bg-gradient-to-br from-neon/10 to-carbon rounded-lg border border-neon/20 flex items-center justify-center ${className}`}>
    <div className="text-center p-8">
      <svg className="w-24 h-24 mx-auto mb-4 text-neon/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="8" height="6" rx="1" opacity="0.3" />
        <rect x="14" y="4" width="8" height="6" rx="1" opacity="0.5" />
        <rect x="2" y="14" width="8" height="6" rx="1" opacity="0.7" />
        <rect x="14" y="14" width="8" height="6" rx="1" />
        <circle cx="6" cy="7" r="1" fill="currentColor" />
        <circle cx="18" cy="7" r="1" fill="currentColor" />
        <circle cx="6" cy="17" r="1" fill="currentColor" />
        <circle cx="18" cy="17" r="1" fill="currentColor" />
      </svg>
      <p className="text-steel/60 text-sm font-mono">Digital YMS Animation</p>
      <p className="text-steel/40 text-xs mt-1">Real-Time Yard Orchestration</p>
    </div>
  </div>
);
