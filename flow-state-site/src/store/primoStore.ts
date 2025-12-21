// Primo Singularity Map - Zustand Store
// State management for facilities, lanes, theme, filters, and UI

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  Facility,
  Lane,
  FilterState,
  ToggleState,
  Theme,
  MapViewState,
  KPITotals,
  defaultTheme,
  defaultMapViewState,
  calculateKPIs,
  getRegionByState,
} from '@/types/primo';

// Import sample data
import sampleFacilities from '@/data/primoFacilities.sample.json';
import sampleLanes from '@/data/primoLanes.sample.json';
import realFacilities from '@/data/primoRealFacilities.json';

// Data source type
export type DataSource = 'sample' | 'real' | 'combined';

// Primo Store State
interface PrimoState {
  // Data
  facilities: Facility[];
  lanes: Lane[];
  dataSource: DataSource;
  
  // Filters
  filters: FilterState;
  
  // Toggles
  toggles: ToggleState;
  
  // UI State
  selectedFacilityId: string | null;
  isDrawerOpen: boolean;
  isControlPanelOpen: boolean;
  isThemeStudioOpen: boolean;
  isCSVImportOpen: boolean;
  
  // Map State
  mapViewState: MapViewState;
  
  // Theme
  theme: Theme;
  
  // Actions - Data
  setFacilities: (facilities: Facility[]) => void;
  setLanes: (lanes: Lane[]) => void;
  loadSampleData: () => void;
  loadRealData: () => void;
  loadCombinedData: () => void;
  setDataSource: (source: DataSource) => void;
  
  // Actions - Filters
  setSearch: (search: string) => void;
  toggleBrand: (brand: string) => void;
  toggleFacilityType: (type: string) => void;
  toggleStatus: (status: string) => void;
  toggleRegion: (region: string) => void;
  resetFilters: () => void;
  
  // Actions - Toggles
  setShowLanes: (show: boolean) => void;
  setShowLabels: (show: boolean) => void;
  setShowClusters: (show: boolean) => void;
  setAnimationEnabled: (enabled: boolean) => void;
  
  // Actions - UI
  selectFacility: (id: string | null) => void;
  setDrawerOpen: (open: boolean) => void;
  setControlPanelOpen: (open: boolean) => void;
  setThemeStudioOpen: (open: boolean) => void;
  setCSVImportOpen: (open: boolean) => void;
  
  // Actions - Map
  setMapViewState: (viewState: Partial<MapViewState>) => void;
  flyToFacility: (facility: Facility) => void;
  
  // Actions - Theme
  setTheme: (theme: Partial<Theme>) => void;
  setThemeColors: (colors: Partial<Theme['colors']>) => void;
  setThemeTypography: (typography: Partial<Theme['typography']>) => void;
  setThemeIcons: (icons: Partial<Theme['icons']>) => void;
  setThemeLogos: (logos: Partial<Theme['logos']>) => void;
  resetTheme: () => void;
  exportTheme: () => string;
  importTheme: (json: string) => boolean;
}

// Derived selectors
export const selectFilteredFacilities = (state: PrimoState): Facility[] => {
  let filtered = state.facilities;
  
  // Search filter
  if (state.filters.search) {
    const searchLower = state.filters.search.toLowerCase();
    filtered = filtered.filter(
      f =>
        f.name.toLowerCase().includes(searchLower) ||
        f.city.toLowerCase().includes(searchLower) ||
        f.state.toLowerCase().includes(searchLower) ||
        f.brand.toLowerCase().includes(searchLower)
    );
  }
  
  // Brand filter
  if (state.filters.brands.length > 0) {
    filtered = filtered.filter(f => state.filters.brands.includes(f.brand));
  }
  
  // Facility type filter
  if (state.filters.facilityTypes.length > 0) {
    filtered = filtered.filter(f => state.filters.facilityTypes.includes(f.facilityType));
  }
  
  // Status filter
  if (state.filters.statuses.length > 0) {
    filtered = filtered.filter(f => state.filters.statuses.includes(f.status));
  }
  
  // Region filter
  if (state.filters.regions.length > 0) {
    filtered = filtered.filter(f => state.filters.regions.includes(getRegionByState(f.state)));
  }
  
  return filtered;
};

