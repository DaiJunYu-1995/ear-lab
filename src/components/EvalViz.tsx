import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, ListOrdered, Shuffle, Activity } from 'lucide-react';

// --- STYLING CONSTANTS ---

const COLORS = {
  teal: '#0d9488',   // Ear Lab Brand (Ours)
  gray: '#94a3b8',   // Baseline
  mix: '#6366f1',    // Mixup
  accent: '#f59e0b', // Highlight
};

// --- SUB-COMPONENTS ---

// 1. Connection Line
const FlowLine: React.FC<{ width?: string }> = ({ width = "24px" }) => (
  <div className="relative flex items-center justify-center h-[2px]" style={{ width }}>
     <div className="bg-gray-200 rounded-full h-full w-full" />
     <motion.div 
       className="absolute bg-teal-500 rounded-full h-full w-1/3"
       animate={{ x: [-10, 30], opacity: [0, 1, 0] }}
       transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
     />
  </div>
);

// 2. Waveform Source
const WaveformSource: React.FC<{ color: string, label: string, delay?: number }> = ({ color, label, delay = 0 }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="w-16 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center gap-[2px] shadow-sm overflow-hidden p-1">
       {Array.from({ length: 8 }).map((_, i) => (
         <motion.div
           key={i}
           className="w-1 rounded-full"
           style={{ backgroundColor: color }}
           animate={{ height: ['20%', '80%', '20%'] }}
           transition={{ duration: 0.8, delay: i * 0.1 + delay, repeat: Infinity }}
         />
       ))}
    </div>
    <span className="text-[8px] font-bold text-gray-400 uppercase">{label}</span>
  </div>
);

