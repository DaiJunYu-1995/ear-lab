import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Music, Activity, Cpu } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-white">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 z-0 opacity-10">
         {/* Simulating a spectrogram/waveform look with CSS grid */}
         <div className="grid grid-cols-12 gap-2 h-full w-full p-4 transform skew-y-12 scale-150">
            {[...Array(48)].map((_, i) => (
               <motion.div
                 key={i}
                 className="bg-black rounded-full"
                 animate={{
                   height: ['20%', '80%', '40%', '90%', '20%'],
                   opacity: [0.2, 0.5, 0.2]
                 }}
                 transition={{
                   duration: Math.random() * 2 + 1.5,
                   repeat: Infinity,
                   ease: "easeInOut",
                   delay: Math.random() * 2
                 }}
               />
            ))}
         </div>
      </div>

      <div className="z-10 text-center px-4 max-w-5xl mx-auto mt-16">
        {/* Animated Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 mb-2">
            Epsilon Acoustic
          </h1>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
            Revolution Lab
          </h1>
        </motion.div>

        {/* Slogan */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-6 flex justify-center items-center space-x-3"
        >
          <div className="h-px w-12 bg-gray-400"></div>
          <h2 className="text-2xl md:text-3xl font-light text-gray-600 uppercase tracking-widest">
            AI for Acoustic Intelligence & Creative Resonance
          </h2>
          <div className="h-px w-12 bg-gray-400"></div>
        </motion.div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8 max-w-3xl mx-auto"
        >
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-sans">
            Our vision is to leverage Artificial Intelligence to ignite an 
            <span className="font-bold text-teal-700"> acoustic revolution</span>. 
            By unifying speech and music, understanding and generation, we aim to build 
            future-ready models that blend technical precision with boundless creativity.
          </p>
        </motion.div>

        {/* Tech Icons */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1.5 }}
           className="mt-12 flex justify-center space-x-8 text-gray-400"
        >
            <Music className="w-8 h-8 hover:text-teal-600 transition-colors" />
            <Activity className="w-8 h-8 hover:text-teal-600 transition-colors" />
            <Cpu className="w-8 h-8 hover:text-teal-600 transition-colors" />
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-10"
      >
        <a href="#introduction" className="text-gray-400 hover:text-teal-600">
          <ArrowDown className="w-8 h-8" />
        </a>
      </motion.div>
    </section>
  );
};