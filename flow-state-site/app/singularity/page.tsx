'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import Card from '@/components/Card';
import {
  Caution,
  FlowArrow,
  Metrics,
  Cortex,
  Prism,
  Manifest,
  Nexus,
  Comm,
  Signal,
  Cycle,
  Ignite,
  Scope,
  Waypoint,
  Crosshair,
  Velocity,
} from '@/components/icons/FlowIcons';

// Facility node type
interface Facility {
  id: number;
  name: string;
  x: number;
  y: number;
  type: 'dc' | 'port' | 'terminal' | 'plant';
  status: 'offline' | 'activating' | 'online';
  metrics: {
    trucks: number;
    savings: number;
    turnTime: number;
  };
}

// Data packet type
interface DataPacket {
  id: number;
  from: number;
  to: number;
  progress: number;
  type: 'truck' | 'bol' | 'message';
}

export default function SingularityPage() {
  const [phase, setPhase] = useState<'chaos' | 'transition' | 'flow'>('chaos');
  const [activeFacilities, setActiveFacilities] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [trucksProcessed, setTrucksProcessed] = useState(0);
  const [networkVelocity, setNetworkVelocity] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showROI, setShowROI] = useState(false);

  // Facility network - 50 sites across North America
  const facilities: Facility[] = [
    // West Coast Corridor
    { id: 1, name: 'Seattle Gateway', x: 10, y: 12, type: 'port', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 55 } },
    { id: 2, name: 'Portland DC', x: 11, y: 18, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 48 } },
    { id: 3, name: 'Oakland Port', x: 8, y: 35, type: 'port', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 62 } },
    { id: 4, name: 'LA Port', x: 12, y: 48, type: 'port', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 65 } },
    { id: 5, name: 'Long Beach', x: 14, y: 50, type: 'terminal', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 58 } },
    { id: 6, name: 'San Diego Cross', x: 15, y: 55, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 45 } },
    // Mountain West
    { id: 7, name: 'Phoenix Plant', x: 22, y: 52, type: 'plant', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 50 } },
    { id: 8, name: 'Tucson DC', x: 24, y: 56, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 47 } },
    { id: 9, name: 'Las Vegas Hub', x: 18, y: 42, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 44 } },
    { id: 10, name: 'Salt Lake DC', x: 22, y: 32, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 46 } },
    { id: 11, name: 'Denver DC', x: 32, y: 36, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 47 } },
    { id: 12, name: 'Albuquerque', x: 28, y: 48, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 49 } },
    // Texas Triangle
    { id: 13, name: 'El Paso Cross', x: 26, y: 55, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 51 } },
    { id: 14, name: 'Dallas Hub', x: 38, y: 52, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 45 } },
    { id: 15, name: 'Fort Worth DC', x: 36, y: 50, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 46 } },
    { id: 16, name: 'Houston Port', x: 42, y: 62, type: 'port', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 60 } },
    { id: 17, name: 'San Antonio', x: 36, y: 60, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 48 } },
    { id: 18, name: 'Austin Plant', x: 37, y: 56, type: 'plant', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 44 } },
    // Central Corridor
    { id: 19, name: 'Kansas City', x: 42, y: 38, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 43 } },
    { id: 20, name: 'Omaha DC', x: 40, y: 32, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 45 } },
    { id: 21, name: 'Minneapolis', x: 44, y: 22, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 48 } },
    { id: 22, name: 'St Louis Hub', x: 48, y: 40, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 46 } },
    { id: 23, name: 'Oklahoma City', x: 38, y: 46, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 47 } },
    // Great Lakes
    { id: 24, name: 'Chicago DC', x: 52, y: 32, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 48 } },
    { id: 25, name: 'Detroit Plant', x: 58, y: 28, type: 'plant', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 52 } },
    { id: 26, name: 'Cleveland', x: 62, y: 30, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 49 } },
    { id: 27, name: 'Indianapolis', x: 55, y: 36, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 45 } },
    { id: 28, name: 'Columbus DC', x: 60, y: 34, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 46 } },
    { id: 29, name: 'Milwaukee', x: 50, y: 26, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 47 } },
    // Southeast
    { id: 30, name: 'Memphis Hub', x: 50, y: 46, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 42 } },
    { id: 31, name: 'Nashville DC', x: 54, y: 44, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 44 } },
    { id: 32, name: 'Atlanta Hub', x: 60, y: 50, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 52 } },
    { id: 33, name: 'Birmingham', x: 56, y: 50, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 48 } },
    { id: 34, name: 'New Orleans', x: 52, y: 62, type: 'port', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 58 } },
    { id: 35, name: 'Jacksonville', x: 68, y: 58, type: 'port', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 55 } },
    { id: 36, name: 'Tampa DC', x: 68, y: 65, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 50 } },
    { id: 37, name: 'Miami Import', x: 72, y: 75, type: 'port', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 62 } },
    { id: 38, name: 'Savannah Port', x: 68, y: 54, type: 'port', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 56 } },
    { id: 39, name: 'Charlotte DC', x: 66, y: 46, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 45 } },
    // Mid-Atlantic
    { id: 40, name: 'Richmond DC', x: 70, y: 40, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 47 } },
    { id: 41, name: 'Norfolk Port', x: 74, y: 42, type: 'port', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 54 } },
    { id: 42, name: 'Baltimore', x: 74, y: 36, type: 'port', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 52 } },
    { id: 43, name: 'Philadelphia', x: 78, y: 32, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 50 } },
    { id: 44, name: 'Harrisburg DC', x: 75, y: 30, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 46 } },
    // Northeast
    { id: 45, name: 'Newark Terminal', x: 80, y: 28, type: 'terminal', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 58 } },
    { id: 46, name: 'Brooklyn DC', x: 82, y: 26, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 55 } },
    { id: 47, name: 'Hartford DC', x: 84, y: 22, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 48 } },
    { id: 48, name: 'Boston Terminal', x: 88, y: 18, type: 'terminal', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 54 } },
    { id: 49, name: 'Albany DC', x: 80, y: 22, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 47 } },
    { id: 50, name: 'Pittsburgh', x: 68, y: 32, type: 'dc', status: 'offline', metrics: { trucks: 0, savings: 0, turnTime: 49 } },
  ];

  const [facilityStates, setFacilityStates] = useState(facilities);
  const [packets, setPackets] = useState<DataPacket[]>([]);

  // Start the singularity simulation
  const startSimulation = useCallback(() => {
    setIsSimulating(true);
    setPhase('transition');
    setTotalSavings(0);
    setTrucksProcessed(0);
    setNetworkVelocity(0);
    setActiveFacilities(0);

    // Activate facilities one by one
    let activated = 0;
    const activationInterval = setInterval(() => {
      if (activated >= facilities.length) {
        clearInterval(activationInterval);
        setPhase('flow');
        return;
      }

      setFacilityStates(prev => 
        prev.map((f, i) => 
          i === activated ? { ...f, status: 'online' as const } : f
        )
      );
      setActiveFacilities(prev => prev + 1);
      activated++;

      // Network effect: each new facility multiplies value
      const networkMultiplier = 1 + (activated * 0.13);
      setNetworkVelocity(Math.round(networkMultiplier * 100));

    }, 350);

    return () => clearInterval(activationInterval);
  }, [facilities.length]);

  // Accumulate savings when simulating
  useEffect(() => {
    if (!isSimulating || phase === 'chaos') return;

    const savingsInterval = setInterval(() => {
      const activeSites = facilityStates.filter(f => f.status === 'online').length;
      const networkEffect = Math.pow(activeSites, 1.5); // Metcalfe's law
      
      setTotalSavings(prev => prev + Math.round(networkEffect * 847)); // ~$847/min per networked site
      setTrucksProcessed(prev => prev + Math.round(activeSites * 2.3));
    }, 100);

    return () => clearInterval(savingsInterval);
  }, [isSimulating, phase, facilityStates]);

  // Generate data packets between facilities
  useEffect(() => {
    if (phase !== 'flow') return;

    const packetInterval = setInterval(() => {
      const onlineFacilities = facilityStates.filter(f => f.status === 'online');
      if (onlineFacilities.length < 2) return;

      const from = onlineFacilities[Math.floor(Math.random() * onlineFacilities.length)];
      const to = onlineFacilities[Math.floor(Math.random() * onlineFacilities.length)];
      if (from.id === to.id) return;

      const types: ('truck' | 'bol' | 'message')[] = ['truck', 'bol', 'message'];
      
      setPackets(prev => [...prev.slice(-20), {
        id: Date.now() + Math.random(),
        from: from.id,
        to: to.id,
        progress: 0,
        type: types[Math.floor(Math.random() * types.length)]
      }]);
    }, 300);

    return () => clearInterval(packetInterval);
  }, [phase, facilityStates]);

  // Animate packets
  useEffect(() => {
    if (packets.length === 0) return;

    const animationInterval = setInterval(() => {
      setPackets(prev => 
        prev
          .map(p => ({ ...p, progress: p.progress + 5 }))
          .filter(p => p.progress <= 100)
      );
    }, 50);

    return () => clearInterval(animationInterval);
  }, [packets.length]);

  const resetSimulation = () => {
    setIsSimulating(false);
    setPhase('chaos');
    setActiveFacilities(0);
    setTotalSavings(0);
    setTrucksProcessed(0);
    setNetworkVelocity(0);
    setFacilityStates(facilities);
    setPackets([]);
  };

  const formatMoney = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(2)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}K`;
    return `$${amount}`;
  };

  return (
    <div className="min-h-screen bg-void">
      <Header />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
        {/* Animated background based on phase */}
        <div className={`absolute inset-0 transition-all duration-1000 ${
          phase === 'chaos' ? 'opacity-30' : phase === 'transition' ? 'opacity-50' : 'opacity-70'
        }`}>
          <div className="grid-background"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 w-full">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
              The <span className="neon-glow">Logistics Singularity</span>
            </h1>
            <p className="text-xl text-steel max-w-3xl mx-auto">
              Watch what happens when every facility in your network achieves Flow State.
              <br />
              <span className="text-neon font-semibold">This is the point of no return.</span>
            </p>
          </div>

          {/* Network Visualization */}
          <div className="glass-card p-4 mb-8 aspect-[16/9] relative overflow-hidden">
            {/* Phase indicator */}
            <div className="absolute top-4 left-4 z-20">
              <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                phase === 'chaos' ? 'bg-ember/20 text-ember' :
                phase === 'transition' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-neon/20 text-neon'
              }`}>
                  <span className="inline-flex items-center gap-2">
                    {phase === 'chaos' ? (
                      <>
                        <Caution size={16} />
                        CHAOS STATE
                      </>
                    ) : phase === 'transition' ? (
                      <>
                        <Cycle size={16} />
                        TRANSFORMATION IN PROGRESS
                      </>
                    ) : (
                      <>
                        <Velocity size={16} />
                        FLOW STATE ACHIEVED
                      </>
                    )}
                  </span>
              </div>
            </div>

            {/* SVG Network Map */}
            <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              {/* US Map Outline - SONAR style */}
              <g className="us-map-outline">
                {/* Continental US outline path - simplified for performance */}
                <path
                  d="M8,18 L10,12 L12,10 L11,15 L10,20 L8,28 L7,35 L6,42 L8,48 L10,52 L12,55 L15,58 L18,56 L22,58 L26,60 L30,58 L34,62 L38,65 L42,68 L46,66 L50,68 L54,65 L58,62 L62,58 L66,60 L70,58 L72,62 L74,68 L76,75 L72,78 L68,72 L64,65 L60,60 L56,58 L52,55 L48,52 L44,50 L40,48 L36,50 L32,48 L28,50 L24,52 L20,50 L16,48 L12,50 L8,48"
                  fill="none"
                  stroke="#00FFC2"
                  strokeWidth="0.3"
                  opacity="0.15"
                  className="transition-opacity duration-1000"
                />
                {/* West Coast */}
                <path
                  d="M8,12 L10,10 L11,14 L10,22 L8,30 L6,38 L7,45 L10,50 L13,54 L16,56"
                  fill="none"
                  stroke="#00FFC2"
                  strokeWidth="0.4"
                  opacity={phase === 'flow' ? 0.35 : 0.12}
                  className="transition-opacity duration-1000"
                />
                {/* Southern Border */}
                <path
                  d="M16,56 L20,54 L24,56 L28,55 L32,58 L36,62 L40,64 L44,66 L48,65 L52,68 L56,66 L60,62 L64,58 L68,56 L72,60 L74,68 L76,78"
                  fill="none"
                  stroke="#00FFC2"
                  strokeWidth="0.4"
                  opacity={phase === 'flow' ? 0.35 : 0.12}
                  className="transition-opacity duration-1000"
                />
                {/* East Coast */}
                <path
                  d="M76,78 L74,72 L72,65 L70,58 L72,52 L74,46 L76,40 L78,34 L80,28 L82,24 L86,20 L90,16"
                  fill="none"
                  stroke="#00FFC2"
                  strokeWidth="0.4"
                  opacity={phase === 'flow' ? 0.35 : 0.12}
                  className="transition-opacity duration-1000"
                />
                {/* Northern Border */}
                <path
                  d="M90,16 L86,14 L80,16 L74,14 L68,16 L62,15 L56,16 L50,14 L44,16 L38,15 L32,16 L26,14 L20,15 L14,14 L10,12 L8,12"
                  fill="none"
                  stroke="#00FFC2"
                  strokeWidth="0.4"
                  opacity={phase === 'flow' ? 0.35 : 0.12}
                  className="transition-opacity duration-1000"
                />
                {/* Great Lakes region outline */}
                <path
                  d="M50,22 L54,20 L58,22 L62,20 L64,24 L60,28 L56,26 L52,28 L48,26 L50,22"
                  fill="none"
                  stroke="#00FFC2"
                  strokeWidth="0.25"
                  opacity={phase === 'flow' ? 0.25 : 0.08}
                  className="transition-opacity duration-1000"
                />
                {/* Florida peninsula */}
                <path
                  d="M64,58 L66,62 L68,66 L70,72 L72,78 L74,80 L72,76 L68,68 L66,62"
                  fill="none"
                  stroke="#00FFC2"
                  strokeWidth="0.3"
                  opacity={phase === 'flow' ? 0.3 : 0.1}
                  className="transition-opacity duration-1000"
                />
                {/* Texas shape */}
                <path
                  d="M28,55 L32,52 L36,50 L40,52 L44,56 L46,62 L44,66 L40,64 L36,62 L32,58 L28,55"
                  fill="none"
                  stroke="#00FFC2"
                  strokeWidth="0.25"
                  opacity={phase === 'flow' ? 0.2 : 0.06}
                  className="transition-opacity duration-1000"
                />
              </g>

              {/* Connection lines between online facilities */}
              {phase !== 'chaos' && facilityStates.filter(f => f.status === 'online').map((from, i, arr) => 
                arr.slice(i + 1).map(to => (
                  <line
                    key={`${from.id}-${to.id}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="#00FFC2"
                    strokeWidth="0.15"
                    opacity={phase === 'flow' ? 0.4 : 0.2}
                    className="transition-opacity duration-500"
                  />
                ))
              )}

              {/* Data packets */}
              {packets.map(packet => {
                const from = facilityStates.find(f => f.id === packet.from);
                const to = facilityStates.find(f => f.id === packet.to);
                if (!from || !to) return null;

                const x = from.x + (to.x - from.x) * (packet.progress / 100);
                const y = from.y + (to.y - from.y) * (packet.progress / 100);

                return (
                  <g key={packet.id}>
                    <circle
                      cx={x}
                      cy={y}
                      r={packet.type === 'truck' ? 1.2 : 0.8}
                      fill={packet.type === 'truck' ? '#00FFC2' : packet.type === 'bol' ? '#FFB800' : '#00A8FF'}
                      opacity={0.9}
                    >
                      <animate
                        attributeName="opacity"
                        values="0.9;0.5;0.9"
                        dur="0.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                );
              })}

              {/* Facility nodes */}
              {facilityStates.map(facility => (
                <g key={facility.id} className="cursor-pointer">
                  {/* Pulse ring for online facilities */}
                  {facility.status === 'online' && (
                    <circle
                      cx={facility.x}
                      cy={facility.y}
                      r="3"
                      fill="none"
                      stroke="#00FFC2"
                      strokeWidth="0.3"
                      opacity="0.5"
                    >
                      <animate
                        attributeName="r"
                        values="2;5;2"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.5;0;0.5"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                  
                  {/* Main node */}
                  <circle
                    cx={facility.x}
                    cy={facility.y}
                    r="2"
                    fill={facility.status === 'offline' ? '#FF2A00' : 
                          facility.status === 'activating' ? '#FFB800' : '#00FFC2'}
                    className="transition-all duration-500"
                  />
                  
                  {/* Hexagon overlay for online */}
                  {facility.status === 'online' && (
                    <polygon
                      points={`${facility.x},${facility.y-2.5} ${facility.x+2.2},${facility.y-1.25} ${facility.x+2.2},${facility.y+1.25} ${facility.x},${facility.y+2.5} ${facility.x-2.2},${facility.y+1.25} ${facility.x-2.2},${facility.y-1.25}`}
                      fill="none"
                      stroke="#00FFC2"
                      strokeWidth="0.3"
                    />
                  )}

                  {/* Label */}
                  <text
                    x={facility.x}
                    y={facility.y + 5}
                    fontSize="2"
                    fill={facility.status === 'online' ? '#00FFC2' : '#888888'}
                    textAnchor="middle"
                    className="transition-colors duration-500"
                  >
                    {facility.name}
                  </text>
                </g>
              ))}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 glass-card p-3 text-xs">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-neon"></div>
                <span className="text-steel">Flow State</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <span className="text-steel">Activating</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-ember"></div>
                <span className="text-steel">Chaos</span>
              </div>
            </div>
          </div>

          {/* Live Metrics Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center">
              <p className="text-sm text-steel mb-1">Network Sites</p>
              <p className="text-4xl font-black neon-glow">{activeFacilities}/{facilities.length}</p>
            </Card>
            <Card className="text-center">
              <p className="text-sm text-steel mb-1">Live Savings</p>
              <p className="text-4xl font-black text-neon">{formatMoney(totalSavings)}</p>
            </Card>
            <Card className="text-center">
              <p className="text-sm text-steel mb-1">Trucks Processed</p>
              <p className="text-4xl font-black">{trucksProcessed.toLocaleString()}</p>
            </Card>
            <Card className="text-center">
              <p className="text-sm text-steel mb-1">Network Velocity</p>
              <p className="text-4xl font-black text-neon">{networkVelocity}%</p>
            </Card>
          </div>

          {/* Control Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {!isSimulating ? (
              <Button variant="neon-fill" size="lg" onClick={startSimulation} icon={<Velocity size={20} className="text-void" />}>
                Initiate Singularity
              </Button>
            ) : (
              <Button variant="neon" size="lg" onClick={resetSimulation} icon={<Cycle size={20} />}>
                Reset Simulation
              </Button>
            )}
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setShowROI(!showROI)}
              icon={<Metrics size={20} />}
            >
              {showROI ? 'Hide' : 'Show'} ROI Breakdown
            </Button>
          </div>

          {/* ROI Breakdown Panel */}
          {showROI && (
            <div className="glass-card p-8 mb-8 animate-flow-in">
              <h3 className="text-2xl font-bold mb-6 neon-glow">Network Effect ROI Model</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-neon mb-3">Per-Site Savings</h4>
                  <ul className="space-y-2 text-sm text-steel">
                    <li className="flex justify-between">
                      <span>Gate automation</span>
                      <span className="text-white">$127K/yr</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Paperless BOL</span>
                      <span className="text-white">$89K/yr</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Detention reduction</span>
                      <span className="text-white">$234K/yr</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Labor optimization</span>
                      <span className="text-white">$156K/yr</span>
                    </li>
                    <li className="flex justify-between border-t border-neon/20 pt-2 mt-2">
                      <span className="font-bold">Total per site</span>
                      <span className="text-neon font-bold">$606K/yr</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-neon mb-3">Network Multiplier</h4>
                  <ul className="space-y-2 text-sm text-steel">
                    <li className="flex justify-between">
                      <span>1 site</span>
                      <span className="text-white">1.0x</span>
                    </li>
                    <li className="flex justify-between">
                      <span>10 sites</span>
                      <span className="text-white">2.2x</span>
                    </li>
                    <li className="flex justify-between">
                      <span>25 sites</span>
                      <span className="text-white">4.2x</span>
                    </li>
                    <li className="flex justify-between">
                      <span>50 sites</span>
                      <span className="text-white">6.5x</span>
                    </li>
                    <li className="flex justify-between border-t border-neon/20 pt-2 mt-2">
                      <span className="font-bold">100+ sites</span>
                      <span className="text-neon font-bold">9.8x+</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-neon mb-3">50-Site Network</h4>
                  <ul className="space-y-2 text-sm text-steel">
                    <li className="flex justify-between">
                      <span>Base savings</span>
                      <span className="text-white">$30.3M/yr</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Network effect (6.5x)</span>
                      <span className="text-white">+$166.6M/yr</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Velocity gains</span>
                      <span className="text-white">+$24.8M/yr</span>
                    </li>
                    <li className="flex justify-between border-t border-neon/20 pt-2 mt-2">
                      <span className="font-bold">Total annual</span>
                      <span className="text-neon font-bold">$221.7M/yr</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-bold">ROI</span>
                      <span className="text-neon font-bold">1,847%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* The Singularity Manifesto */}
      <section className="py-24 bg-carbon/50 border-t border-neon/20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-black mb-12 text-center">
            The <span className="neon-glow">Irreversible</span> Shift
          </h2>

          <div className="space-y-8 text-lg text-steel/90 leading-relaxed">
            <p>
              <span className="text-neon font-bold text-2xl">"</span>
              There are moments in history when technology doesn't just improve—it <span className="text-neon font-semibold">transforms</span>. 
              The printing press. The telegraph. The internet. The smartphone.
            </p>

            <p>
              Each created a <span className="text-white font-semibold">singularity</span>—a point where the old way becomes 
              not just inefficient, but <span className="text-ember">unthinkable</span>.
            </p>

            <p>
              Today, your yard operates like it's 1995. Clipboards. Radio chatter. Manual check-ins. 
              Paper BOLs. <span className="text-steel/60">While your TMS and WMS live in 2025.</span>
            </p>

            <div className="glass-card p-8 border-l-4 border-neon my-12">
              <p className="text-2xl font-bold text-white mb-4">
                The gap isn't closing. It's widening.
              </p>
              <p className="text-steel">
                Every day you wait, your competitors are capturing ground source truth. 
                Building network effects. Compounding their advantage.
              </p>
            </div>

            <p>
              When every facility in your network achieves <span className="text-neon font-semibold">Flow State</span>:
            </p>

            <ul className="space-y-4 pl-6">
              <li className="flex gap-3">
                <FlowArrow size={16} className="text-neon flex-shrink-0 mt-1" />
                <span>Drivers check in <span className="text-white font-semibold">without human intervention</span>. Gate to dock in 4 minutes, not 48.</span>
              </li>
              <li className="flex gap-3">
                <FlowArrow size={16} className="text-neon flex-shrink-0 mt-1" />
                <span>BOLs are <span className="text-white font-semibold">born digital</span>. Chain of custody is immutable. Disputes vanish.</span>
              </li>
              <li className="flex gap-3">
                <FlowArrow size={16} className="text-neon flex-shrink-0 mt-1" />
                <span>Every asset speaks. Every move is <span className="text-white font-semibold">orchestrated by AI</span>. Yard jockeys become operators.</span>
              </li>
              <li className="flex gap-3">
                <FlowArrow size={16} className="text-neon flex-shrink-0 mt-1" />
                <span>Network intelligence compounds. <span className="text-white font-semibold">Metcalfe's Law</span> kicks in. Each new site multiplies value.</span>
              </li>
            </ul>

            <p className="text-2xl font-bold text-white mt-12">
              This is the Logistics Singularity.
              <br />
              <span className="neon-glow">And it's happening now.</span>
            </p>
          </div>
        </div>
      </section>

      {/* What Happens When Section */}
      <section className="py-24 border-t border-neon/20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-black mb-16 text-center">What Changes Forever</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                before: 'Guard shack with clipboard',
                after: 'Autonomous kiosk network',
                icon: <Waypoint size={40} className="text-neon" />,
                detail: 'Drivers verify identity via mobile. OCR validates trucks. Average gate time: 47 seconds.'
              },
              {
                before: 'Paper BOLs and fax machines',
                after: 'Digital chain of custody',
                icon: <Manifest size={40} className="text-neon" />,
                detail: 'Documents are captured, validated, and stored immutably. No disputes. No lost paperwork.'
              },
              {
                before: 'Radio calls and shouting',
                after: 'Real-time SMS orchestration',
                icon: <Signal size={40} className="text-neon" />,
                detail: 'Drivers get translated instructions instantly. No app download. No radio chatter.'
              },
              {
                before: 'Yard checks every 4 hours',
                after: 'Continuous ground source truth',
                icon: <Scope size={40} className="text-neon" />,
                detail: 'Know where every asset is, every moment. GPS + computer vision + driver confirmation.'
              },
              {
                before: 'Reactive firefighting',
                after: 'Predictive orchestration',
                icon: <Cortex size={40} className="text-neon" />,
                detail: 'AI recommends optimal moves before congestion happens. Autonomous execution optional.'
              },
              {
                before: 'Siloed facility data',
                after: 'Network intelligence',
                icon: <Nexus size={40} className="text-neon" />,
                detail: 'Cross-facility visibility. Predict arrivals. Balance loads. Compound efficiency.'
              },
            ].map((item, i) => (
              <Card key={i} hover className="overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">{item.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-ember line-through text-sm">{item.before}</span>
                      <FlowArrow size={16} className="text-neon" />
                      <span className="text-neon font-semibold">{item.after}</span>
                    </div>
                    <p className="text-steel/80 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founding Member Program */}
      <section className="py-24 bg-gradient-to-br from-neon/10 to-transparent border-t border-neon/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-2 rounded-full border border-neon/50 text-neon text-sm font-semibold mb-8">
            <span className="inline-flex items-center gap-2">
              <Ignite size={16} />
              FOUNDING MEMBER PROGRAM
            </span>
          </div>

          <h2 className="text-5xl font-black mb-6">
            Join the First 50
          </h2>

          <p className="text-xl text-steel mb-12 max-w-2xl mx-auto">
            We're building the network with a select cohort of forward-thinking enterprises. 
            Founding members get priority deployment, direct product input, and <span className="text-neon font-semibold">locked-in pricing for life</span>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <div className="text-neon mb-3">
                <Velocity size={40} />
              </div>
              <h3 className="font-bold text-neon mb-2">Priority Access</h3>
              <p className="text-steel/80 text-sm">Jump the deployment queue. Go live in weeks, not quarters.</p>
            </Card>
            <Card>
              <div className="text-neon mb-3">
                <Crosshair size={40} />
              </div>
              <h3 className="font-bold text-neon mb-2">Product Council</h3>
              <p className="text-steel/80 text-sm">Direct input on roadmap. Shape the features your network needs.</p>
            </Card>
            <Card>
              <div className="text-neon mb-3">
                <Prism size={40} />
              </div>
              <h3 className="font-bold text-neon mb-2">Founder Pricing</h3>
              <p className="text-steel/80 text-sm">Lock in 2024 rates forever. No increases. Ever.</p>
            </Card>
          </div>

          <div className="glass-card p-8 inline-block mb-8">
            <p className="text-steel mb-2">Founding Member Spots Remaining</p>
            <p className="text-6xl font-black neon-glow">23 / 50</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="neon-fill" size="lg" icon={<Crosshair size={20} className="text-void" />}>
              Apply for Founding Membership
            </Button>
            <Button variant="neon" size="lg" icon={<Comm size={20} />}>
              Talk to a Human
            </Button>
          </div>

          <p className="text-sm text-steel/60 mt-6">
            Applications reviewed within 48 hours. Qualified enterprises only.
          </p>
        </div>
      </section>

      {/* Competitive Intelligence */}
      <section className="py-24 border-t border-neon/20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-8 text-center">
            <span className="text-ember">Your Competitors</span> Are Already Here
          </h2>

          <div className="glass-card p-8 border border-ember/30 mb-8">
            <div className="flex items-start gap-4">
              <div className="text-ember flex-shrink-0">
                <Caution size={40} />
              </div>
              <div>
                <p className="text-lg text-steel/90 leading-relaxed">
                  In the last 90 days, <span className="text-white font-bold">7 of your direct competitors</span> have 
                  initiated Flow State evaluations. Three have already signed founding agreements.
                </p>
                <p className="text-sm text-steel/60 mt-4">
                  We can't tell you who. But we can tell you the window is closing.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-steel mb-8">
              The network effect is real. The first movers will define the standard.
              <br />
              <span className="text-neon font-semibold">Which side of history will you be on?</span>
            </p>

            <Button variant="neon-fill" size="lg">
              <span className="inline-flex items-center gap-2">
                <Velocity size={20} className="text-void" />
                Secure Your Position Now
              </span>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
