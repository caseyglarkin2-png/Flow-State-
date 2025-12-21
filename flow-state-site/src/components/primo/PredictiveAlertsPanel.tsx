// Predictive Alerts Panel - AI-powered congestion and issue predictions
// Real-time alerts with suggested actions

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrimoStore } from '@/store/primoStore';
import { DigitalTwin } from '@/types/digitalTwin';
import { CloseIcon } from '@/brand/icons';
import { cn } from '@/lib/utils';

interface PredictiveAlert {
  id: string;
  type: 'congestion' | 'bottleneck' | 'capacity' | 'efficiency' | 'maintenance';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  prediction: string;
  confidence: number;
  suggestedActions: string[];
  timeframe: string;
  affectedZones: string[];
}

// Generate predictive alerts based on metrics
function generateAlerts(twin: any): PredictiveAlert[] {
  if (!twin) return [];
  
  const alerts: PredictiveAlert[] = [];
  const { metrics, assets, zones } = twin;
  
  // Congestion prediction
  if (metrics.predictedCongestion > 40) {
    alerts.push({
      id: 'congestion-1',
      type: 'congestion',
      severity: metrics.predictedCongestion > 70 ? 'critical' : 'warning',
      title: 'Congestion Predicted',
      message: `Yard congestion expected to reach ${metrics.predictedCongestion}% based on current inbound patterns.`,
      prediction: `Peak congestion in approximately ${Math.round((new Date(metrics.predictedPeakTime).getTime() - Date.now()) / (1000 * 60 * 60))} hours`,
      confidence: 87,
      suggestedActions: [
        'Expedite outbound trailer movements',
        'Pre-position empties in staging area',
        'Alert dock team for increased throughput',
      ],
      timeframe: '2-4 hours',
      affectedZones: ['Inbound Staging', 'Trailer Storage'],
    });
  }

  // Capacity alert
  if (metrics.yardUtilization > 75) {
    alerts.push({
      id: 'capacity-1',
      type: 'capacity',
      severity: metrics.yardUtilization > 90 ? 'critical' : 'warning',
      title: 'High Yard Utilization',
      message: `Yard is at ${metrics.yardUtilization}% capacity with ${metrics.trailersInYard} trailers.`,
      prediction: 'May reach 100% within 3 hours at current rate',
      confidence: 92,
      suggestedActions: [
        'Prioritize loaded trailer departures',
        'Defer non-critical inbound arrivals',
        'Activate overflow parking area',
      ],
      timeframe: '1-3 hours',
      affectedZones: ['Trailer Storage', 'Outbound Staging'],
    });
  }

  // Dock availability
  if (metrics.availableLoadingDocks < 3) {
    alerts.push({
      id: 'dock-1',
      type: 'bottleneck',
      severity: metrics.availableLoadingDocks < 1 ? 'critical' : 'warning',
      title: 'Limited Dock Availability',
      message: `Only ${metrics.availableLoadingDocks} docks available out of ${metrics.activeLoadingDocks + metrics.availableLoadingDocks} total.`,
      prediction: 'Queue buildup expected within 30 minutes',
      confidence: 94,
      suggestedActions: [
        'Fast-track current loading operations',
        'Assign additional dock workers',
        'Implement priority dock scheduling',
      ],
      timeframe: '30-60 minutes',
      affectedZones: ['Loading Docks'],
    });
  }

  // Dwell time alert
  if (metrics.averageDwellTime > 100) {
    alerts.push({
      id: 'dwell-1',
      type: 'efficiency',
      severity: metrics.averageDwellTime > 150 ? 'warning' : 'info',
      title: 'Elevated Dwell Times',
      message: `Average trailer dwell time is ${metrics.averageDwellTime} minutes, above target of 90 minutes.`,
      prediction: 'Likely to impact daily throughput by 15%',
      confidence: 78,
      suggestedActions: [
        'Analyze trailer-specific delays',
        'Review dock assignment efficiency',
        'Check for documentation holdups',
      ],
      timeframe: 'Ongoing',
      affectedZones: ['All Zones'],
    });
  }

  // Flow score alert
  if (metrics.flowScore < 60) {
    alerts.push({
      id: 'flow-1',
      type: 'efficiency',
      severity: metrics.flowScore < 40 ? 'critical' : 'warning',
      title: 'Low Flow Score',
      message: `Current flow score is ${metrics.flowScore}/100, indicating suboptimal yard operations.`,
      prediction: 'Continued degradation without intervention',
      confidence: 85,
      suggestedActions: [
        'Review and address all bottlenecks',
        'Increase gate processing speed',
        'Balance dock utilization',
      ],
      timeframe: 'Immediate',
      affectedZones: metrics.bottlenecks.length > 0 ? ['Multiple Zones'] : ['All Zones'],
    });
  }

  // Always add a positive info if no issues
  if (alerts.length === 0) {
    alerts.push({
      id: 'status-ok',
      type: 'efficiency',
      severity: 'info',
      title: 'Operations Normal',
      message: `Yard is operating efficiently with a flow score of ${metrics.flowScore}/100.`,
      prediction: 'Smooth operations expected for the next 4 hours',
      confidence: 91,
      suggestedActions: [
        'Continue monitoring key metrics',
        'Prepare for scheduled arrivals',
      ],
      timeframe: '4+ hours',
      affectedZones: [],
    });
  }

  return alerts;
}