// 3. C-Mixup Block (Mixing Animation)
const MixupBlock: React.FC = () => (
  <div className="w-20 h-20 bg-white rounded-xl border-2 border-indigo-100 flex flex-col items-center justify-center relative shadow-md shrink-0 z-10 overflow-hidden">
     {/* Background Grid */}
     <div className="absolute inset-0 opacity-10 bg-[size:8px_8px] bg-[radial-gradient(#6366f1_1px,transparent_1px)]" />
     
     <div className="relative flex items-center justify-center w-full h-full">
        {/* Mixing Particles */}
        <motion.div 
          className="absolute w-6 h-6 rounded-full bg-teal-400/50 blur-sm"
          animate={{ x: [-10, 10, -10], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div 
          className="absolute w-6 h-6 rounded-full bg-rose-400/50 blur-sm"
          animate={{ x: [10, -10, 10], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <Shuffle className="text-indigo-600 w-6 h-6 z-10 relative" />
     </div>
     
     <div className="absolute bottom-0 w-full text-[8px] font-bold text-indigo-600 uppercase tracking-widest text-center py-1 bg-indigo-50/90">
       C-Mixup
     </div>
  </div>
);

// 4. Feature Extractor
const ExtractorBlock: React.FC = () => (
    <div className="flex flex-col items-center justify-center w-16 h-16 bg-white rounded-xl border border-gray-200 shadow-lg relative">
        <div className="flex gap-1 items-end h-8">
            <motion.div className="w-2 bg-slate-300 rounded-sm" animate={{ height: [10, 20, 10] }} transition={{ duration: 1.5, repeat: Infinity }} />
            <motion.div className="w-2 bg-slate-400 rounded-sm" animate={{ height: [15, 25, 15] }} transition={{ duration: 1.5, delay: 0.2, repeat: Infinity }} />
            <motion.div className="w-2 bg-slate-500 rounded-sm" animate={{ height: [8, 18, 8] }} transition={{ duration: 1.5, delay: 0.4, repeat: Infinity }} />
        </div>
        <div className="text-[7px] font-bold text-slate-500 mt-1">Multi-Scale</div>
    </div>
);

// 5. RESULTS: Radar Chart (Superiority)
const RadarChart: React.FC = () => {
    return (
        <div className="w-32 h-32 bg-white rounded-2xl border border-gray-100 shadow-md relative flex items-center justify-center">
            <div className="absolute top-2 left-2 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                <span className="text-[7px] text-gray-500 font-bold">Ours</span>
            </div>
            <div className="absolute top-4 left-2 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                <span className="text-[7px] text-gray-400 font-bold">Baseline</span>
            </div>

            {/* Axes */}
            <svg className="w-24 h-24 overflow-visible">
                {/* Background Web */}
                {[20, 40].map((r) => (
                    <circle key={r} cx="48" cy="48" r={r} fill="none" stroke="#f1f5f9" strokeWidth="1" />
                ))}
                {[0, 72, 144, 216, 288].map((deg) => (
                    <line 
                        key={deg} 
                        x1="48" y1="48" 
                        x2={48 + 40 * Math.cos(deg * Math.PI / 180)} 
                        y2={48 + 40 * Math.sin(deg * Math.PI / 180)} 
                        stroke="#e2e8f0" strokeWidth="1" 
                    />
                ))}

                {/* Baseline Shape (Small) */}
                <motion.path 
                    d="M48,28 L68,48 L58,78 L38,78 L28,48 Z" // Approximate small pentagon
                    fill={COLORS.gray}
                    fillOpacity="0.2"
                    stroke={COLORS.gray}
                    strokeWidth="1.5"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Ours Shape (Large - Superior) */}
                <motion.path 
                    d="M48,10 L84,40 L70,84 L26,84 L12,40 Z" // Large pentagon covering more area
                    fill={COLORS.teal}
                    fillOpacity="0.3"
                    stroke={COLORS.teal}
                    strokeWidth="2"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
            </svg>
            <div className="absolute -bottom-2 text-[8px] font-bold text-gray-400 uppercase tracking-widest bg-white px-1">Performance</div>
        </div>
    );
};

// 6. RESULTS: Ranking List (Consistency)
const RankingList: React.FC = () => {
    // 1=Teal(High), 2=Blue, 3=Indigo, 4=Gray(Low)
    const [order, setOrder] = useState([3, 1, 4, 2]); 

    useEffect(() => {
        const interval = setInterval(() => {
            // Toggle between shuffled and sorted
            setOrder(prev => prev[0] === 1 ? [3, 4, 1, 2] : [1, 2, 3, 4]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const colors = ['#0d9488', '#0ea5e9', '#6366f1', '#94a3b8'];
    const labels = ['S+', 'A', 'B', 'C'];

    return (
        <div className="w-24 h-32 bg-white rounded-2xl border border-gray-100 shadow-md p-2 flex flex-col gap-1.5 relative overflow-hidden">
            <div className="text-[7px] text-gray-400 font-bold uppercase tracking-wide text-center mb-0.5">Ranking</div>
            {order.map((id, index) => (
                <motion.div
                    key={id}
                    layout
                    className="w-full h-5 rounded flex items-center px-2 justify-between"
                    style={{ backgroundColor: `${colors[id-1]}20` }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    <span className="text-[8px] font-bold" style={{ color: colors[id-1] }}>Song {id}</span>
                    <span className="text-[8px] font-mono font-bold" style={{ color: colors[id-1] }}>{labels[id-1]}</span>
                </motion.div>
            ))}
             {/* Checkmark overlay when sorted */}
            {order[0] === 1 && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px]"
                >
                    <div className="bg-teal-500 text-white rounded-full p-1 shadow-sm">
                        <TrendingUp size={16} />
                    </div>
                </motion.div>
            )}
        </div>
    );
};


// --- MAIN COMPONENT ---

export const EvalViz: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-4 relative overflow-hidden">
      
      {/* Background Dots */}
      <div className="absolute inset-0 opacity-[0.05] bg-[size:20px_20px] bg-[radial-gradient(#0d9488_1px,transparent_1px)] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full overflow-x-auto custom-scrollbar px-2 pb-2 z-10 flex justify-center">
         <div className="flex items-center justify-center relative min-w-max mx-auto py-6 gap-2">
           
             {/* PIPELINE SECTION */}
             <div className="flex flex-col gap-6 mr-4">
                 <div className="flex items-center gap-2">
                     <div className="flex flex-col gap-2">
                        <WaveformSource color="#0d9488" label="Input A" />
                        <WaveformSource color="#e11d48" label="Input B" delay={0.5} />
                     </div>
                     
                     <div className="flex flex-col h-20 justify-center">
                        <div className="w-4 h-[2px] bg-gray-200 rotate-45 origin-left translate-y-[8px]" />
                        <div className="w-4 h-[2px] bg-gray-200 -rotate-45 origin-left translate-y-[-8px]" />
                     </div>

                     <MixupBlock />
                     
                     <FlowLine width="20px" />
                     
                     <ExtractorBlock />

                     <FlowLine width="20px" />
                 </div>
             </div>

             {/* SUPERIORITY DASHBOARD SECTION */}
             <motion.div 
                className="flex gap-3 p-3 bg-gray-50/80 rounded-3xl border border-gray-100 shadow-inner"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
             >
                <div className="flex flex-col items-center gap-2">
                    <RadarChart />
                    <div className="flex items-center gap-1 text-[8px] text-teal-600 font-bold bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                        <Activity size={8} /> Multi-Dim SOTA
                    </div>
                </div>
                
                <div className="w-[1px] bg-gray-200 h-32 self-center" />

                <div className="flex flex-col items-center gap-2">
                    <RankingList />
                    <div className="flex items-center gap-1 text-[8px] text-teal-600 font-bold bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                        <ListOrdered size={8} /> Consistent Rank
                    </div>
                </div>
             </motion.div>

         </div>
      </div>
      
      {/* Footer Caption */}
      <div className="mt-2 text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50/90 border border-indigo-100 rounded-full text-xs font-medium text-indigo-700 shadow-sm backdrop-blur-sm">
          <BarChart3 size={12} />
          Effective Evaluation: Superior aesthetic prediction & ranking accuracy
        </div>
      </div>
    </div>
  );
};