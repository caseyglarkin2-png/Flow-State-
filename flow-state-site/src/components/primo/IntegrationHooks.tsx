// Integration Hooks Panel - Webhook configuration for real data feeds
// Connect external systems to the digital twin

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrimoStore } from '@/store/primoStore';
import { DigitalTwin } from '@/types/digitalTwin';
import { CloseIcon } from '@/brand/icons';
import { cn } from '@/lib/utils';

interface WebhookConfig {
  id: string;
  name: string;
  type: 'inbound' | 'outbound';
  url: string;
  events: string[];
  status: 'active' | 'inactive' | 'error';
  lastTriggered?: Date;
  secretKey?: string;
}

interface IntegrationSource {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: 'YMS' | 'TMS' | 'WMS' | 'IoT' | 'Custom';
  connected: boolean;
}

const AVAILABLE_INTEGRATIONS: IntegrationSource[] = [
  { id: 'samsara', name: 'Samsara', icon: '🚛', description: 'Real-time GPS & telematics', category: 'IoT', connected: false },
  { id: 'project44', name: 'Project44', icon: '📍', description: 'Visibility platform', category: 'TMS', connected: false },
  { id: 'fourkites', name: 'FourKites', icon: '🗺️', description: 'Supply chain visibility', category: 'TMS', connected: false },
  { id: 'yardview', name: 'YardView', icon: '📦', description: 'Yard management system', category: 'YMS', connected: true },
  { id: 'manhattan', name: 'Manhattan WMS', icon: '🏭', description: 'Warehouse management', category: 'WMS', connected: false },
  { id: 'oracle', name: 'Oracle TMS', icon: '☁️', description: 'Transportation management', category: 'TMS', connected: false },
  { id: 'custom', name: 'Custom API', icon: '🔌', description: 'Your own integration', category: 'Custom', connected: false },
];

const WEBHOOK_EVENTS = [
  { id: 'trailer.arrived', label: 'Trailer Arrived', description: 'When a trailer enters the yard' },
  { id: 'trailer.departed', label: 'Trailer Departed', description: 'When a trailer leaves the yard' },
  { id: 'dock.assigned', label: 'Dock Assigned', description: 'When a trailer is assigned to a dock' },
  { id: 'dock.released', label: 'Dock Released', description: 'When a dock becomes available' },
  { id: 'gate.checkin', label: 'Gate Check-In', description: 'When a truck checks in at gate' },
  { id: 'gate.checkout', label: 'Gate Check-Out', description: 'When a truck checks out at gate' },
  { id: 'alert.congestion', label: 'Congestion Alert', description: 'When congestion is predicted' },
  { id: 'alert.capacity', label: 'Capacity Alert', description: 'When yard nears capacity' },
  { id: 'metrics.snapshot', label: 'Metrics Snapshot', description: 'Periodic metrics broadcast' },
];

export interface IntegrationHooksProps {
  twin: DigitalTwin | null;
  isOpen: boolean;
  onClose: () => void;
}

