// Agent Chat Interface - AI-powered yard assistant
// Ask questions about yard operations and get intelligent responses

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrimoStore } from '@/store/primoStore';
import { DigitalTwin } from '@/types/digitalTwin';
import { CloseIcon } from '@/brand/icons';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
  agentRole?: string;
}

const SUGGESTED_QUESTIONS = [
  "What's the current yard utilization?",
  "How many trailers are waiting?",
  "Which docks are available?",
  "Predict next congestion window",
  "Show bottleneck analysis",
  "What's the average dwell time?",
];

// Simulated AI responses based on twin data
function generateAgentResponse(
  question: string, 
  twin: { metrics: any; assets: any[]; agents: any[] } | null
): { content: string; agentRole: string } {
  const q = question.toLowerCase();
  
  if (!twin) {
    return {
      content: "I don't have access to a digital twin yet. Please generate one first to get real-time insights.",
      agentRole: 'Flow Analyzer',
    };
  }

  const { metrics, assets, agents } = twin;
  const trailers = assets.filter((a: any) => a.type === 'trailer');
  const trucks = assets.filter((a: any) => a.type === 'truck');
  const docks = assets.filter((a: any) => a.type === 'loading_dock');
  const idleDocks = docks.filter((d: any) => d.status === 'idle');
  const loadingTrailers = trailers.filter((t: any) => t.status === 'loading' || t.status === 'unloading');

  if (q.includes('utilization') || q.includes('capacity')) {
    return {
      content: `Current yard utilization is at **${metrics.yardUtilization}%**. We have ${trailers.length} trailers in yard out of ${metrics.trailerCapacity} capacity. ${metrics.yardUtilization > 80 ? '⚠️ Approaching high utilization - consider expediting outbound movements.' : '✅ Healthy utilization levels.'}`,
      agentRole: 'Yard Optimizer',
    };
  }

  if (q.includes('trailer') && (q.includes('waiting') || q.includes('queue'))) {
    const queued = trailers.filter((t: any) => t.status === 'queued').length;
    return {
      content: `Currently **${queued} trailers** are in queue waiting for dock assignment. Average wait time is approximately ${Math.round(metrics.gateProcessingTime * 1.5)} minutes. ${queued > 5 ? '🔴 High queue detected - dock coordinator is optimizing assignments.' : '🟢 Queue is manageable.'}`,
      agentRole: 'Trailer Tracker',
    };
  }

  if (q.includes('dock') && (q.includes('available') || q.includes('open'))) {
    return {
      content: `**${idleDocks.length} docks** are currently available out of ${docks.length} total. Active loading/unloading on ${metrics.activeLoadingDocks} docks. Average turnaround time: ${metrics.dockTurnaroundTime} minutes. ${idleDocks.length < 2 ? '⚠️ Limited dock availability - prioritizing high-velocity loads.' : ''}`,
      agentRole: 'Dock Coordinator',
    };
  }

  if (q.includes('congestion') || q.includes('predict') || q.includes('forecast')) {
    const peakTime = new Date(metrics.predictedPeakTime);
    const hoursUntil = Math.round((peakTime.getTime() - Date.now()) / (1000 * 60 * 60));
    return {
      content: `**Congestion Forecast**\n\nPredicted congestion level: **${metrics.predictedCongestion}%**\nExpected peak: **${hoursUntil > 0 ? `in ${hoursUntil} hours` : 'now'}**\n\nRecommendation: ${metrics.predictedCongestion > 50 ? 'Pre-position trailers in outbound staging and increase dock throughput.' : 'Normal operations - continue current pace.'}`,
      agentRole: 'Flow Analyzer',
    };
  }

  if (q.includes('bottleneck') || q.includes('issue') || q.includes('problem')) {
    if (metrics.bottlenecks.length === 0) {
      return {
        content: '**No bottlenecks detected**\n\nAll systems operating within normal parameters. Flow score: ' + metrics.flowScore + '/100.',
        agentRole: 'Flow Analyzer',
      };
    }
    return {
      content: `**Bottleneck Analysis**\n\n${metrics.bottlenecks.map((b: string) => `• ${b}`).join('\n')}\n\n**Suggested Actions:**\n• Expedite trailer movements in affected zones\n• Coordinate with gate controller for priority processing\n• Consider temporary dock reallocation`,
      agentRole: 'Yard Optimizer',
    };
  }

  if (q.includes('dwell') || q.includes('time')) {
    return {
      content: `**Dwell Time Analysis**\n\nAverage trailer dwell: **${metrics.averageDwellTime} minutes**\nGate processing: **${metrics.gateProcessingTime} minutes**\nDock turnaround: **${metrics.dockTurnaroundTime} minutes**\n\n${metrics.averageDwellTime > 120 ? '⚠ Dwell times elevated - analyzing root causes...' : '✓ Dwell times within target range.'}`,
      agentRole: 'Flow Analyzer',
    };
  }

  if (q.includes('truck') || q.includes('inbound') || q.includes('outbound')) {
    return {
      content: `**Truck Activity**\n\nInbound: **${metrics.trucksInbound}** trucks\nOutbound: **${metrics.trucksOutbound}** trucks\nTotal active: **${trucks.length}** in facility\n\nGate processing running smoothly at ${metrics.gateProcessingTime} min average.`,
      agentRole: 'Truck Dispatcher',
    };
  }

  // Default response
  return {
    content: `I'm analyzing your question about "${question}"...\n\n**Current Status Summary:**\n• Flow Score: ${metrics.flowScore}/100\n• Yard Utilization: ${metrics.yardUtilization}%\n• Active Docks: ${metrics.activeLoadingDocks}/${docks.length}\n• Trailers in Yard: ${trailers.length}\n\nAsk me specific questions about utilization, docks, predictions, or bottlenecks for detailed insights.`,
    agentRole: 'Flow Analyzer',
  };
}

