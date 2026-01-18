/**
 * EVENT TICKER
 * Shows mock system events scrolling by
 * Conveys "this is real, happening now"
 */

'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from './motion/ReducedMotion';

interface Event {
  id: string;
  time: string;
  type: 'check-in' | 'alert' | 'resolution';
  message: string;
}

interface EventTickerProps {
  events?: Event[];
  interval?: number; // ms between events
  maxVisible?: number;
  className?: string;
}

const SAMPLE_EVENTS: Event[] = [
  { id: '1', time: '3s ago', type: 'check-in', message: 'Driver check-in completed (Gate 2)' },
  { id: '2', time: '8s ago', type: 'alert', message: 'Dwell threshold alert (Trailer #4821)' },
  { id: '3', time: '12s ago', type: 'resolution', message: 'Exception resolved (BOL #7234)' },
  { id: '4', time: '18s ago', type: 'check-in', message: 'Driver check-in completed (Gate 1)' },
  { id: '5', time: '24s ago', type: 'alert', message: 'Temperature alert (Reefer #2891)' },
  { id: '6', time: '31s ago', type: 'resolution', message: 'Detention charge approved' },
];

const eventColors = {
  'check-in': 'text-neon border-neon/20 bg-neon/5',
  'alert': 'text-ember border-ember/20 bg-ember/5',
  'resolution': 'text-steel border-steel/20 bg-steel/5',
};

export default function EventTicker({
  events = SAMPLE_EVENTS,
  interval = 5000,
  maxVisible = 3,
  className = '',
}: EventTickerProps) {
  const { prefersReducedMotion } = useReducedMotion();
  const [visibleEvents, setVisibleEvents] = useState<Event[]>([]);
  const [eventIndex, setEventIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      // Show static events if reduced motion
      setVisibleEvents(events.slice(0, maxVisible));
      return;
    }

    const timer = setInterval(() => {
      setEventIndex((prev) => (prev + 1) % events.length);
    }, interval);

    return () => clearInterval(timer);
  }, [events, interval, maxVisible, prefersReducedMotion]);

  useEffect(() => {
    if (!prefersReducedMotion) {
      const newEvent = events[eventIndex];
      setVisibleEvents((prev) => {
        const updated = [newEvent, ...prev].slice(0, maxVisible);
        return updated;
      });
    }
  }, [eventIndex, events, maxVisible, prefersReducedMotion]);

  return (
    <div className={`space-y-2 ${className}`}>
      <AnimatePresence mode="popLayout">
        {visibleEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className={`
              flex items-center gap-3 px-4 py-2 rounded-lg border text-sm
              ${eventColors[event.type]}
              ${index > 0 ? 'opacity-60' : 'opacity-100'}
            `}
          >
            <span className="font-mono text-xs flex-shrink-0">{event.time}</span>
            <span className="flex-1 truncate">{event.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