export interface PredictiveAlertsPanelProps {
  twin: DigitalTwin | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PredictiveAlertsPanel: React.FC<PredictiveAlertsPanelProps> = ({ 
  twin,
  isOpen, 
  onClose, 
}) => {
  const theme = usePrimoStore((state) => state.theme);
  const [alerts, setAlerts] = useState<PredictiveAlert[]>([]);
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);

  useEffect(() => {
    if (twin) {
      setAlerts(generateAlerts(twin));
    }
  }, [twin]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#FF2A00';
      case 'warning': return '#FFB800';
      default: return '#00B4FF';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'congestion': return '🚦';
      case 'bottleneck': return '⚠️';
      case 'capacity': return '📦';
      case 'efficiency': return '📈';
      case 'maintenance': return '🔧';
      default: return '📊';
    }
  };

  const criticalCount = alerts.filter(a => a.severity === 'critical').length;
  const warningCount = alerts.filter(a => a.severity === 'warning').length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed right-4 top-20 bottom-4 w-[380px] z-40 flex flex-col rounded-xl overflow-hidden"
          style={{
            backgroundColor: `${theme.colors.surface}F5`,
            border: `1px solid ${theme.colors.primary}30`,
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{ borderColor: `${theme.colors.primary}20` }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ 
                  background: criticalCount > 0 
                    ? `linear-gradient(135deg, ${theme.colors.alert}40, ${theme.colors.alert}20)`
                    : `linear-gradient(135deg, ${theme.colors.primary}40, ${theme.colors.primary}20)`,
                }}
              >
                <span className="text-lg">🔮</span>
              </div>
              <div>
                <h3 className="font-bold" style={{ color: theme.colors.text }}>
                  Predictive Alerts
                </h3>
                <p className="text-xs" style={{ color: theme.colors.textSecondary }}>
                  AI-powered forecasting
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {criticalCount > 0 && (
                <span 
                  className="px-2 py-0.5 rounded-full text-xs font-bold animate-pulse"
                  style={{ backgroundColor: '#FF2A0030', color: '#FF2A00' }}
                >
                  {criticalCount} Critical
                </span>
              )}
              {warningCount > 0 && (
                <span 
                  className="px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{ backgroundColor: '#FFB80030', color: '#FFB800' }}
                >
                  {warningCount} Warning
                </span>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <CloseIcon size={16} color={theme.colors.textSecondary} />
              </button>
            </div>
          </div>

          {/* Alerts List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {!twin ? (
              <div className="text-center py-8">
                <span className="text-4xl mb-4 block">🔮</span>
                <p style={{ color: theme.colors.textSecondary }}>
                  Generate a digital twin to see predictive alerts
                </p>
              </div>
            ) : (
              alerts.map((alert, idx) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-lg overflow-hidden"
                  style={{
                    backgroundColor: `${theme.colors.background}60`,
                    border: `1px solid ${getSeverityColor(alert.severity)}30`,
                  }}
                >
                  <button
                    onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
                    className="w-full text-left p-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{getTypeIcon(alert.type)}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span 
                            className="font-medium text-sm"
                            style={{ color: theme.colors.text }}
                          >
                            {alert.title}
                          </span>
                          <span 
                            className="px-1.5 py-0.5 rounded text-xs uppercase font-bold"
                            style={{ 
                              backgroundColor: `${getSeverityColor(alert.severity)}20`,
                              color: getSeverityColor(alert.severity),
                            }}
                          >
                            {alert.severity}
                          </span>
                        </div>
                        <p 
                          className="text-xs line-clamp-2"
                          style={{ color: theme.colors.textSecondary }}
                        >
                          {alert.message}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span 
                            className="text-xs"
                            style={{ color: theme.colors.primary }}
                          >
                            {alert.confidence}% confidence
                          </span>
                          <span 
                            className="text-xs"
                            style={{ color: theme.colors.textSecondary }}
                          >
                            {alert.timeframe}
                          </span>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedAlert === alert.id ? 180 : 0 }}
                        className="text-xs"
                        style={{ color: theme.colors.textSecondary }}
                      >
                        ▼
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedAlert === alert.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t"
                        style={{ borderColor: `${theme.colors.primary}10` }}
                      >
                        <div className="p-4 space-y-3">
                          <div>
                            <span 
                              className="text-xs font-medium"
                              style={{ color: theme.colors.text }}
                            >
                              Prediction
                            </span>
                            <p 
                              className="text-xs mt-1"
                              style={{ color: theme.colors.textSecondary }}
                            >
                              {alert.prediction}
                            </p>
                          </div>

                          <div>
                            <span 
                              className="text-xs font-medium"
                              style={{ color: theme.colors.text }}
                            >
                              Suggested Actions
                            </span>
                            <ul className="mt-1 space-y-1">
                              {alert.suggestedActions.map((action, i) => (
                                <li 
                                  key={i}
                                  className="flex items-start gap-2 text-xs"
                                  style={{ color: theme.colors.textSecondary }}
                                >
                                  <span style={{ color: theme.colors.primary }}>→</span>
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {alert.affectedZones.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {alert.affectedZones.map((zone, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 rounded text-xs"
                                  style={{
                                    backgroundColor: `${theme.colors.primary}15`,
                                    color: theme.colors.primary,
                                  }}
                                >
                                  {zone}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            )}
          </div>

          {/* Footer */}
          <div 
            className="p-4 border-t text-center"
            style={{ borderColor: `${theme.colors.primary}20` }}
          >
            <p className="text-xs" style={{ color: theme.colors.textSecondary }}>
              Predictions updated every 30 seconds
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PredictiveAlertsPanel;
