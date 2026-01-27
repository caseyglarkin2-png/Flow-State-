/**
 * Network Map State Store
 * 
 * Zustand store for managing network facility configurations.
 * Supports persistence to localStorage and shareable URL state.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Facility, Connection, FacilityArchetype } from '@/components/NetworkMap/types';

/** Network configuration for sharing */
export interface NetworkConfig {
  facilities: Facility[];
  connections: Connection[];
}

interface NetworkState {
  /** All facilities in the network */
  facilities: Facility[];
  /** Connections between facilities */
  connections: Connection[];
  /** Currently selected facility ID */
  selectedId: string | null;
  /** Whether the network has unsaved changes */
  isDirty: boolean;

  // Actions
  addFacility: (facility: Omit<Facility, 'id'>) => void;
  updateFacility: (id: string, updates: Partial<Facility>) => void;
  removeFacility: (id: string) => void;
  setSelected: (id: string | null) => void;
  addConnection: (from: string, to: string, strength?: number) => void;
  removeConnection: (from: string, to: string) => void;
  clear: () => void;
  loadFromConfig: (config: NetworkConfig) => void;
  getConfig: () => NetworkConfig;
}

/** Generate a unique ID for facilities */
function generateId(): string {
  return `facility_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export const useNetworkStore = create<NetworkState>()(
  persist(
    (set, get) => ({
      facilities: [],
      connections: [],
      selectedId: null,
      isDirty: false,

      addFacility: (facilityData) => {
        const id = generateId();
        const facility: Facility = { ...facilityData, id };
        set((state) => ({
          facilities: [...state.facilities, facility],
          isDirty: true,
        }));
      },

      updateFacility: (id, updates) => {
        set((state) => ({
          facilities: state.facilities.map((f) =>
            f.id === id ? { ...f, ...updates } : f
          ),
          isDirty: true,
        }));
      },

      removeFacility: (id) => {
        set((state) => ({
          facilities: state.facilities.filter((f) => f.id !== id),
          // Also remove any connections involving this facility
          connections: state.connections.filter(
            (c) => c.from !== id && c.to !== id
          ),
          selectedId: state.selectedId === id ? null : state.selectedId,
          isDirty: true,
        }));
      },

      setSelected: (id) => {
        set({ selectedId: id });
      },

      addConnection: (from, to, strength = 5) => {
        // Don't add duplicate connections
        const existing = get().connections.find(
          (c) => (c.from === from && c.to === to) || (c.from === to && c.to === from)
        );
        if (existing) return;

        set((state) => ({
          connections: [...state.connections, { from, to, strength }],
          isDirty: true,
        }));
      },

      removeConnection: (from, to) => {
        set((state) => ({
          connections: state.connections.filter(
            (c) => !(c.from === from && c.to === to) && !(c.from === to && c.to === from)
          ),
          isDirty: true,
        }));
      },

      clear: () => {
        set({
          facilities: [],
          connections: [],
          selectedId: null,
          isDirty: false,
        });
      },

      loadFromConfig: (config) => {
        set({
          facilities: config.facilities,
          connections: config.connections,
          selectedId: null,
          isDirty: false,
        });
      },

      getConfig: () => ({
        facilities: get().facilities,
        connections: get().connections,
      }),
    }),
    {
      name: 'yardflow-network',
      partialize: (state) => ({
        facilities: state.facilities,
        connections: state.connections,
      }),
    }
  )
);

/**
 * Encode a network configuration into a shareable URL hash.
 */
export function encodeNetworkUrl(config: NetworkConfig): string {
  try {
    const json = JSON.stringify(config);
    const base64 = btoa(json);
    return `#config=${base64}`;
  } catch {
    return '';
  }
}

/**
 * Decode a network configuration from a URL hash.
 */
export function decodeNetworkUrl(hash: string): NetworkConfig | null {
  try {
    const match = hash.match(/config=([A-Za-z0-9+/=]+)/);
    if (!match) return null;
    const json = atob(match[1]);
    return JSON.parse(json) as NetworkConfig;
  } catch {
    return null;
  }
}

/**
 * Generate a full shareable URL for the current network.
 */
export function getShareableUrl(config: NetworkConfig): string {
  if (typeof window === 'undefined') return '';
  const hash = encodeNetworkUrl(config);
  return `${window.location.origin}/demo/network-map${hash}`;
}
