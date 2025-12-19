// Primo Singularity Map - Main Map Component
// MapLibre GL with deck.gl layers for facilities and lanes

'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import MapGL, { NavigationControl, ScaleControl } from 'react-map-gl/maplibre';
import { DeckGL } from '@deck.gl/react';
import { ScatterplotLayer, ArcLayer, TextLayer } from '@deck.gl/layers';
import { MapViewState as DeckMapViewState } from '@deck.gl/core';
import { usePrimoStore, selectFilteredFacilities, selectFilteredLanes } from '@/store/primoStore';
import { Facility, Lane, STATUS_COLORS } from '@/types/primo';
import 'maplibre-gl/dist/maplibre-gl.css';

// Map style - dark basemap
const MAP_STYLE = {
  version: 8 as const,
  name: 'Dark Basemap',
  sources: {
    'carto-dark': {
      type: 'raster' as const,
      tiles: [
        'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
        'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
        'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
      ],
      tileSize: 256,
      attribution: 'Map tiles by Carto',
    },
  },
  layers: [
    {
      id: 'carto-dark-layer',
      type: 'raster' as const,
      source: 'carto-dark',
      minzoom: 0,
      maxzoom: 22,
    },
  ],
};

// Convert status to color
const getStatusColor = (status: string): [number, number, number] => {
  switch (status) {
    case 'Flow':
      return [0, 255, 194]; // #00FFC2
    case 'Activating':
      return [255, 184, 0]; // #FFB800
    case 'Chaos':
      return [255, 42, 0]; // #FF2A00
    default:
      return [136, 136, 136]; // #888888
  }
};

// Get facility type icon size
const getFacilitySize = (type: string, zoom: number): number => {
  const baseSize = type === 'Plant' ? 16 : type === 'DC' ? 14 : type === 'Terminal' ? 12 : 10;
  return baseSize * Math.pow(1.2, zoom - 4);
};

interface PrimoMapProps {
  className?: string;
}

