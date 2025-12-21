// Historical Playback - Replay past yard activity
// Analyze flow patterns over time

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrimoStore } from '@/store/primoStore';
import { DigitalTwin } from '@/types/digitalTwin';
import { CloseIcon } from '@/brand/icons';

interface TimelineSnapshot {
  timestamp: Date;
  metrics: {
    flowScore: number;
    yardUtilization: number;
    trucksInbound: number;
    trucksOutbound: number;
    activeLoadingDocks: number;
    trailersInYard: number;
  };
}

// Generate simulated historical data
function generateHistoricalData(): TimelineSnapshot[] {
  const snapshots: TimelineSnapshot[] = [];
  const now = new Date();
  
  for (let i = 24; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = timestamp.getHours();
    
    // Simulate realistic patterns
    const isPeakHour = (hour >= 6 && hour <= 10) || (hour >= 14 && hour <= 18);
    const isNightShift = hour >= 22 || hour <= 5;
    
    const baseUtilization = isNightShift ? 30 : isPeakHour ? 75 : 55;
    const variance = Math.random() * 20 - 10;
    
    snapshots.push({
      timestamp,
      metrics: {
        flowScore: Math.round(Math.max(20, Math.min(100, 70 + (isNightShift ? 20 : isPeakHour ? -15 : 5) + variance))),
        yardUtilization: Math.round(Math.max(10, Math.min(95, baseUtilization + variance))),
        trucksInbound: Math.round(Math.max(0, (isPeakHour ? 12 : isNightShift ? 2 : 6) + Math.random() * 5)),
        trucksOutbound: Math.round(Math.max(0, (isPeakHour ? 10 : isNightShift ? 3 : 5) + Math.random() * 5)),
        activeLoadingDocks: Math.round(Math.max(2, Math.min(20, (isPeakHour ? 16 : isNightShift ? 4 : 10) + Math.random() * 4))),
        trailersInYard: Math.round(Math.max(20, Math.min(150, baseUtilization * 1.5 + Math.random() * 20))),
      },
    });
  }
  
  return snapshots;
}

export interface HistoricalPlaybackProps {
  twin: DigitalTwin | null;
  isOpen: boolean;
  onClose: () => void;
}

