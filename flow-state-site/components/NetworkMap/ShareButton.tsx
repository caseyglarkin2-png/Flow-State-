'use client';

import React, { useState } from 'react';
import { useNetworkStore, getShareableUrl } from '@/src/lib/stores/networkStore';

interface ShareButtonProps {
  className?: string;
}

/**
 * Button to copy a shareable URL for the current network configuration.
 */
export function ShareButton({ className = '' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const config = useNetworkStore((state) => state.getConfig());
  const facilitiesCount = useNetworkStore((state) => state.facilities.length);

  const handleShare = async () => {
    setError(false);
    
    if (facilitiesCount === 0) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }

    try {
      const url = getShareableUrl(config);
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for browsers without clipboard API
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const buttonText = error
    ? facilitiesCount === 0
      ? 'Add facilities first'
      : 'Copy failed'
    : copied
    ? 'Copied!'
    : 'Share Network';

  return (
    <button
      onClick={handleShare}
      disabled={copied}
      className={`
        px-4 py-2 text-sm font-semibold rounded-lg transition-all
        ${copied
          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
          : error
          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
          : 'bg-neon/10 text-neon border border-neon/30 hover:bg-neon/20 hover:border-neon/50'
        }
        disabled:cursor-not-allowed
        ${className}
      `}
      aria-label={copied ? 'Link copied to clipboard' : 'Copy shareable link to clipboard'}
    >
      <span className="flex items-center gap-2">
        {copied ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        )}
        {buttonText}
      </span>
    </button>
  );
}

export default ShareButton;
