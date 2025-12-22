import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Ear, Sparkles, Activity, Zap, Waves } from 'lucide-react';

// --- STYLING CONSTANTS (Matched to DuoTok) ---

const COLORS = {
  teal: '#0d9488',   // Ear Lab Brand
  slate: '#64748b',  // Structure
  amber: '#f59e0b',  // Latent
  rose: '#e11d48',   // Adversarial
  indigo: '#6366f1', // Spectral
  cyan: '#06b6d4',   // Phase
};

// --- SHARED VISUAL PRIMITIVES (DuoTok Style) ---

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

// 2. ResNet Stack (Encoder/Decoder) - Adapted from DuoTok TransformerStack
const ResNetStack: React.FC<{ label: string, reverse?: boolean }> = ({ label, reverse }) => {
  const layers = 5; 
  return (
    <div className="relative flex flex-col items-center justify-center w-24 h-20 bg-white rounded-xl border border-gray-200 shadow-xl group overflow-hidden shrink-0">
       
       {/* Background Pulse */}
       <motion.div 
         className="absolute inset-0 bg-gradient-to-tr from-teal-50/0 via-teal-50/50 to-teal-50/0"
         animate={{ opacity: [0, 1, 0] }}
         transition={{ duration: 3, repeat: Infinity }}
       />

       <div className="flex flex-col gap-[3px] mb-2 z-10 w-full px-4 items-center justify-center h-full pt-2">
         {Array.from({ length: layers }).map((_, i) => {
           // Visualizing downsampling (funnel) or upsampling (pyramid)
           const widthPerc = reverse 
             ? 40 + (i * 15) // Decoder: small to big
             : 100 - (i * 15); // Encoder: big to small
             
           return (
             <motion.div 
                key={i} 
                className="h-1.5 rounded-sm bg-slate-100 border border-slate-200"
                style={{ width: `${widthPerc}%` }}
                animate={{ 
                  backgroundColor: ['#f1f5f9', '#94a3b8', '#f1f5f9'],
                  borderColor: ['#e2e8f0', '#cbd5e1', '#e2e8f0']
                }}
                transition={{ 
                  duration: 1.5, 
                  delay: reverse ? i * 0.2 : (layers - i) * 0.2, 
                  repeat: Infinity 
                }}
             />
           );
         })}
       </div>
       <div className="absolute bottom-0 w-full text-[8px] font-bold text-slate-500 uppercase tracking-widest text-center py-1 bg-white/90 border-t border-gray-100 z-10">
          {label}
       </div>
    </div>
  );
};

// 3. Variational Block (Latent Z) - Adapted from DuoTok SimVQ
const VariationalBlock: React.FC = () => (
  <div className="w-14 h-14 bg-white rounded-xl border-2 border-amber-200 flex items-center justify-center relative shadow-md shrink-0 z-10">
    {/* Gaussian Distribution Animation */}
    <div className="relative w-8 h-8 grid grid-cols-2 gap-1">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="rounded-full bg-amber-300"
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
        />
      ))}
    </div>
    {/* Label */}
    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-bold text-amber-700 whitespace-nowrap tracking-wider bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-100">
      Z ~ N(μ,σ)
    </div>
  </div>
);

// 4. Waveform Block (Input/Output) - Adapted from DuoTok Input
const WaveformBlock: React.FC<{ label: string, color: string }> = ({ label, color }) => {
  return (
    <div className="flex flex-col items-center gap-2 shrink-0 w-24">
      <div 
        className="p-1 rounded-xl w-full shadow-sm border-2 bg-white"
        style={{ borderColor: `${color}33` }} // 20% opacity hex
      >
        <div className="h-9 w-full bg-gray-50 rounded border border-gray-100 flex items-center justify-center gap-[1px] px-1 overflow-hidden">
          {Array.from({ length: 16 }).map((_, i) => (
             <motion.div
               key={i}
               className="w-1 rounded-full"
               style={{ backgroundColor: color }}
               animate={{ height: ['20%', '80%', '20%'] }}
               transition={{
                 duration: 0.6 + Math.random() * 0.4,
                 repeat: Infinity,
                 delay: i * 0.05,
                 ease: "easeInOut"
               }}
             />
          ))}
        </div>
      </div>
      <div className="text-[9px] font-bold text-gray-400 tracking-widest uppercase">{label}</div>
    </div>
  );
};

// --- SPECIFIC LOSS VISUALIZERS (DuoTok "Task" Style) ---

