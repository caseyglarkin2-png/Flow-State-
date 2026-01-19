/**
 * NETWORK COMPOUNDING ANIMATION
 * Shows facility count scaling from 1 → 10 → 260+ with proof points multiplying
 * Brand-aligned: neon network nodes, proof point counters, enterprise scale
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const SCALE_STAGES = [
  { facilities: 1, proofPoints: 21170, label: 'Single Facility' },
  { facilities: 10, proofPoints: 211700, label: 'Regional Network' },
  { facilities: 260, proofPoints: 5504200, label: 'Enterprise Network (Primo Scale)' },
];

export default function NetworkCompoundingAnimation() {
  const [stageIndex, setStageIndex] = useState(0);
  const currentStage = SCALE_STAGES[stageIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % SCALE_STAGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Generate node positions in a network grid
  const generateNodes = (count: number) => {
    const maxDisplay = Math.min(count, 20); // Cap visual nodes at 20
    const nodes = [];
    const gridSize = Math.ceil(Math.sqrt(maxDisplay));
    
    for (let i = 0; i < maxDisplay; i++) {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      nodes.push({
        id: i,
        x: (col + 0.5) * (100 / gridSize),
        y: (row + 0.5) * (100 / gridSize),
      });
    }
    return nodes;
  };

  const nodes = generateNodes(currentStage.facilities);

  return (
    <div className="relative w-full aspect-video bg-gradient-to-br from-void via-carbon to-void overflow-hidden rounded-lg border border-neon/20">
      {/* Title */}
      <div className="absolute top-6 left-0 right-0 text-center z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={stageIndex}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-neon mb-1">
              {currentStage.facilities.toLocaleString()} {currentStage.facilities === 1 ? 'Facility' : 'Facilities'}
            </h3>
            <p className="text-steel/70 text-sm">{currentStage.label}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Network visualization */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[80%] h-[60%]">
          <AnimatePresence mode="wait">
            <motion.div
              key={stageIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full"
            >
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full">
                {nodes.map((node, i) =>
                  nodes.slice(i + 1).map((targetNode, j) => (
                    <motion.line
                      key={`${i}-${j}`}
                      x1={`${node.x}%`}
                      y1={`${node.y}%`}
                      x2={`${targetNode.x}%`}
                      y2={`${targetNode.y}%`}
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-neon/20"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, delay: i * 0.05 }}
                    />
                  ))
                )}
              </svg>

              {/* Facility nodes */}
              {nodes.map((node, i) => (
                <motion.div
                  key={node.id}
                  className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <motion.div
                    className="w-full h-full rounded-full bg-neon shadow-[0_0_10px_rgba(0,180,255,0.6)]"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.1,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Stats panel */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8">
        <motion.div
          key={`proof-${stageIndex}`}
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-2xl md:text-3xl font-bold text-neon font-mono">
            {currentStage.proofPoints.toLocaleString()}
          </div>
          <div className="text-xs text-steel/70">Proof Points/Year</div>
        </motion.div>

        {currentStage.facilities > 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <div className="text-2xl md:text-3xl font-bold text-neon/80 font-mono">
              {(currentStage.facilities * 58).toLocaleString()}
            </div>
            <div className="text-xs text-steel/70">Cross-Facility Patterns</div>
          </motion.div>
        )}
      </div>

      {/* More facilities indicator */}
      {currentStage.facilities > nodes.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-20 right-8 text-steel/50 text-xs font-mono"
        >
          +{currentStage.facilities - nodes.length} more facilities
        </motion.div>
      )}

      {/* Network effect label */}
      <div className="absolute top-1/2 left-4 text-xs text-steel/40 font-mono rotate-[-90deg] origin-left">
        NETWORK COMPOUNDING
      </div>
    </div>
  );
}
