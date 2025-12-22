import React from 'react';
import { motion } from 'framer-motion';

interface DualTrackVisualizerProps {
  tracks: number;
  height: number;
  colors?: string[];
  labels?: string[];
}

export const DualTrackVisualizer: React.FC<DualTrackVisualizerProps> = ({
  tracks,
  height,
  colors,
  labels
}) => {
  const defaultColors = ['#0891b2', '#7c3aed', '#ea580c', '#16a34a']; // Cyan, Violet, Orange, Green
  const defaultLabels = ['Vocal', 'Instrumental', 'Drums', 'Bass'];
  
  const currentColors = colors || defaultColors;
  const currentLabels = labels || defaultLabels;

  return (
    <div style={{ height }} className="w-full flex flex-col gap-1 bg-white rounded-lg p-1 border border-gray-100 shadow-sm">
      {Array.from({ length: tracks }).map((_, i) => (
        <div key={i} className="flex-1 relative bg-gray-50 rounded border border-gray-100 overflow-hidden flex items-end">
           <div className="absolute top-0.5 left-1 z-10 text-[7px] md:text-[8px] font-bold text-gray-400 uppercase tracking-wider">
             {currentLabels[i % currentLabels.length]}
           </div>
           <div className="w-full h-full flex items-end justify-between gap-[1px] px-0.5 pb-0.5 opacity-80">
              {Array.from({ length: 24 }).map((_, j) => (
                 <motion.div
                   key={j}
                   className="w-full rounded-t-[1px]"
                   style={{ backgroundColor: currentColors[i % currentColors.length] }}
                   initial={{ height: '20%' }}
                   animate={{ 
                     height: [`${10 + Math.random() * 20}%`, `${30 + Math.random() * 60}%`, `${10 + Math.random() * 20}%`] 
                   }}
                   transition={{
                     duration: 0.5 + Math.random() * 0.5,
                     repeat: Infinity,
                     delay: j * 0.03,
                     ease: "easeInOut"
                   }}
                 />
              ))}
           </div>
        </div>
      ))}
    </div>
  );
};
