'use client';

import React, { useEffect, useState } from 'react';

interface HealthStatus {
  status: 'ok' | 'degraded' | 'down' | 'loading';
  timestamp: string | null;
  version: string | null;
  lastChecked: Date | null;
}

/**
 * Live health status indicator that polls /api/health
 */
export default function HealthIndicator() {
  const [health, setHealth] = useState<HealthStatus>({
    status: 'loading',
    timestamp: null,
    version: null,
    lastChecked: null,
  });

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch('/api/health', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setHealth({
            status: data.status === 'ok' ? 'ok' : 'degraded',
            timestamp: data.timestamp,
            version: data.version,
            lastChecked: new Date(),
          });
        } else {
          setHealth((prev) => ({
            ...prev,
            status: 'degraded',
            lastChecked: new Date(),
          }));
        }
      } catch {
        setHealth((prev) => ({
          ...prev,
          status: 'down',
          lastChecked: new Date(),
        }));
      }
    };

    // Initial check
    checkHealth();

    // Poll every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const statusConfig = {
    ok: {
      label: 'All Systems Operational',
      color: 'bg-neon',
      textColor: 'text-neon',
      pulse: false,
    },
    degraded: {
      label: 'Degraded Performance',
      color: 'bg-amber-500',
      textColor: 'text-amber-500',
      pulse: true,
    },
    down: {
      label: 'Service Disruption',
      color: 'bg-ember',
      textColor: 'text-ember',
      pulse: true,
    },
    loading: {
      label: 'Checking Status...',
      color: 'bg-steel/50',
      textColor: 'text-steel',
      pulse: true,
    },
  };

  const config = statusConfig[health.status];

  return (
    <div className="bg-carbon/50 border border-steel/20 rounded-xl p-6">
      {/* Status Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className={`w-4 h-4 rounded-full ${config.color}`} />
          {config.pulse && (
            <div className={`absolute inset-0 w-4 h-4 rounded-full ${config.color} animate-ping opacity-75`} />
          )}
        </div>
        <div>
          <h3 className={`text-xl font-bold ${config.textColor}`}>{config.label}</h3>
          {health.lastChecked && (
            <p className="text-xs text-steel/60">
              Last checked: {health.lastChecked.toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>

      {/* Service Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ServiceStatus name="API" status={health.status} />
        <ServiceStatus name="Web App" status={health.status} />
        <ServiceStatus name="OG Images" status={health.status} />
        <ServiceStatus name="Analytics" status={health.status} />
      </div>

      {/* Version Info */}
      {health.version && (
        <div className="mt-6 pt-4 border-t border-steel/10 flex items-center justify-between text-xs text-steel/60">
          <span>Platform Version: {health.version}</span>
          {health.timestamp && (
            <span>Server Time: {new Date(health.timestamp).toLocaleTimeString()}</span>
          )}
        </div>
      )}
    </div>
  );
}

function ServiceStatus({ name, status }: { name: string; status: HealthStatus['status'] }) {
  const isOk = status === 'ok';
  const isLoading = status === 'loading';
  
  return (
    <div className="flex items-center gap-2 p-3 bg-void/50 rounded-lg">
      <div className={`w-2 h-2 rounded-full ${
        isLoading ? 'bg-steel/50' : isOk ? 'bg-neon' : 'bg-amber-500'
      }`} />
      <span className="text-sm text-steel">{name}</span>
      <span className={`ml-auto text-xs ${isOk ? 'text-neon' : 'text-steel/50'}`}>
        {isLoading ? '...' : isOk ? 'OK' : '!'}
      </span>
    </div>
  );
}
