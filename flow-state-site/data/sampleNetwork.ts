import { Facility, Connection } from '@/components/NetworkMap/types';

/**
 * Sample facility network data for demonstration.
 */
export const sampleFacilities: Facility[] = [
  {
    id: 'hub-chicago',
    name: 'Chicago Hub',
    archetype: 'gated',
    x: 400,
    y: 200,
    location: 'Chicago, IL',
    metrics: { movesPerDay: 580, dwellTime: 45, drivers: 1200 },
  },
  {
    id: 'hub-atlanta',
    name: 'Atlanta DC',
    archetype: 'cross-dock',
    x: 520,
    y: 380,
    location: 'Atlanta, GA',
    metrics: { movesPerDay: 420, dwellTime: 35, drivers: 850 },
  },
  {
    id: 'hub-dallas',
    name: 'Dallas Yard',
    archetype: 'open',
    x: 280,
    y: 400,
    location: 'Dallas, TX',
    metrics: { movesPerDay: 350, dwellTime: 55, drivers: 620 },
  },
  {
    id: 'hub-la',
    name: 'Los Angeles',
    archetype: 'gated',
    x: 100,
    y: 280,
    location: 'Los Angeles, CA',
    metrics: { movesPerDay: 720, dwellTime: 60, drivers: 1500 },
  },
  {
    id: 'hub-newark',
    name: 'Newark Port',
    archetype: 'manufacturing',
    x: 680,
    y: 180,
    location: 'Newark, NJ',
    metrics: { movesPerDay: 480, dwellTime: 75, drivers: 920 },
  },
  {
    id: 'hub-seattle',
    name: 'Seattle',
    archetype: 'open',
    x: 120,
    y: 100,
    location: 'Seattle, WA',
    metrics: { movesPerDay: 280, dwellTime: 40, drivers: 450 },
  },
  {
    id: 'hub-denver',
    name: 'Denver',
    archetype: 'cross-dock',
    x: 250,
    y: 220,
    location: 'Denver, CO',
    metrics: { movesPerDay: 310, dwellTime: 50, drivers: 520 },
  },
];

/**
 * Sample connections between facilities.
 */
export const sampleConnections: Connection[] = [
  { from: 'hub-chicago', to: 'hub-atlanta', strength: 8, type: 'primary' },
  { from: 'hub-chicago', to: 'hub-dallas', strength: 7, type: 'primary' },
  { from: 'hub-chicago', to: 'hub-newark', strength: 6, type: 'primary' },
  { from: 'hub-la', to: 'hub-dallas', strength: 7, type: 'primary' },
  { from: 'hub-la', to: 'hub-seattle', strength: 5, type: 'secondary' },
  { from: 'hub-la', to: 'hub-denver', strength: 4, type: 'secondary' },
  { from: 'hub-denver', to: 'hub-chicago', strength: 5, type: 'secondary' },
  { from: 'hub-seattle', to: 'hub-denver', strength: 3, type: 'planned' },
  { from: 'hub-atlanta', to: 'hub-dallas', strength: 4, type: 'secondary' },
  { from: 'hub-newark', to: 'hub-atlanta', strength: 5, type: 'secondary' },
];