export interface AgentChatProps {
  twin: DigitalTwin | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AgentChat: React.FC<AgentChatProps> = ({ twin, isOpen, onClose }) => {
  const theme = usePrimoStore((state) => state.theme);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'agent',
      content: "👋 Welcome to the Yard Intelligence Assistant! I'm connected to your facility's digital twin and can answer questions about yard operations, predict congestion, and provide optimization recommendations. What would you like to know?",
      timestamp: new Date(),
      agentRole: 'Flow Analyzer',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (question?: string) => {
    const q = question || input;
    if (!q.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: q,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

    const response = generateAgentResponse(q, twin);
    
    const agentMessage: ChatMessage = {
      id: `agent-${Date.now()}`,
      role: 'agent',
      content: response.content,
      timestamp: new Date(),
      agentRole: response.agentRole,
    };

    setMessages(prev => [...prev, agentMessage]);
    setIsTyping(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-4 right-4 w-[420px] h-[600px] z-50 flex flex-col rounded-xl overflow-hidden shadow-2xl"
          style={{
            backgroundColor: theme.colors.surface,
            border: `1px solid ${theme.colors.primary}30`,
          }}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{ 
              borderColor: `${theme.colors.primary}20`,
              background: `linear-gradient(135deg, ${theme.colors.primary}20, ${theme.colors.alert}10)`,
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${theme.colors.primary}30` }}
              >
                <span className="text-lg">🤖</span>
              </div>
              <div>
                <h3 className="font-bold" style={{ color: theme.colors.text }}>
                  Yard Intelligence
                </h3>
                <p className="text-xs flex items-center gap-1" style={{ color: theme.colors.textSecondary }}>
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Connected to Digital Twin
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <CloseIcon size={18} color={theme.colors.textSecondary} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'flex',
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    'max-w-[85%] rounded-xl px-4 py-3',
                    msg.role === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'
                  )}
                  style={{
                    backgroundColor: msg.role === 'user' 
                      ? theme.colors.primary 
                      : `${theme.colors.background}80`,
                    color: msg.role === 'user' 
                      ? theme.colors.background 
                      : theme.colors.text,
                  }}
                >
                  {msg.role === 'agent' && msg.agentRole && (
                    <div 
                      className="text-xs font-medium mb-1 opacity-70"
                      style={{ color: theme.colors.primary }}
                    >
                      {msg.agentRole}
                    </div>
                  )}
                  <div className="text-sm whitespace-pre-wrap">
                    {msg.content.split('**').map((part, i) => 
                      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <div 
                  className="px-4 py-3 rounded-xl rounded-bl-sm"
                  style={{ backgroundColor: `${theme.colors.background}80` }}
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          <div className="px-4 py-2 border-t" style={{ borderColor: `${theme.colors.primary}10` }}>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_QUESTIONS.slice(0, 3).map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="px-2.5 py-1 rounded-full text-xs transition-all hover:scale-105"
                  style={{
                    backgroundColor: `${theme.colors.primary}15`,
                    color: theme.colors.primary,
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div 
            className="p-4 border-t"
            style={{ borderColor: `${theme.colors.primary}20` }}
          >
            <div 
              className="flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{ backgroundColor: `${theme.colors.background}80` }}
            >
              <input
                type="text"
                placeholder="Ask about yard operations..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: theme.colors.text }}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="p-2 rounded-lg transition-all disabled:opacity-50"
                style={{ 
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.background,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AgentChat;
