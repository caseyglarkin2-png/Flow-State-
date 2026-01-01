import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ContentLane = 'brief' | 'deep';

type LaneState = {
  lane: ContentLane;
  setLane: (lane: ContentLane) => void;
};

export const useLaneStore = create<LaneState>()(
  persist(
    (set) => ({
      lane: 'brief',
      setLane: (lane) => set({ lane }),
    }),
    {
      name: 'flowstate_lane',
      version: 1,
    }
  )
);
