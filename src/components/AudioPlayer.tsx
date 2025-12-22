import React, { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  url: string;
  title: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ url, title }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Pause all other audios (optional UX improvement)
        document.querySelectorAll('audio').forEach(el => el.pause());
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex items-center bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-teal-400 transition-all duration-300">
      <button 
        onClick={togglePlay}
        className="flex-shrink-0 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-teal-600 transition-colors focus:outline-none"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-1" />}
      </button>
      <div className="ml-4 flex-grow overflow-hidden">
        <h4 className="text-sm font-bold text-gray-800 truncate">{title}</h4>
        <div className="w-full bg-gray-200 h-1 mt-2 rounded-full overflow-hidden">
           {/* Simple animation when playing */}
           <div className={`h-full bg-teal-500 transition-all duration-300 ${isPlaying ? 'w-full animate-pulse' : 'w-0'}`}></div>
        </div>
      </div>
      <audio 
        ref={audioRef} 
        src={url} 
        onEnded={() => setIsPlaying(false)} 
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
    </div>
  );
};