export const PrimoMap: React.FC<PrimoMapProps> = ({ className }) => {
  const theme = usePrimoStore((state) => state.theme);
  const mapViewState = usePrimoStore((state) => state.mapViewState);
  const setMapViewState = usePrimoStore((state) => state.setMapViewState);
  const toggles = usePrimoStore((state) => state.toggles);
  const selectFacility = usePrimoStore((state) => state.selectFacility);
  const selectedFacilityId = usePrimoStore((state) => state.selectedFacilityId);
  
  const facilities = usePrimoStore(selectFilteredFacilities);
  const lanes = usePrimoStore(selectFilteredLanes);
  const allFacilities = usePrimoStore((state) => state.facilities);
  
  const [hoverInfo, setHoverInfo] = useState<{
    facility: Facility;
    x: number;
    y: number;
  } | null>(null);

  // Memoize facility lookup map
  const facilityMap = useMemo(() => {
    const map = new Map<string, Facility>();
    allFacilities.forEach((f) => map.set(f.id, f));
    return map;
  }, [allFacilities]);

  // Handle view state change
  const onViewStateChange = useCallback(
    (params: { viewState: Record<string, unknown> }) => {
      const viewState = params.viewState;
      if (typeof viewState.longitude === 'number' && 
          typeof viewState.latitude === 'number' && 
          typeof viewState.zoom === 'number') {
        setMapViewState({
          longitude: viewState.longitude,
          latitude: viewState.latitude,
          zoom: viewState.zoom,
          pitch: (viewState.pitch as number) || 0,
          bearing: (viewState.bearing as number) || 0,
        });
      }
    },
    [setMapViewState]
  );

  // Handle facility click
  const onClick = useCallback(
    (info: any) => {
      if (info.object && 'id' in info.object) {
        selectFacility(info.object.id);
      } else {
        selectFacility(null);
      }
    },
    [selectFacility]
  );

  // Handle hover
  const onHover = useCallback(
    (info: any) => {
      if (info.object && 'id' in info.object) {
        setHoverInfo({
          facility: info.object as Facility,
          x: info.x,
          y: info.y,
        });
      } else {
        setHoverInfo(null);
      }
    },
    []
  );

  // Create layers
  const layers = useMemo(() => {
    const result: any[] = [];

    // Arc layer for lanes
    if (toggles.showLanes && lanes.length > 0) {
      result.push(
        new ArcLayer({
          id: 'lanes-layer',
          data: lanes,
          getSourcePosition: (d: Lane) => {
            const from = facilityMap.get(d.fromFacilityId);
            return from ? [from.lon, from.lat] : [0, 0];
          },
          getTargetPosition: (d: Lane) => {
            const to = facilityMap.get(d.toFacilityId);
            return to ? [to.lon, to.lat] : [0, 0];
          },
          getSourceColor: (d: Lane) => [...getStatusColor(d.status), 80],
          getTargetColor: (d: Lane) => [...getStatusColor(d.status), 180],
          getWidth: (d: Lane) => Math.max(1, d.volume / 100),
          widthMinPixels: 1,
          widthMaxPixels: 4,
          pickable: false,
          greatCircle: true,
        })
      );
    }

    // Scatterplot layer for facilities
    result.push(
      new ScatterplotLayer({
        id: 'facilities-layer',
        data: facilities,
        getPosition: (d: Facility) => [d.lon, d.lat],
        getFillColor: (d: Facility) => {
          const color = getStatusColor(d.status);
          const isSelected = d.id === selectedFacilityId;
          return isSelected ? [255, 255, 255, 255] : [...color, 220];
        },
        getLineColor: (d: Facility) => {
          const color = getStatusColor(d.status);
          return [...color, 255];
        },
        getRadius: (d: Facility) => getFacilitySize(d.facilityType, mapViewState.zoom),
        lineWidthMinPixels: 1,
        lineWidthMaxPixels: 2,
        stroked: true,
        filled: true,
        pickable: true,
        onClick,
        onHover,
        radiusMinPixels: 4,
        radiusMaxPixels: 20,
        updateTriggers: {
          getFillColor: [selectedFacilityId],
          getRadius: [mapViewState.zoom],
        },
      })
    );

    // Text layer for labels
    if (toggles.showLabels && mapViewState.zoom > 6) {
      result.push(
        new TextLayer({
          id: 'labels-layer',
          data: facilities,
          getPosition: (d: Facility) => [d.lon, d.lat],
          getText: (d: Facility) => d.name,
          getSize: Math.max(10, 12 + (mapViewState.zoom - 6) * 1.5),
          getColor: [255, 255, 255, mapViewState.zoom > 8 ? 220 : 150],
          getAngle: 0,
          getTextAnchor: 'middle',
          getAlignmentBaseline: 'top',
          getPixelOffset: [0, 12],
          fontFamily: theme.typography.bodyFont,
          fontWeight: 500,
          outlineWidth: 2,
          outlineColor: [5, 5, 5, 200],
          pickable: false,
        })
      );
    }

    return result;
  }, [
    facilities,
    lanes,
    facilityMap,
    toggles,
    mapViewState.zoom,
    selectedFacilityId,
    theme.typography.bodyFont,
    onClick,
    onHover,
  ]);

  return (
    <div className={className} style={{ position: 'relative' }}>
      <DeckGL
        viewState={mapViewState}
        onViewStateChange={onViewStateChange}
        controller={true}
        layers={layers}
        getCursor={() => (hoverInfo ? 'pointer' : 'grab')}
      >
        <MapGL
          mapStyle={MAP_STYLE}
          attributionControl={false}
        >
          <NavigationControl position="bottom-right" />
          <ScaleControl position="bottom-left" />
        </MapGL>
      </DeckGL>

      {/* Hover tooltip */}
      {hoverInfo && (
        <div
          className="absolute pointer-events-none z-10 px-3 py-2 rounded-lg shadow-lg"
          style={{
            left: hoverInfo.x + 10,
            top: hoverInfo.y + 10,
            backgroundColor: `${theme.colors.surface}F0`,
            border: `1px solid ${STATUS_COLORS[hoverInfo.facility.status]}40`,
            backdropFilter: 'blur(8px)',
          }}
        >
          <div className="font-semibold text-sm" style={{ color: theme.colors.text }}>
            {hoverInfo.facility.name}
          </div>
          <div className="text-xs" style={{ color: theme.colors.textSecondary }}>
            {hoverInfo.facility.city}, {hoverInfo.facility.state}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span
              className="text-xs px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: `${STATUS_COLORS[hoverInfo.facility.status]}20`,
                color: STATUS_COLORS[hoverInfo.facility.status],
              }}
            >
              {hoverInfo.facility.status}
            </span>
            <span className="text-xs" style={{ color: theme.colors.textSecondary }}>
              {hoverInfo.facility.facilityType}
            </span>
          </div>
        </div>
      )}

      {/* Legend */}
      <div
        className="absolute bottom-16 right-4 p-3 rounded-lg"
        style={{
          backgroundColor: `${theme.colors.surface}E6`,
          border: `1px solid ${theme.colors.primary}20`,
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="text-xs font-medium mb-2" style={{ color: theme.colors.text }}>
          Status Legend
        </div>
        <div className="space-y-1.5">
          {(['Flow', 'Activating', 'Chaos'] as const).map((status) => (
            <div key={status} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: STATUS_COLORS[status] }}
              />
              <span className="text-xs" style={{ color: theme.colors.textSecondary }}>
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrimoMap;