export const IntegrationHooks: React.FC<IntegrationHooksProps> = ({ twin, isOpen, onClose }) => {
  const theme = usePrimoStore((state) => state.theme);
  const [activeTab, setActiveTab] = useState<'integrations' | 'webhooks' | 'api'>('integrations');
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([
    {
      id: 'wh-1',
      name: 'YardView Sync',
      type: 'outbound',
      url: 'https://api.yardview.com/webhooks/primo',
      events: ['trailer.arrived', 'trailer.departed', 'dock.assigned'],
      status: 'active',
      lastTriggered: new Date(Date.now() - 15 * 60 * 1000),
    },
  ]);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [newWebhookUrl, setNewWebhookUrl] = useState('');

  const generateApiKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return 'fs_live_' + Array.from({ length: 32 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  const [apiKey] = useState(generateApiKey);

  const toggleEvent = (eventId: string) => {
    setSelectedEvents(prev =>
      prev.includes(eventId) ? prev.filter(e => e !== eventId) : [...prev, eventId]
    );
  };

  const addWebhook = () => {
    if (!newWebhookUrl || selectedEvents.length === 0) return;
    
    const newWebhook: WebhookConfig = {
      id: `wh-${Date.now()}`,
      name: `Webhook ${webhooks.length + 1}`,
      type: 'outbound',
      url: newWebhookUrl,
      events: selectedEvents,
      status: 'inactive',
    };
    
    setWebhooks(prev => [...prev, newWebhook]);
    setNewWebhookUrl('');
    setSelectedEvents([]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-4xl max-h-[85vh] rounded-xl overflow-hidden flex flex-col"
            style={{
              backgroundColor: theme.colors.surface,
              border: `1px solid ${theme.colors.primary}30`,
            }}
            onClick={(e) => e.stopPropagation()}
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
                  <span className="text-2xl">🔌</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: theme.colors.text }}>
                    Integration Hooks
                  </h3>
                  <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                    Connect external systems to your digital twin
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <CloseIcon size={20} color={theme.colors.textSecondary} />
              </button>
            </div>

            {/* Tabs */}
            <div 
              className="flex border-b px-6"
              style={{ borderColor: `${theme.colors.primary}10` }}
            >
              {[
                { id: 'integrations', label: 'Integrations', icon: '🔗' },
                { id: 'webhooks', label: 'Webhooks', icon: '📡' },
                { id: 'api', label: 'API Access', icon: '🔑' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all border-b-2',
                    activeTab === tab.id ? 'border-current' : 'border-transparent'
                  )}
                  style={{
                    color: activeTab === tab.id ? theme.colors.primary : theme.colors.textSecondary,
                  }}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'integrations' && (
                <div className="space-y-4">
                  <p className="text-sm mb-6" style={{ color: theme.colors.textSecondary }}>
                    Connect your existing systems to sync data with YardFlow by FreightRoll Digital Twins
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {AVAILABLE_INTEGRATIONS.map(integration => (
                      <motion.div
                        key={integration.id}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-xl cursor-pointer transition-all"
                        style={{
                          backgroundColor: `${theme.colors.background}60`,
                          border: `1px solid ${integration.connected ? theme.colors.primary : theme.colors.primary}20`,
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{integration.icon}</span>
                            <div>
                              <h4 className="font-medium" style={{ color: theme.colors.text }}>
                                {integration.name}
                              </h4>
                              <p className="text-xs" style={{ color: theme.colors.textSecondary }}>
                                {integration.description}
                              </p>
                            </div>
                          </div>
                          <span 
                            className="px-2 py-0.5 rounded text-xs"
                            style={{
                              backgroundColor: integration.connected ? `${theme.colors.primary}20` : `${theme.colors.textSecondary}20`,
                              color: integration.connected ? theme.colors.primary : theme.colors.textSecondary,
                            }}
                          >
                            {integration.connected ? 'Connected' : 'Connect'}
                          </span>
                        </div>
                        <div 
                          className="mt-3 px-2 py-1 rounded text-xs inline-block"
                          style={{
                            backgroundColor: `${theme.colors.primary}10`,
                            color: theme.colors.primary,
                          }}
                        >
                          {integration.category}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'webhooks' && (
                <div className="space-y-6">
                  {/* Existing Webhooks */}
                  <div>
                    <h4 className="text-sm font-medium mb-3" style={{ color: theme.colors.text }}>
                      Active Webhooks
                    </h4>
                    <div className="space-y-3">
                      {webhooks.map(webhook => (
                        <div
                          key={webhook.id}
                          className="p-4 rounded-xl"
                          style={{ backgroundColor: `${theme.colors.background}60` }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <span 
                                className={cn(
                                  'w-2 h-2 rounded-full',
                                  webhook.status === 'active' ? 'bg-green-500 animate-pulse' :
                                  webhook.status === 'error' ? 'bg-red-500' : 'bg-gray-500'
                                )}
                              />
                              <span className="font-medium" style={{ color: theme.colors.text }}>
                                {webhook.name}
                              </span>
                            </div>
                            <span 
                              className="px-2 py-0.5 rounded text-xs capitalize"
                              style={{
                                backgroundColor: webhook.status === 'active' ? '#00FF8820' : 
                                                 webhook.status === 'error' ? '#FF2A0020' : `${theme.colors.textSecondary}20`,
                                color: webhook.status === 'active' ? '#00FF88' : 
                                       webhook.status === 'error' ? '#FF2A00' : theme.colors.textSecondary,
                              }}
                            >
                              {webhook.status}
                            </span>
                          </div>
                          <p className="text-xs font-mono mb-2" style={{ color: theme.colors.textSecondary }}>
                            {webhook.url}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {webhook.events.map(event => (
                              <span
                                key={event}
                                className="px-2 py-0.5 rounded text-xs"
                                style={{
                                  backgroundColor: `${theme.colors.primary}15`,
                                  color: theme.colors.primary,
                                }}
                              >
                                {event}
                              </span>
                            ))}
                          </div>
                          {webhook.lastTriggered && (
                            <p className="text-xs mt-2" style={{ color: theme.colors.textSecondary }}>
                              Last triggered: {Math.round((Date.now() - webhook.lastTriggered.getTime()) / 60000)} min ago
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add New Webhook */}
                  <div 
                    className="p-4 rounded-xl"
                    style={{ 
                      backgroundColor: `${theme.colors.background}40`,
                      border: `1px dashed ${theme.colors.primary}30`,
                    }}
                  >
                    <h4 className="text-sm font-medium mb-4" style={{ color: theme.colors.text }}>
                      Add New Webhook
                    </h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs mb-1 block" style={{ color: theme.colors.textSecondary }}>
                          Endpoint URL
                        </label>
                        <input
                          type="url"
                          placeholder="https://your-server.com/webhook"
                          value={newWebhookUrl}
                          onChange={(e) => setNewWebhookUrl(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg text-sm bg-transparent outline-none"
                          style={{
                            backgroundColor: `${theme.colors.background}80`,
                            color: theme.colors.text,
                            border: `1px solid ${theme.colors.primary}20`,
                          }}
                        />
                      </div>

                      <div>
                        <label className="text-xs mb-2 block" style={{ color: theme.colors.textSecondary }}>
                          Events to Subscribe
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {WEBHOOK_EVENTS.map(event => (
                            <button
                              key={event.id}
                              onClick={() => toggleEvent(event.id)}
                              className="p-2 rounded-lg text-left text-xs transition-all"
                              style={{
                                backgroundColor: selectedEvents.includes(event.id)
                                  ? `${theme.colors.primary}20`
                                  : `${theme.colors.background}60`,
                                border: `1px solid ${selectedEvents.includes(event.id) ? theme.colors.primary : 'transparent'}`,
                                color: theme.colors.text,
                              }}
                            >
                              <div className="font-medium">{event.label}</div>
                              <div style={{ color: theme.colors.textSecondary }}>
                                {event.description}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={addWebhook}
                        disabled={!newWebhookUrl || selectedEvents.length === 0}
                        className="w-full py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
                        style={{
                          backgroundColor: theme.colors.primary,
                          color: theme.colors.background,
                        }}
                      >
                        Create Webhook
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'api' && (
                <div className="space-y-6">
                  <div 
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: `${theme.colors.background}60` }}
                  >
                    <h4 className="text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
                      API Key
                    </h4>
                    <p className="text-xs mb-3" style={{ color: theme.colors.textSecondary }}>
                      Use this key to authenticate API requests
                    </p>
                    <div 
                      className="flex items-center gap-2 p-3 rounded-lg font-mono text-sm"
                      style={{ backgroundColor: theme.colors.background }}
                    >
                      <span style={{ color: theme.colors.primary }}>
                        {apiKey.slice(0, 12)}••••••••••••••••••••
                      </span>
                      <button
                        onClick={() => navigator.clipboard.writeText(apiKey)}
                        className="ml-auto px-3 py-1 rounded text-xs"
                        style={{
                          backgroundColor: `${theme.colors.primary}20`,
                          color: theme.colors.primary,
                        }}
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div 
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: `${theme.colors.background}60` }}
                  >
                    <h4 className="text-sm font-medium mb-3" style={{ color: theme.colors.text }}>
                      API Endpoints
                    </h4>
                    <div className="space-y-2 font-mono text-xs">
                      {[
                        { method: 'GET', path: '/api/v1/facilities', desc: 'List all facilities' },
                        { method: 'GET', path: '/api/v1/twins/:facilityId', desc: 'Get digital twin data' },
                        { method: 'GET', path: '/api/v1/twins/:facilityId/assets', desc: 'List yard assets' },
                        { method: 'POST', path: '/api/v1/twins/:facilityId/assets', desc: 'Update asset position' },
                        { method: 'GET', path: '/api/v1/twins/:facilityId/metrics', desc: 'Get real-time metrics' },
                        { method: 'GET', path: '/api/v1/twins/:facilityId/predictions', desc: 'Get AI predictions' },
                      ].map(endpoint => (
                        <div 
                          key={endpoint.path}
                          className="flex items-center gap-3 p-2 rounded"
                          style={{ backgroundColor: `${theme.colors.background}40` }}
                        >
                          <span 
                            className="px-2 py-0.5 rounded text-xs font-bold"
                            style={{
                              backgroundColor: endpoint.method === 'GET' ? '#00B4FF20' : '#00FF8820',
                              color: endpoint.method === 'GET' ? '#00B4FF' : '#00FF88',
                            }}
                          >
                            {endpoint.method}
                          </span>
                          <span style={{ color: theme.colors.text }}>{endpoint.path}</span>
                          <span className="ml-auto" style={{ color: theme.colors.textSecondary }}>
                            {endpoint.desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div 
                    className="p-4 rounded-xl"
                    style={{ 
                      backgroundColor: `${theme.colors.primary}10`,
                      border: `1px solid ${theme.colors.primary}20`,
                    }}
                  >
                    <h4 className="text-sm font-medium mb-2" style={{ color: theme.colors.primary }}>
                      📚 Documentation
                    </h4>
                    <p className="text-xs" style={{ color: theme.colors.textSecondary }}>
                      Full API documentation with examples, SDKs, and integration guides available at{' '}
                      <span style={{ color: theme.colors.primary }}>docs.flowstate.ai/api</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntegrationHooks;