export const selectFilteredLanes = (state: PrimoState): Lane[] => {
  const filteredFacilityIds = new Set(selectFilteredFacilities(state).map(f => f.id));
  return state.lanes.filter(
    l => filteredFacilityIds.has(l.fromFacilityId) && filteredFacilityIds.has(l.toFacilityId)
  );
};

export const selectKPIs = (state: PrimoState): KPITotals => {
  const filteredFacilities = selectFilteredFacilities(state);
  const filteredLanes = selectFilteredLanes(state);
  return calculateKPIs(filteredFacilities, filteredLanes);
};

export const selectSelectedFacility = (state: PrimoState): Facility | null => {
  if (!state.selectedFacilityId) return null;
  return state.facilities.find(f => f.id === state.selectedFacilityId) || null;
};

export const selectUniqueBrands = (state: PrimoState): string[] => {
  return [...new Set(state.facilities.map(f => f.brand))].sort();
};

export const selectUniqueRegions = (state: PrimoState): string[] => {
  return [...new Set(state.facilities.map(f => getRegionByState(f.state)))].sort();
};

// Default filter state
const defaultFilters: FilterState = {
  search: '',
  brands: [],
  facilityTypes: [],
  statuses: [],
  regions: [],
};

// Default toggle state
const defaultToggles: ToggleState = {
  showLanes: true,
  showLabels: true,
  showClusters: true,
  animationEnabled: true,
};