const MiniCard: React.FC<{ children: React.ReactNode, label: string }> = ({ children, label }) => (
  <div className="flex items-center gap-3 group">
    <div className="w-20 h-10 bg-gray-900 rounded-lg border border-gray-700 overflow-hidden relative shadow-md flex items-center justify-center">
      {children}
      <div className="absolute bottom-0.5 right-1 text-[6px] text-white/50 font-mono font-bold tracking-wider uppercase">{label}</div>
    </div>
    <span className="text-[9px] font-bold text-gray-400 group-hover:text-gray-600 transition-colors uppercase tracking-wide">
      {label}
    </span>
  </div>
);

const DiscriminatorViz: React.FC = () => (
  <MiniCard label="Adv. Loss">
     <div className="flex gap-1">
        <motion.div 
          className="w-3 h-3 rounded-sm bg-rose-500"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
        <motion.div 
          className="w-3 h-3 rounded-sm bg-green-500"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.5, delay: 0.25, repeat: Infinity }}
        />
     </div>
  </MiniCard>
);

const SpectralViz: React.FC = () => (
  <MiniCard label="K-Weight">
    <div className="relative w-full h-full p-1 flex items-end justify-between gap-[1px]">
       {/* Bars */}
       {Array.from({ length: 8 }).map((_, i) => (
         <motion.div 
           key={i}
           className="w-1.5 bg-indigo-500 rounded-t-[1px]"
           animate={{ height: ['20%', '80%', '30%'] }}
           transition={{ duration: 1.2, delay: i * 0.1, repeat: Infinity }}
         />
       ))}
       {/* Curve */}
       <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.path 
            d="M0,35 Q40,5 80,35"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
       </svg>
    </div>
  </MiniCard>
);

const PhaseViz: React.FC = () => (
  <MiniCard label="Phase">
     <div className="relative w-full h-full flex items-center justify-center">
        <svg className="w-full h-full p-1" viewBox="0 0 100 40">
           <motion.path 
             d="M0,20 Q25,5 50,20 T100,20"
             fill="none"
             stroke={COLORS.cyan}
             strokeWidth="2"
             strokeDasharray="4 2"
             animate={{ x: [-5, 0] }}
             transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
           />
            <motion.path 
             d="M0,20 Q25,5 50,20 T100,20"
             fill="none"
             stroke="white"
             strokeWidth="2"
             strokeOpacity="0.5"
             animate={{ x: [5, 0] }}
             transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
           />
        </svg>
     </div>
  </MiniCard>
);

// --- MAIN COMPONENT ---

export const EarVaeViz: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-4 relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05] bg-[size:20px_20px] bg-[radial-gradient(#0d9488_1px,transparent_1px)] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full overflow-x-auto custom-scrollbar px-2 pb-2 z-10 flex justify-center">
         <div className="flex items-center justify-center relative min-w-max mx-auto py-8">
           
             {/* Fig 1 Architecture Flow */}
             <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-1 scale-90 md:scale-100 origin-center"
             >
                
                {/* 1. INPUT */}
                <WaveformBlock label="Raw Audio" color={COLORS.teal} />
                
                <FlowLine />
                
                {/* 2. ENCODER */}
                <ResNetStack label="ResNet Enc" />

                <FlowLine width="16px" />

                {/* 3. LATENT Z */}
                <VariationalBlock />

                <FlowLine width="16px" />

                {/* 4. DECODER */}
                <ResNetStack label="ResNet Dec" reverse />

                <FlowLine width="30px" />

                {/* 5. OUTPUT & SUPERVISION */}
                <div className="flex flex-col gap-4 border-l-2 border-teal-50 pl-5 relative">
                    {/* Visual Bracket */}
                   <div className="absolute top-[30px] bottom-[30px] left-[-2px] w-2 border-y-2 border-l-2 border-teal-50 rounded-l-lg" />

                   {/* Output */}
                   <div className="flex items-center gap-3">
                      <WaveformBlock label="Reconstruction" color={COLORS.teal} />
                   </div>

                   {/* Supervision Stack (Fig 1 Losses) */}
                   <div className="flex flex-col gap-1.5">
                      <DiscriminatorViz />
                      <SpectralViz />
                      <PhaseViz />
                   </div>
                </div>

             </motion.div>
         </div>
      </div>
      
      {/* Footer Caption */}
      <div className="mt-2 text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-50/90 border border-teal-100 rounded-full text-xs font-medium text-teal-700 shadow-sm backdrop-blur-sm">
          <Ear size={12} />
          εar-VAE Architecture: Perceptually-driven high-fidelity reconstruction
        </div>
      </div>
    </div>
  );
};