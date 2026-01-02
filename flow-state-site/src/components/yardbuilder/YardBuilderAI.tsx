// YardBuilder AI - Facility Digital Twin Generator
// Search address, map it, analyze and count yard assets

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Velocity } from '@/components/icons/FlowIcons';

// Asset types that can be counted in a yard
interface YardAssets {
  trailers: number;
  trucks: number;
  loadingDocks: number;
  shippingDocks: number;
  gates: number;
  guardShacks: number;
  parkingSpots: number;
  trailerYards: number;
}

// Facility profile generated from analysis
interface FacilityProfile {
  id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  assets: YardAssets;
  facilityType: 'DC' | 'Plant' | 'CrossDock' | 'Terminal' | 'Yard';
  totalAcreage: number;
  notes: string;
  createdAt: Date;
}

// Default empty assets
const defaultAssets: YardAssets = {
  trailers: 0,
  trucks: 0,
  loadingDocks: 0,
  shippingDocks: 0,
  gates: 0,
  guardShacks: 0,
  parkingSpots: 0,
  trailerYards: 0,
};

interface YardBuilderAIProps {
  onFacilityCreated?: (facility: FacilityProfile) => void;
}

export default function YardBuilderAI({ onFacilityCreated }: YardBuilderAIProps) {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  // Selected location state
  const [selectedLocation, setSelectedLocation] = useState<{
    address: string;
    lat: number;
    lon: number;
  } | null>(null);
  
  // Facility building state
  const [facilityName, setFacilityName] = useState('');
  const [facilityType, setFacilityType] = useState<FacilityProfile['facilityType']>('DC');
  const [assets, setAssets] = useState<YardAssets>(defaultAssets);
  const [totalAcreage, setTotalAcreage] = useState(0);
  const [notes, setNotes] = useState('');
  
  // Analysis state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  
  // Generated facilities
  const [generatedFacilities, setGeneratedFacilities] = useState<FacilityProfile[]>([]);
  
  // Map zoom level for satellite view
  const [mapZoom, setMapZoom] = useState(18);

  // Search for address using Nominatim (OpenStreetMap)
  const searchAddress = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setSearchResults([]);
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'FlowState-YardBuilder/1.0',
          },
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Select a location from search results
  const selectLocation = (result: any) => {
    setSelectedLocation({
      address: result.display_name,
      lat: parseFloat(result.lat),
      lon: parseFloat(result.lon),
    });
    setSearchResults([]);
    setFacilityName(result.name || result.display_name.split(',')[0]);
    setAnalysisComplete(false);
  };

  // Simulate AI analysis of the location
  const analyzeLocation = async () => {
    if (!selectedLocation) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis with random but realistic values
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate realistic asset counts based on facility type
    const baseMultiplier = facilityType === 'DC' ? 1.5 : facilityType === 'Plant' ? 1.2 : 1;
    
    setAssets({
      trailers: Math.floor(Math.random() * 80 * baseMultiplier) + 20,
      trucks: Math.floor(Math.random() * 40 * baseMultiplier) + 10,
      loadingDocks: Math.floor(Math.random() * 20 * baseMultiplier) + 5,
      shippingDocks: Math.floor(Math.random() * 15 * baseMultiplier) + 3,
      gates: Math.floor(Math.random() * 4) + 2,
      guardShacks: Math.floor(Math.random() * 2) + 1,
      parkingSpots: Math.floor(Math.random() * 100 * baseMultiplier) + 50,
      trailerYards: Math.floor(Math.random() * 3) + 1,
    });
    
    setTotalAcreage(Math.floor(Math.random() * 50) + 10);
    setIsAnalyzing(false);
    setAnalysisComplete(true);
  };

  // Update a single asset count
  const updateAsset = (key: keyof YardAssets, value: number) => {
    setAssets(prev => ({ ...prev, [key]: Math.max(0, value) }));
  };

  // Generate the facility digital twin
  const generateDigitalTwin = () => {
    if (!selectedLocation || !facilityName) return;
    
    const facility: FacilityProfile = {
      id: `FAC-${Date.now()}`,
      name: facilityName,
      address: selectedLocation.address,
      lat: selectedLocation.lat,
      lon: selectedLocation.lon,
      assets,
      facilityType,
      totalAcreage,
      notes,
      createdAt: new Date(),
    };
    
    setGeneratedFacilities(prev => [...prev, facility]);
    onFacilityCreated?.(facility);
    
    // Reset form
    setSelectedLocation(null);
    setFacilityName('');
    setAssets(defaultAssets);
    setTotalAcreage(0);
    setNotes('');
    setAnalysisComplete(false);
    setSearchQuery('');
  };

  // Generate Google Maps satellite embed URL
  const getMapEmbedUrl = () => {
    if (!selectedLocation) return '';
    const { lat, lon } = selectedLocation;
    // Using Google Maps embed with satellite view
    return `https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6CE8NZ_kBI5xAoM&center=${lat},${lon}&zoom=${mapZoom}&maptype=satellite`;
  };

  // Alternative: OpenStreetMap tile URL for satellite (using ESRI)
  const getEsriSatelliteUrl = () => {
    if (!selectedLocation) return '';
    const { lat, lon } = selectedLocation;
    // ESRI World Imagery - free satellite tiles
    return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${mapZoom}/${Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, mapZoom))}/${Math.floor((lon + 180) / 360 * Math.pow(2, mapZoom))}`;
  };

  return (
    <div className="h-full flex">
      {/* Left Panel - Search & Configure */}
      <div className="w-96 bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#1a1a1a]">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Velocity size={18} className="text-[#00B4FF]" />
            YardBuilder AI
          </h2>
          <p className="text-xs text-[#666] mt-1">Generate facility digital twins</p>
        </div>
        
        {/* Search Section */}
        <div className="p-4 border-b border-[#1a1a1a]">
          <label className="text-xs text-[#888] uppercase tracking-wider">Search Address</label>
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchAddress()}
              placeholder="Enter facility address..."
              className="flex-1 bg-[#111] border border-[#222] rounded px-3 py-2 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#00B4FF]"
            />
            <button
              onClick={searchAddress}
              disabled={isSearching}
              className="px-4 py-2 bg-[#00B4FF] text-black text-sm font-medium rounded hover:bg-[#00B4FF]/90 disabled:opacity-50"
            >
              {isSearching ? '...' : 'Search'}
            </button>
          </div>
          
          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mt-2 bg-[#111] border border-[#222] rounded max-h-48 overflow-y-auto">
              {searchResults.map((result, i) => (
                <button
                  key={i}
                  onClick={() => selectLocation(result)}
                  className="w-full text-left px-3 py-2 text-sm text-[#ccc] hover:bg-[#1a1a1a] border-b border-[#1a1a1a] last:border-b-0"
                >
                  {result.display_name}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Selected Location */}
        {selectedLocation && (
          <>
            <div className="p-4 border-b border-[#1a1a1a]">
              <label className="text-xs text-[#888] uppercase tracking-wider">Selected Location</label>
              <p className="mt-1 text-sm text-white">{selectedLocation.address.substring(0, 100)}...</p>
              <p className="mt-1 text-xs text-[#00B4FF] font-mono">
                {selectedLocation.lat.toFixed(6)}, {selectedLocation.lon.toFixed(6)}
              </p>
            </div>
            
            {/* Facility Details */}
            <div className="p-4 border-b border-[#1a1a1a] space-y-3">
              <div>
                <label className="text-xs text-[#888] uppercase tracking-wider">Facility Name</label>
                <input
                  type="text"
                  value={facilityName}
                  onChange={(e) => setFacilityName(e.target.value)}
                  className="mt-1 w-full bg-[#111] border border-[#222] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00B4FF]"
                />
              </div>
              
              <div>
                <label className="text-xs text-[#888] uppercase tracking-wider">Facility Type</label>
                <select
                  value={facilityType}
                  onChange={(e) => setFacilityType(e.target.value as FacilityProfile['facilityType'])}
                  className="mt-1 w-full bg-[#111] border border-[#222] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00B4FF]"
                >
                  <option value="DC">Distribution Center</option>
                  <option value="Plant">Manufacturing Plant</option>
                  <option value="CrossDock">Cross-Dock</option>
                  <option value="Terminal">Terminal</option>
                  <option value="Yard">Yard</option>
                </select>
              </div>
              
              {/* Analyze Button */}
              <button
                onClick={analyzeLocation}
                disabled={isAnalyzing}
                className="w-full py-2 bg-[#1a1a1a] border border-[#00B4FF] text-[#00B4FF] text-sm font-medium rounded hover:bg-[#00B4FF]/10 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#00B4FF] border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>🔍 Analyze Yard Assets</>
                )}
              </button>
            </div>
            
            {/* Asset Counts */}
            {analysisComplete && (
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <label className="text-xs text-[#888] uppercase tracking-wider">Asset Counts</label>
                
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(assets).map(([key, value]) => (
                    <div key={key} className="bg-[#111] border border-[#222] rounded p-2">
                      <label className="text-xs text-[#666] capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => updateAsset(key as keyof YardAssets, parseInt(e.target.value) || 0)}
                        className="w-full bg-transparent text-white text-lg font-semibold focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
                
                <div className="bg-[#111] border border-[#222] rounded p-2">
                  <label className="text-xs text-[#666]">Total Acreage</label>
                  <input
                    type="number"
                    value={totalAcreage}
                    onChange={(e) => setTotalAcreage(parseInt(e.target.value) || 0)}
                    className="w-full bg-transparent text-white text-lg font-semibold focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="text-xs text-[#888] uppercase tracking-wider">Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Additional notes..."
                    className="mt-1 w-full bg-[#111] border border-[#222] rounded px-3 py-2 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#00B4FF] h-20 resize-none"
                  />
                </div>
                
                {/* Generate Button */}
                <button
                  onClick={generateDigitalTwin}
                  disabled={!facilityName}
                  className="w-full py-3 bg-[#00B4FF] text-black text-sm font-bold rounded hover:bg-[#00B4FF]/90 disabled:opacity-50"
                >
                  Generate Digital Twin
                </button>
              </div>
            )}
          </>
        )}
        
        {/* Generated Facilities List */}
        {generatedFacilities.length > 0 && (
          <div className="border-t border-[#1a1a1a] p-4">
            <label className="text-xs text-[#888] uppercase tracking-wider">
              Generated Facilities ({generatedFacilities.length})
            </label>
            <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
              {generatedFacilities.map((f) => (
                <div key={f.id} className="bg-[#111] border border-[#222] rounded p-2">
                  <div className="text-sm text-white font-medium">{f.name}</div>
                  <div className="text-xs text-[#666]">{f.facilityType} • {f.assets.trailers} trailers</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Right Panel - Satellite Map View */}
      <div className="flex-1 relative bg-[#0a0a0a]">
        {selectedLocation ? (
          <>
            {/* Google Maps Satellite Embed */}
            <iframe
              src={`https://www.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lon}&z=${mapZoom}&t=k&output=embed`}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            {/* Alternative: Link to open in Google Maps */}
            <a
              href={`https://www.google.com/maps/@${selectedLocation.lat},${selectedLocation.lon},${mapZoom}z/data=!3m1!1e3`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 left-4 px-3 py-2 bg-[#0F0F0F]/90 border border-[#222] rounded text-white text-sm hover:bg-[#1a1a1a] flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open in Google Maps
            </a>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🛰️</div>
              <p className="text-[#888] text-lg">Search for an address to view satellite imagery</p>
              <p className="text-[#555] text-sm mt-2">Enter a facility address in the search box</p>
            </div>
          </div>
        )}
        
        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button 
            onClick={() => setMapZoom(z => Math.min(21, z + 1))}
            className="w-10 h-10 bg-[#0F0F0F]/90 border border-[#222] rounded text-white hover:bg-[#1a1a1a] text-xl font-bold"
          >
            +
          </button>
          <button 
            onClick={() => setMapZoom(z => Math.max(15, z - 1))}
            className="w-10 h-10 bg-[#0F0F0F]/90 border border-[#222] rounded text-white hover:bg-[#1a1a1a] text-xl font-bold"
          >
            −
          </button>
          <div className="w-10 h-10 bg-[#0F0F0F]/90 border border-[#222] rounded text-white flex items-center justify-center text-xs">
            {mapZoom}x
          </div>
        </div>
        
        {/* Coordinates overlay */}
        {selectedLocation && (
          <div className="absolute bottom-20 left-4 px-3 py-2 bg-[#0F0F0F]/90 border border-[#222] rounded text-xs font-mono text-[#00B4FF]">
            {selectedLocation.lat.toFixed(6)}, {selectedLocation.lon.toFixed(6)}
          </div>
        )}
        
        {/* Info overlay when location selected */}
        {selectedLocation && analysisComplete && (
          <div className="absolute bottom-4 left-4 right-4 bg-[#0F0F0F]/95 border border-[#00B4FF]/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold">{facilityName || 'Unnamed Facility'}</h3>
                <p className="text-[#888] text-sm">{facilityType}</p>
              </div>
              <div className="text-right">
                <div className="text-[#00B4FF] text-2xl font-bold">{assets.trailers + assets.trucks}</div>
                <div className="text-[#666] text-xs">Total Vehicles</div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              <div className="text-center">
                <div className="text-white font-semibold">{assets.trailers}</div>
                <div className="text-[#666] text-xs">Trailers</div>
              </div>
              <div className="text-center">
                <div className="text-white font-semibold">{assets.trucks}</div>
                <div className="text-[#666] text-xs">Trucks</div>
              </div>
              <div className="text-center">
                <div className="text-white font-semibold">{assets.loadingDocks}</div>
                <div className="text-[#666] text-xs">Loading Docks</div>
              </div>
              <div className="text-center">
                <div className="text-white font-semibold">{assets.gates}</div>
                <div className="text-[#666] text-xs">Gates</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