// Create the store
export const usePrimoStore = create<PrimoState>()(
  persist(
    (set, get) => ({
      // Initial state - default to real Primo facilities
      facilities: [...(realFacilities as Facility[]), ...(sampleFacilities as Facility[])],
      lanes: sampleLanes as Lane[],
      dataSource: 'combined' as DataSource,
      filters: defaultFilters,
      toggles: defaultToggles,
      selectedFacilityId: null,
      isDrawerOpen: false,
      isControlPanelOpen: true,
      isThemeStudioOpen: false,
      isCSVImportOpen: false,
      mapViewState: defaultMapViewState,
      theme: defaultTheme,
      
      // Data actions
      setFacilities: (facilities) => set({ facilities }),
      setLanes: (lanes) => set({ lanes }),
      loadSampleData: () => set({
        facilities: sampleFacilities as Facility[],
        lanes: sampleLanes as Lane[],
        dataSource: 'sample',
      }),
      loadRealData: () => set({
        facilities: realFacilities as Facility[],
        lanes: [], // No lanes for real data yet
        dataSource: 'real',
      }),
      loadCombinedData: () => set({
        facilities: [...(realFacilities as Facility[]), ...(sampleFacilities as Facility[])],
        lanes: sampleLanes as Lane[],
        dataSource: 'combined',
      }),
      setDataSource: (source: DataSource) => {
        switch (source) {
          case 'sample':
            get().loadSampleData();
            break;
          case 'real':
            get().loadRealData();
            break;
          case 'combined':
            get().loadCombinedData();
            break;
        }
      },
      
      // Filter actions
      setSearch: (search) => set((state) => ({
        filters: { ...state.filters, search },
      })),
      
      toggleBrand: (brand) => set((state) => ({
        filters: {
          ...state.filters,
          brands: state.filters.brands.includes(brand)
            ? state.filters.brands.filter(b => b !== brand)
            : [...state.filters.brands, brand],
        },
      })),
      
      toggleFacilityType: (type) => set((state) => ({
        filters: {
          ...state.filters,
          facilityTypes: state.filters.facilityTypes.includes(type as any)
            ? state.filters.facilityTypes.filter(t => t !== type)
            : [...state.filters.facilityTypes, type as any],
        },
      })),
      
      toggleStatus: (status) => set((state) => ({
        filters: {
          ...state.filters,
          statuses: state.filters.statuses.includes(status as any)
            ? state.filters.statuses.filter(s => s !== status)
            : [...state.filters.statuses, status as any],
        },
      })),
      
      toggleRegion: (region) => set((state) => ({
        filters: {
          ...state.filters,
          regions: state.filters.regions.includes(region)
            ? state.filters.regions.filter(r => r !== region)
            : [...state.filters.regions, region],
        },
      })),
      
      resetFilters: () => set({ filters: defaultFilters }),
      
      // Toggle actions
      setShowLanes: (show) => set((state) => ({
        toggles: { ...state.toggles, showLanes: show },
      })),
      
      setShowLabels: (show) => set((state) => ({
        toggles: { ...state.toggles, showLabels: show },
      })),
      
      setShowClusters: (show) => set((state) => ({
        toggles: { ...state.toggles, showClusters: show },
      })),
      
      setAnimationEnabled: (enabled) => set((state) => ({
        toggles: { ...state.toggles, animationEnabled: enabled },
      })),
      
      // UI actions
      selectFacility: (id) => set({
        selectedFacilityId: id,
        isDrawerOpen: id !== null,
      }),
      
      setDrawerOpen: (open) => set({
        isDrawerOpen: open,
        selectedFacilityId: open ? get().selectedFacilityId : null,
      }),
      
      setControlPanelOpen: (open) => set({ isControlPanelOpen: open }),
      setThemeStudioOpen: (open) => set({ isThemeStudioOpen: open }),
      setCSVImportOpen: (open) => set({ isCSVImportOpen: open }),
      
      // Map actions
      setMapViewState: (viewState) => set((state) => ({
        mapViewState: { ...state.mapViewState, ...viewState },
      })),
      
      flyToFacility: (facility) => set({
        mapViewState: {
          longitude: facility.lon,
          latitude: facility.lat,
          zoom: 12,
          pitch: 45,
          bearing: 0,
        },
      }),
      
      // Theme actions
      setTheme: (theme) => set((state) => ({
        theme: { ...state.theme, ...theme },
      })),
      
      setThemeColors: (colors) => set((state) => ({
        theme: {
          ...state.theme,
          colors: { ...state.theme.colors, ...colors },
        },
      })),
      
      setThemeTypography: (typography) => set((state) => ({
        theme: {
          ...state.theme,
          typography: { ...state.theme.typography, ...typography },
        },
      })),
      
      setThemeIcons: (icons) => set((state) => ({
        theme: {
          ...state.theme,
          icons: { ...state.theme.icons, ...icons },
        },
      })),
      
      setThemeLogos: (logos) => set((state) => ({
        theme: {
          ...state.theme,
          logos: { ...state.theme.logos, ...logos },
        },
      })),
      
      resetTheme: () => set({ theme: defaultTheme }),
      
      exportTheme: () => {
        return JSON.stringify(get().theme, null, 2);
      },
      
      importTheme: (json) => {
        try {
          const theme = JSON.parse(json) as Theme;
          if (theme.colors && theme.typography && theme.icons && theme.logos) {
            set({ theme });
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },
    }),
    {
      name: 'primo-singularity-storage',
      storage: createJSONStorage(() => {
        // Return a no-op storage during SSR
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return localStorage;
      }),
      version: 2,
      migrate: (persistedState) => {
        const state = persistedState as Partial<PrimoState> | undefined;
        return {
          theme: state?.theme ?? defaultTheme,
          toggles: state?.toggles ?? defaultToggles,
        } as Partial<PrimoState>;
      },
      partialize: (state) => ({
        theme: state.theme,
        toggles: state.toggles,
      }),
      skipHydration: true, // Skip hydration to avoid SSR mismatch
    }
  )
);

// Export store type for use in components
export type { PrimoState };
