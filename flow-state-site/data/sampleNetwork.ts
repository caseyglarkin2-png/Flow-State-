import { FacilityNode, NetworkConnection } from '@/components/NetworkMap';

/**
 * Sample facility network data for demonstration.
 * Coordinates are percentages (0-100) for responsive scaling.
 */
export const sampleFacilities: FacilityNode[] = [
  {
    id: 'hub-chicago',
    name: 'Chicago Hub',
    type: 'hub',
    size: 'lg',
    x: 50,
    y: 33,
    metrics: { turnsPerDay: 580, dwellTime: 45, efficiency: 0.87 },
  },
  {
    id: 'hub-atlanta',
    name: 'Atlanta DC',
    type: 'spoke',
    size: 'md',
    x: 65,
    y: 63,
    metrics: { turnsPerDay: 420, dwellTime: 35, efficiency: 0.82 },
  },
  {
    id: 'hub-dallas',
    name: 'Dallas Yard',
    type: 'spoke',
    size: 'md',
    x: 35,
    y: 67,
    metrics: { turnsPerDay: 350, dwellTime: 55, efficiency: 0.74 },
  },
  {
    id: 'hub-la',
    name: 'Los Angeles',
    type: 'hub',
    size: 'lg',
    x: 12,
    y: 47,
    metrics: { turnsPerDay: 720, dwellTime: 60, efficiency: 0.79 },
  },
  {
    id: 'hub-newark',
    name: 'Newark Port',
    type: 'origin',
    size: 'md',
    x: 85,
    y: 30,
    metrics: { turnsPerDay: 480, dwellTime: 75, efficiency: 0.71 },
  },
  {
    id: 'hub-seattle',
    name: 'Seattle',
    type: 'spoke',
    size: 'sm',
    x: 15,
    y: 17,
    metrics: { turnsPerDay: 280, dwellTime: 40, efficiency: 0.84 },
  },
  {
    id: 'hub-denver',
    name: 'Denver',
    type: 'spoke',
    size: 'md',
    x: 31,
    y: 37,
    metrics: { turnsPerDay: 310, dwellTime: 50, efficiency: 0.78 },
  },
];

/**
 * Sample connections between facilities.
 * Strength is 0-1 for opacity scaling.
 */
export const sampleConnections: NetworkConnection[] = [
  { from: 'hub-chicago', to: 'hub-atlanta', strength: 0.8, type: 'primary' },
  { from: 'hub-chicago', to: 'hub-dallas', strength: 0.7, type: 'primary' },
  { from: 'hub-chicago', to: 'hub-newark', strength: 0.6, type: 'primary' },
  { from: 'hub-la', to: 'hub-dallas', strength: 0.7, type: 'primary' },
  { from: 'hub-la', to: 'hub-seattle', strength: 0.5, type: 'secondary' },
  { from: 'hub-la', to: 'hub-denver', strength: 0.4, type: 'secondary' },
  { from: 'hub-denver', to: 'hub-chicago', strength: 0.5, type: 'secondary' },
  { from: 'hub-seattle', to: 'hub-denver', strength: 0.3, type: 'planned' },
  { from: 'hub-atlanta', to: 'hub-dallas', strength: 0.4, type: 'secondary' },
  { from: 'hub-newark', to: 'hub-atlanta', strength: 0.5, type: 'secondary' },
];