export const HistoricalPlayback: React.FC<HistoricalPlaybackProps> = ({ 
  twin,
  isOpen, 
  onClose, 
}) => {
  const theme = usePrimoStore((state) => state.theme);
  const [snapshots] = useState<TimelineSnapshot[]>(generateHistoricalData);
  const [currentIndex, setCurrentIndex] = useState(snapshots.length - 1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const playbackRef = useRef<NodeJS.Timeout | null>(null);

  const currentSnapshot = snapshots[currentIndex];

  useEffect(() => {
    if (isPlaying) {
      playbackRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev >= snapshots.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (playbackRef.current) {
        clearInterval(playbackRef.current);
      }
    }

    return () => {
      if (playbackRef.current) {
        clearInterval(playbackRef.current);
      }
    };
  }, [isPlaying, playbackSpeed, snapshots.length]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getMetricColor = (value: number, max: number, inverted = false) => {
    const ratio = value / max;
    if (inverted) {
      if (ratio > 0.7) return '#FF2A00';
      if (ratio > 0.5) return '#FFB800';
      return '#00FF88';
    }
    if (ratio > 0.7) return '#00FF88';
    if (ratio > 0.4) return '#FFB800';
    return '#FF2A00';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[900px] max-w-[95vw] z-50 rounded-xl overflow-hidden"
          style={{
            backgroundColor: `${theme.colors.surface}F5`,
            border: `1px solid ${theme.colors.primary}30`,
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{ borderColor: `${theme.colors.primary}20` }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${theme.colors.primary}20` }}
              >
                <span className="text-2xl">⏮️</span>
              </div>
              <div>
                <h3 className="font-bold text-lg" style={{ color: theme.colors.text }}>
                  Historical Playback
                </h3>
                <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                  Last 24 hours of yard activity
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span 
                className="text-sm font-mono px-3 py-1 rounded"
                style={{ 
                  backgroundColor: `${theme.colors.background}80`,
                  color: theme.colors.primary,
                }}
              >
                {formatDate(currentSnapshot.timestamp)} {formatTime(currentSnapshot.timestamp)}
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <CloseIcon size={18} color={theme.colors.textSecondary} />
              </button>
            </div>
          </div>

          {/* Metrics Display */}
          <div className="p-6">
            <div className="grid grid-cols-6 gap-4 mb-6">
              {[
                { label: 'Flow Score', value: currentSnapshot.metrics.flowScore, unit: '', max: 100 },
                { label: 'Yard Utilization', value: currentSnapshot.metrics.yardUtilization, unit: '%', max: 100, inverted: true },
                { label: 'Trucks In', value: currentSnapshot.metrics.trucksInbound, unit: '', max: 20 },
                { label: 'Trucks Out', value: currentSnapshot.metrics.trucksOutbound, unit: '', max: 20 },
                { label: 'Active Docks', value: currentSnapshot.metrics.activeLoadingDocks, unit: '', max: 20 },
                { label: 'Trailers', value: currentSnapshot.metrics.trailersInYard, unit: '', max: 150, inverted: true },
              ].map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-center p-4 rounded-lg"
                  style={{ backgroundColor: `${theme.colors.background}60` }}
                >
                  <div 
                    className="text-2xl font-bold tabular-nums"
                    style={{ color: getMetricColor(metric.value, metric.max, metric.inverted) }}
                  >
                    {metric.value}{metric.unit}
                  </div>
                  <div 
                    className="text-xs mt-1"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Timeline Chart */}
            <div 
              className="relative h-24 mb-4 rounded-lg overflow-hidden"
              style={{ backgroundColor: `${theme.colors.background}40` }}
            >
              {/* Flow score line */}
              <svg className="absolute inset-0 w-full h-full">
                <defs>
                  <linearGradient id="flowGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={theme.colors.primary} stopOpacity="0.5" />
                    <stop offset="100%" stopColor={theme.colors.primary} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d={`M ${snapshots.map((s, i) => 
                    `${(i / (snapshots.length - 1)) * 100}%,${100 - s.metrics.flowScore}%`
                  ).join(' L ')}`}
                  fill="none"
                  stroke={theme.colors.primary}
                  strokeWidth="2"
                />
                <path
                  d={`M 0%,100% L ${snapshots.map((s, i) => 
                    `${(i / (snapshots.length - 1)) * 100}%,${100 - s.metrics.flowScore}%`
                  ).join(' L ')} L 100%,100% Z`}
                  fill="url(#flowGradient)"
                />
              </svg>

              {/* Current position indicator */}
              <motion.div
                className="absolute top-0 bottom-0 w-0.5"
                style={{ 
                  backgroundColor: theme.colors.text,
                  left: `${(currentIndex / (snapshots.length - 1)) * 100}%`,
                }}
                animate={{ left: `${(currentIndex / (snapshots.length - 1)) * 100}%` }}
              >
                <div 
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                  style={{ backgroundColor: theme.colors.primary }}
                />
              </motion.div>

              {/* Labels */}
              <div className="absolute bottom-1 left-2 text-xs" style={{ color: theme.colors.textSecondary }}>
                {formatTime(snapshots[0].timestamp)}
              </div>
              <div className="absolute bottom-1 right-2 text-xs" style={{ color: theme.colors.textSecondary }}>
                {formatTime(snapshots[snapshots.length - 1].timestamp)}
              </div>
              <div className="absolute top-1 left-2 text-xs" style={{ color: theme.colors.primary }}>
                Flow Score
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setCurrentIndex(0)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                style={{ color: theme.colors.textSecondary }}
              >
                ⏮️
              </button>
              <button
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                style={{ color: theme.colors.textSecondary }}
              >
                ⏪
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-105"
                style={{ 
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.background,
                }}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>
              <button
                onClick={() => setCurrentIndex(Math.min(snapshots.length - 1, currentIndex + 1))}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                style={{ color: theme.colors.textSecondary }}
              >
                ⏩
              </button>
              <button
                onClick={() => setCurrentIndex(snapshots.length - 1)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                style={{ color: theme.colors.textSecondary }}
              >
                ⏭️
              </button>

              <div className="ml-4 flex items-center gap-2">
                <span className="text-xs" style={{ color: theme.colors.textSecondary }}>Speed:</span>
                {[1, 2, 4].map(speed => (
                  <button
                    key={speed}
                    onClick={() => setPlaybackSpeed(speed)}
                    className="px-2 py-1 rounded text-xs font-medium transition-all"
                    style={{
                      backgroundColor: playbackSpeed === speed 
                        ? theme.colors.primary 
                        : `${theme.colors.background}60`,
                      color: playbackSpeed === speed 
                        ? theme.colors.background 
                        : theme.colors.text,
                    }}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline Slider */}
            <div className="mt-4">
              <input
                type="range"
                min={0}
                max={snapshots.length - 1}
                value={currentIndex}
                onChange={(e) => setCurrentIndex(parseInt(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${theme.colors.primary} 0%, ${theme.colors.primary} ${(currentIndex / (snapshots.length - 1)) * 100}%, ${theme.colors.background}60 ${(currentIndex / (snapshots.length - 1)) * 100}%, ${theme.colors.background}60 100%)`,
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HistoricalPlayback;
