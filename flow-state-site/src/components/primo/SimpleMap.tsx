// Simple Map Component - Minimal implementation for testing
'use client';

import React, { useEffect, useRef, useState } from 'react';

// Static data - no store dependency
const FACILITIES = [
  { id: '1', name: 'Ontario Distribution Hub', lat: 34.0278, lon: -117.5839, status: 'Flow' },
  { id: '2', name: 'Hope BC Plant', lat: 49.3810, lon: -121.4419, status: 'Flow' },
  { id: '3', name: 'Fort Worth DC', lat: 32.7555, lon: -97.3308, status: 'Activating' },
  { id: '4', name: 'Phoenix Cross-Dock', lat: 33.4484, lon: -112.0740, status: 'Flow' },
  { id: '5', name: 'Seattle Terminal', lat: 47.6062, lon: -122.3321, status: 'Flow' },
];

const STATUS_COLORS: Record<string, string> = {
  Flow: '#00B4FF',
  Activating: '#FFB800',
  Chaos: '#FF2A00',
};

interface SimpleMapProps {
  className?: string;
}

export default function SimpleMap({ className }: SimpleMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredFacility, setHoveredFacility] = useState<typeof FACILITIES[0] | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Convert lat/lon to canvas coordinates (simple Mercator projection)
  const toCanvasCoords = (lat: number, lon: number, width: number, height: number) => {
    // Center on US
    const centerLat = 39.8283;
    const centerLon = -98.5795;
    const scale = 8;
    
    const x = (lon - centerLon) * scale + width / 2;
    const y = (centerLat - lat) * scale + height / 2;
    
    return { x, y };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const { width, height } = canvas;
      
      // Clear canvas
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);
      
      // Draw grid
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      // Draw facilities
      FACILITIES.forEach(facility => {
        const { x, y } = toCanvasCoords(facility.lat, facility.lon, width, height);
        const color = STATUS_COLORS[facility.status] || '#888';
        
        // Glow effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
        gradient.addColorStop(0, color + '60');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();
        
        // Main dot
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // White border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Label
        ctx.fillStyle = '#fff';
        ctx.font = '11px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(facility.name, x, y + 22);
      });
    };

    // Set canvas size
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      draw();
    };

    resize();
    window.addEventListener('resize', resize);

    // Mouse tracking for hover
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over a facility
      let found = null;
      for (const facility of FACILITIES) {
        const { x, y } = toCanvasCoords(facility.lat, facility.lon, canvas.width, canvas.height);
        const dist = Math.sqrt((mx - x) ** 2 + (my - y) ** 2);
        if (dist < 15) {
          found = facility;
          break;
        }
      }
      setHoveredFacility(found);
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', cursor: hoveredFacility ? 'pointer' : 'default' }}
      />
      
      {/* Tooltip */}
      {hoveredFacility && (
        <div
          style={{
            position: 'fixed',
            left: mousePos.x + 10,
            top: mousePos.y + 10,
            backgroundColor: '#0F0F0FE6',
            border: '1px solid #00B4FF40',
            borderRadius: 8,
            padding: '8px 12px',
            pointerEvents: 'none',
            zIndex: 1000,
          }}
        >
          <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>
            {hoveredFacility.name}
          </div>
          <div style={{ 
            marginTop: 4, 
            fontSize: 12, 
            color: STATUS_COLORS[hoveredFacility.status],
          }}>
            {hoveredFacility.status}
          </div>
        </div>
      )}
      
      {/* Legend */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          backgroundColor: '#0F0F0FE6',
          border: '1px solid #00B4FF20',
          borderRadius: 8,
          padding: 12,
        }}
      >
        <div style={{ color: '#fff', fontSize: 12, fontWeight: 600, marginBottom: 8 }}>
          Status Legend
        </div>
        {Object.entries(STATUS_COLORS).map(([status, color]) => (
          <div key={status} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: color }} />
            <span style={{ color: '#888', fontSize: 11 }}>{status}</span>
          </div>
        ))}
      </div>
      
      {/* Info */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          backgroundColor: '#0F0F0FE6',
          border: '1px solid #00B4FF20',
          borderRadius: 8,
          padding: 12,
        }}
      >
        <div style={{ color: '#00B4FF', fontSize: 14, fontWeight: 600 }}>
          {FACILITIES.length} Facilities
        </div>
        <div style={{ color: '#888', fontSize: 11, marginTop: 4 }}>
          Simple Canvas Map (Testing)
        </div>
      </div>
    </div>
  );
}
