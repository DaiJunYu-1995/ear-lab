import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { DualTrackVisualizer } from './DualTrackVisualizer';
import { Sparkles } from 'lucide-react';

// --- UTILS & SUB-COMPONENTS ---

const COLORS = {
  vocal: '#0891b2', // Cyan
  inst: '#7c3aed',  // Violet
  mix: '#2563EB',   // Blue
  accent: '#ea580c' // Orange
};

// 1. Mel Spectrogram Visualizer
const MelSpectrogram: React.FC<{ color?: string }> = ({ color = COLORS.mix }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;
    const draw = () => {
      frame++;
      const w = canvas.width;
      const h = canvas.height;
      const barWidth = 5; // Bigger bars
      const numBars = Math.ceil(w / barWidth);

      ctx.clearRect(0, 0, w, h);
      
      for (let i = 0; i < numBars; i++) {
        for (let j = 0; j < 6; j++) { 
           const x = w - (i * barWidth) + (frame * 0.5 % barWidth);
           // Scrolling noise pattern
           const value = Math.sin(i * 0.15 + j * 0.8 + frame * 0.02) * 0.5 + 0.5;
           
           ctx.fillStyle = color;
           ctx.globalAlpha = value * 0.8;
           const barH = (h / 6) - 1;
           const y = j * (h / 6);
           
           if (value > 0.2) {
             ctx.fillRect(x, y, barWidth - 1, barH);
           }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [color]);

  return (
    <div className="w-24 h-14 bg-gray-900 rounded-lg border border-gray-700 overflow-hidden relative shadow-md">
      <canvas ref={canvasRef} width={96} height={56} />
      <div className="absolute bottom-1 right-1.5 text-[8px] text-white/50 font-mono font-bold tracking-wider">MEL</div>
    </div>
  );
};

// 2. Chroma Visualizer (Heatmap Grid)
const ChromaGrid: React.FC = () => {
  return (
    <div className="w-24 h-14 bg-black rounded-lg border border-gray-800 p-0.5 grid grid-cols-8 gap-[1px] overflow-hidden relative shadow-md">
       {Array.from({ length: 32 }).map((_, i) => (
         <motion.div 
            key={i}
            className="bg-green-500 rounded-[1px]"
            animate={{ opacity: [0.1, 0.9, 0.1] }}
            transition={{ duration: 1.5, delay: Math.random() * 2, repeat: Infinity }}
         />
       ))}
       <div className="absolute bottom-1 right-1.5 text-[8px] text-white/50 font-mono font-bold tracking-wider z-10 bg-black/40 px-1 rounded">CHROMA</div>
    </div>
  );
};

// 3. Lyrics Visualizer (Scrolling Text)
const LyricsScroll: React.FC<{ text?: string; muted?: boolean }> = ({ text = "♫ Hit the rhyme. 似乎是最好的回答 ♫", muted = false }) => {
  return (
    <div className={`w-24 h-14 bg-white rounded-lg border border-gray-200 overflow-hidden relative flex items-center justify-center shadow-md ${muted ? 'bg-gray-50' : ''}`}>
       {muted ? (
         <span className="text-[9px] font-mono text-gray-400 font-bold">[EMPTY]</span>
       ) : (
         <motion.div 
           className="whitespace-nowrap text-[9px] font-mono text-gray-700 font-bold"
           animate={{ x: ['100%', '-100%'] }}
           transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
         >
           {text}
         </motion.div>
       )}
       <div className="absolute bottom-1 right-1.5 text-[8px] text-gray-400 font-mono font-bold tracking-wider">LYRICS</div>
    </div>
  );
};

// Node Components
const TransformerStack: React.FC<{ label: string, active?: boolean }> = ({ label, active }) => {
  const layers = 6; 
  return (
    <div className="relative flex flex-col items-center justify-center w-28 h-24 bg-white rounded-xl border border-gray-200 shadow-xl group overflow-hidden">
       
       {/* Animated Data Flow Background Hint */}
       {active && (
         <motion.div 
           className="absolute inset-0 bg-gradient-to-t from-blue-50/0 via-blue-50/50 to-blue-50/0"
           animate={{ y: ['100%', '-100%'] }}
           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
         />
       )}

       <div className="flex flex-col gap-1 mb-2 z-10 w-full px-5">
         {Array.from({ length: layers }).map((_, i) => {
           // Reverse index for bottom-up flow animation logic
           const reverseIndex = layers - 1 - i;
           return (
             <motion.div 
                key={i} 
                className="w-full h-1 rounded-full bg-gray-100"
                animate={active ? { 
                  backgroundColor: ['#f3f4f6', '#3b82f6', '#f3f4f6'],
                  scaleX: [1, 1.05, 1]
                } : {}}
                transition={{ 
                  duration: 1.2, 
                  delay: reverseIndex * 0.15, // Bottom-up delay
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
             />
           );
         })}
       </div>
       <div className="text-[9px] font-bold text-gray-600 uppercase tracking-widest border-t border-gray-100 pt-1.5 w-full text-center z-10 bg-white/80 backdrop-blur-sm">
          {label}
       </div>
       <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-gray-900 text-white rounded text-[8px] flex items-center justify-center font-mono font-bold shadow-sm z-20">
         12L
       </div>
    </div>
  );
};

const SimVQ: React.FC = () => (
  <div className="w-16 h-16 bg-white rounded-xl border-2 border-indigo-200 grid grid-cols-3 gap-1 p-1 shadow-md relative z-10 shrink-0">
    {[...Array(9)].map((_, i) => (
      <motion.div
        key={i}
        className="rounded-[1px] bg-indigo-50"
        animate={{ backgroundColor: ['#e0e7ff', '#6366f1', '#e0e7ff'] }}
        transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
      />
    ))}
    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-indigo-700 whitespace-nowrap tracking-wider bg-indigo-50 px-1.5 py-0.5 rounded-full border border-indigo-100">SimVQ</div>
  </div>
);

const FlowLine: React.FC<{ active?: boolean, width?: string, vertical?: boolean }> = ({ active = true, width = "40px", vertical = false }) => (
  <div className={`relative flex items-center justify-center ${vertical ? 'h-8 w-[2px] flex-col' : `h-[2px]`}`} style={{ width: vertical ? '2px' : width }}>
     <div className={`bg-gray-200 rounded-full ${vertical ? 'w-full h-full' : 'h-full w-full'}`} />
     {active && (
       <motion.div 
         className={`absolute bg-brand-accent rounded-full ${vertical ? 'w-full h-1/3' : 'h-full w-1/3'}`}
         animate={vertical ? { y: [-15, 45], opacity: [0, 1, 0] } : { x: [-20, 60], opacity: [0, 1, 0] }}
         transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
       />
     )}
  </div>
);

// --- MAIN COMPONENT ---

export const DuoTokViz: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-4 relative overflow-hidden">
      
      {/* Background Dots */}
      <div className="absolute inset-0 opacity-[0.05] bg-[size:20px_20px] bg-[radial-gradient(#000_1px,transparent_1px)] pointer-events-none" />

      {/* Visualizer Container */}
      <div className="w-full overflow-x-auto custom-scrollbar px-2 pb-2 z-10 flex justify-center">
         <div className="flex items-center justify-center relative min-w-max mx-auto py-4">
           
             {/* === STAGE 3: DUAL DISCRETIZATION (ONLY) === */}
             <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-8 py-4 scale-[0.7] md:scale-[0.8] lg:scale-90 origin-center"
             >
                {/* PARALLEL STREAMS CONTAINER */}
                <div className="relative flex flex-col gap-6">
                   
                   {/* Shared Architecture Background Box */}
                   <div className="absolute top-[-16px] bottom-[-16px] left-[140px] right-[140px] border-2 border-dashed border-gray-200 rounded-3xl bg-white/50 -z-10" />
                   <div className="absolute top-[-32px] left-[50%] -translate-x-1/2 text-[10px] font-bold text-gray-400 bg-white px-2 py-0.5 rounded-full shadow-sm border border-gray-100 whitespace-nowrap">SHARED WEIGHTS (BATCHED)</div>

                   {/* --- VOCAL STREAM --- */}
                   <div className="flex items-center gap-1">
                      {/* Input */}
                      <div className="w-28 flex flex-col items-center gap-2 shrink-0">
                        <div className="border-2 border-cyan-100 bg-cyan-50/30 p-1.5 rounded-xl w-full shadow-sm">
                          <DualTrackVisualizer tracks={1} height={40} colors={[COLORS.vocal]} labels={['Vocal']} />
                        </div>
                      </div>
                      
                      <FlowLine width="12px" />
                      
                      {/* Encoder */}
                      <div className="shrink-0 scale-90 origin-center">
                         <TransformerStack label="Encoder" active />
                      </div>

                      <FlowLine width="12px" />

                      {/* SimVQ */}
                      <div className="shrink-0 scale-90">
                         <SimVQ />
                      </div>

                      <FlowLine width="12px" />

                      {/* Decoder */}
                      <div className="shrink-0 scale-90 origin-center">
                         <TransformerStack label="Decoder" active />
                      </div>

                      <FlowLine width="20px" />

                      {/* Tasks */}
                      <div className="flex flex-col gap-1.5 scale-100 origin-left border-l-2 border-cyan-100 pl-4">
                         <div className="flex gap-2 items-center"><MelSpectrogram color={COLORS.vocal} /></div>
                         <div className="flex gap-2 items-center"><ChromaGrid /></div>
                         <div className="flex gap-2 items-center"><LyricsScroll /></div>
                      </div>
                   </div>

                   {/* --- INST STREAM --- */}
                   <div className="flex items-center gap-1">
                      {/* Input */}
                      <div className="w-28 flex flex-col items-center gap-2 shrink-0">
                        <div className="border-2 border-violet-100 bg-violet-50/30 p-1.5 rounded-xl w-full shadow-sm">
                          <DualTrackVisualizer tracks={1} height={40} colors={[COLORS.inst]} labels={['Inst']} />
                        </div>
                      </div>
                      
                      <FlowLine width="12px" />
                      
                      {/* Encoder */}
                      <div className="shrink-0 scale-90 origin-center opacity-70 grayscale-[0.3] hover:grayscale-0 hover:opacity-100 transition-all">
                         <TransformerStack label="Encoder" active />
                      </div>

                      <FlowLine width="12px" />

                      {/* SimVQ */}
                      <div className="shrink-0 scale-90">
                         <SimVQ />
                      </div>

                      <FlowLine width="12px" />

                      {/* Decoder */}
                      <div className="shrink-0 scale-90 origin-center opacity-70 grayscale-[0.3] hover:grayscale-0 hover:opacity-100 transition-all">
                         <TransformerStack label="Decoder" active />
                      </div>

                      <FlowLine width="20px" />

                      {/* Tasks */}
                      <div className="flex flex-col gap-1.5 scale-100 origin-left border-l-2 border-violet-100 pl-4">
                         <div className="flex gap-2 items-center"><MelSpectrogram color={COLORS.inst} /></div>
                         <div className="flex gap-2 items-center"><ChromaGrid /></div>
                         <div className="flex gap-2 items-center"><LyricsScroll muted /></div>
                      </div>
                   </div>

                </div>
             </motion.div>
         </div>
      </div>
      
      {/* Caption */}
      <div className="mt-2 text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50/90 border border-blue-100 rounded-full text-xs font-medium text-blue-700 shadow-sm backdrop-blur-sm">
          <Sparkles size={12} />
          Parallel encoding preserves discrete source information
        </div>
      </div>
    </div>
  );
};