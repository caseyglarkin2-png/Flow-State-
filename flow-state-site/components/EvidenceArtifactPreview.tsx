/**
 * EVIDENCE ARTIFACT PREVIEW
 * 
 * Purpose: Show "receipt-style" timestamp record alongside Driver Journey
 * Design: Narrow vertical card with UTC timestamps, event type, verification status
 * Message: "Defensible timestamps kill disputes. Ground Source Truth."
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/motion-presets';
import { Shield } from '@/components/icons/FlowIcons';

export interface EvidenceArtifact {
  timestamp: string; // ISO 8601 format
  event: string;
  verification: 'verified' | 'pending' | 'flagged';
  driver?: string;
  carrier?: string;
  trailer?: string;
  proof?: string;
  signature?: string; // Cryptographic hash (abbreviated)
}

interface EvidenceArtifactPreviewProps {
  artifact: EvidenceArtifact;
  className?: string;
}

export default function EvidenceArtifactPreview({
  artifact,
  className = '',
}: EvidenceArtifactPreviewProps) {
  // Format timestamp to human-readable
  const formatTimestamp = (iso: string) => {
    try {
      const date = new Date(iso);
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
        utc: date.toISOString(),
      };
    } catch {
      return { date: '—', time: '—', utc: iso };
    }
  };

  const ts = formatTimestamp(artifact.timestamp);

  // Verification status styling
  const verificationStyles = {
    verified: {
      badge: 'bg-neon/10 border-neon/30 text-neon',
      icon: '✓',
    },
    pending: {
      badge: 'bg-steel/10 border-steel/30 text-steel',
      icon: '○',
    },
    flagged: {
      badge: 'bg-ember/10 border-ember/30 text-ember',
      icon: '⚠',
    },
  };

  const status = verificationStyles[artifact.verification];

  return (
    <motion.div
      variants={fadeIn}
      className={`
        rounded-xl border border-neon/20 bg-carbon/50 p-6 font-mono
        ${className}
      `}
    >
      {/* Header: Event Type + Verification Badge */}
      <div className="flex items-start justify-between mb-4 pb-4 border-b border-steel/10">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-neon/70 font-semibold mb-1">
            Event
          </p>
          <p className="text-sm font-bold text-white">
            {artifact.event}
          </p>
        </div>
        <div
          className={`
            px-3 py-1 rounded-md border text-xs font-semibold flex items-center gap-2
            ${status.badge}
          `}
        >
          <span>{status.icon}</span>
          <span className="capitalize">{artifact.verification}</span>
        </div>
      </div>

      {/* Timestamp (UTC) */}
      <div className="mb-4">
        <p className="text-xs text-steel/60 mb-1">UTC Timestamp</p>
        <p className="text-[11px] text-steel/90 break-all">
          {ts.utc}
        </p>
        <p className="text-xs text-white mt-1">
          {ts.date} {ts.time}
        </p>
      </div>

      {/* Details Grid */}
      {(artifact.driver || artifact.carrier || artifact.trailer) && (
        <div className="space-y-2 mb-4">
          {artifact.driver && (
            <div>
              <p className="text-xs text-steel/60">Driver</p>
              <p className="text-sm text-white">{artifact.driver}</p>
            </div>
          )}
          {artifact.carrier && (
            <div>
              <p className="text-xs text-steel/60">Carrier</p>
              <p className="text-sm text-white">{artifact.carrier}</p>
            </div>
          )}
          {artifact.trailer && (
            <div>
              <p className="text-xs text-steel/60">Trailer</p>
              <p className="text-sm text-white">{artifact.trailer}</p>
            </div>
          )}
        </div>
      )}

      {/* Proof Type */}
      {artifact.proof && (
        <div className="mb-4">
          <p className="text-xs text-steel/60 mb-1">Proof</p>
          <p className="text-sm text-neon">{artifact.proof}</p>
        </div>
      )}

      {/* Cryptographic Signature */}
      {artifact.signature && (
        <div className="pt-4 border-t border-steel/10">
          <p className="text-xs text-steel/60 mb-1">Signature</p>
          <p className="text-[11px] text-steel/90 break-all">
            {artifact.signature}
          </p>
        </div>
      )}

      {/* Ground Source Truth Badge */}
      <div className="mt-4 pt-4 border-t border-steel/10 flex items-center gap-2">
        <Shield size={14} className="text-neon" />
        <p className="text-xs text-steel/70">Ground Source Truth</p>
      </div>
    </motion.div>
  );
}

// Sample evidence artifacts for demo purposes
export const SAMPLE_ARTIFACTS: EvidenceArtifact[] = [
  {
    timestamp: '2026-01-19T14:32:18.427Z',
    event: 'Driver Check-In',
    verification: 'verified',
    driver: 'J. Smith',
    carrier: 'ACME Transport',
    trailer: 'TRL-8492',
    proof: 'Photo + CDL scan',
    signature: '0x8f4a2b9c1d5e6f7a',
  },
  {
    timestamp: '2026-01-19T14:34:05.192Z',
    event: 'Lane Assignment',
    verification: 'verified',
    driver: 'J. Smith',
    trailer: 'TRL-8492',
    proof: 'SMS receipt',
    signature: '0x3a7f2c9e8b1d4f6c',
  },
  {
    timestamp: '2026-01-19T15:12:33.841Z',
    event: 'Dwell Alert',
    verification: 'flagged',
    trailer: 'TRL-8492',
    proof: 'System timestamp variance',
    signature: '0x9c2e5a7b3f1d8c4e',
  },
  {
    timestamp: '2026-01-19T15:45:17.265Z',
    event: 'BOL Signature',
    verification: 'verified',
    driver: 'J. Smith',
    trailer: 'TRL-8492',
    proof: 'Digital signature + photo',
    signature: '0x5d8f3a2c7b9e1f4a',
  },
];
