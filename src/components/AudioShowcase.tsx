import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Disc, Music4 } from 'lucide-react';

// --- DATA STRUCTURE ---

interface SongFile {
  id: string;
  name: string; 
  title: string; 
  language: 'Chinese' | 'English';
  paths: {
    cover: string; 
    lyrics: string; 
    audio: string; 
  };
  fallback: {
    cover: string;
    audio: string;
  }
}

// Helper to generate paths automatically - CHANGED TO RELATIVE PATHS
const generateSong = (id: string, name: string, title: string, lang: 'Chinese' | 'English', fallbackId: number): SongFile => ({
  id,
  name,
  title,
  language: lang,
  paths: {
    // 使用 ./ 确保从当前目录开始查找，适配 GitHub Pages 子目录
    cover: `./song_corpus/picture/${id}.${name}.png`,
    lyrics: `./song_corpus/lyrics/${id}.${name}.txt`,
    audio: `./song_corpus/wav/${id}.${name}.mp3`,
  },
  fallback: {
    cover: `https://picsum.photos/id/${fallbackId}/400/300`,
    audio: `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(parseInt(id) % 16) + 1}.mp3`
  }
});

const SONG_CORPUS: SongFile[] = [
  generateSong("1", "歌谣", "歌谣", "Chinese", 10),
  generateSong("2", "有光的地方", "有光的地方", "Chinese", 11),
  generateSong("3", "时间水滴", "时间水滴", "Chinese", 12),
  generateSong("4", "回忆", "回忆", "Chinese", 13),
  generateSong("5", "雨停之前", "雨停之前", "Chinese", 14),
  generateSong("10", "After the rain", "After the rain", "English", 15),
  generateSong("20", "Locked", "Locked", "English", 16),
  generateSong("30", "Raindrop", "Raindrop", "English", 17),
  generateSong("40", "Moonlight", "Moonlight", "English", 18),
  generateSong("50", "AI for good", "AI for good", "English", 19),
];

export const AudioShowcase: React.FC = () => {
  const CARD_WIDTH = 180; 
  const CARD_HEIGHT = 135; 
  const GAP = 40;
  const ITEM_FULL_WIDTH = CARD_WIDTH + GAP;
  const TOTAL_ITEMS = SONG_CORPUS.length;
  const LOOP_WIDTH = TOTAL_ITEMS * ITEM_FULL_WIDTH;
  
  const [scrollX, setScrollX] = useState(0); 
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScroll, setStartScroll] = useState(0);
  
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0); 

  const isPlayingRef = useRef(false); 
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    isPlayingRef.current = !!playingId;
  }, [playingId]);

  useEffect(() => {
    if (!playingId) return;

    const index = SONG_CORPUS.findIndex(s => s.id === playingId);
    if (index === -1) return;

    const basePos = index * ITEM_FULL_WIDTH;
    let currentPos = (basePos + scrollX) % LOOP_WIDTH;
    if (currentPos < 0) currentPos += LOOP_WIDTH;
    if (currentPos > LOOP_WIDTH / 2) currentPos -= LOOP_WIDTH;

    if (Math.abs(currentPos) > 450) {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
        setPlayingId(null);
        setProgress(0);
    }
  }, [scrollX, playingId]);

  const requestRef = useRef<number>(null);
  const lastTimeRef = useRef<number>(null);
  const AUTO_SPEED = 0.8; 

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const handlePlay = async (song: SongFile) => {
    if (playingId === song.id) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setPlayingId(null);
      setProgress(0);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setPlayingId(song.id); 
    setProgress(0);

    const audio = new Audio();
    audioRef.current = audio;

    let usedFallback = false;

    const playAudio = async () => {
        try {
            await audio.play();
        } catch (err) {
            console.warn("Autoplay blocked or playback error:", err);
            if (audioRef.current === audio && !usedFallback) {
                 setPlayingId(null); 
                 setProgress(0);
            }
        }
    };

    audio.ontimeupdate = () => {
      if (audioRef.current === audio && audio.duration) {
        setProgress(audio.currentTime / audio.duration);
      }
    };

    audio.onerror = () => {
        if (!usedFallback) {
            console.warn(`Local file ${song.paths.audio} failed. Switching to fallback.`);
            usedFallback = true;
            audio.src = song.fallback.audio;
            audio.load();
            playAudio();
        } else {
            setPlayingId(null);
            setProgress(0);
        }
    };

    audio.onended = () => {
      if (audioRef.current === audio) {
        setPlayingId(null);
        setProgress(0);
      }
    };

    audio.src = song.paths.audio;
    playAudio();
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>, songId: string) => {
    e.stopPropagation();
    if (playingId !== songId || !audioRef.current || !audioRef.current.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickedProgress = Math.max(0, Math.min(1, x / rect.width));
    
    audioRef.current.currentTime = clickedProgress * audioRef.current.duration;
    setProgress(clickedProgress);
  };

  const animate = (time: number) => {
    if (!isDragging && !isPlayingRef.current) {
      if (lastTimeRef.current !== null) {
        setScrollX(prev => prev - AUTO_SPEED);
      }
      lastTimeRef.current = time;
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [isDragging]); 

  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setStartX(clientX);
    setStartScroll(scrollX);
  };

  const onDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const delta = clientX - startX;
    setScrollX(startScroll + delta * 1.5); 
  };

  const onDragEnd = () => {
    setIsDragging(false);
    lastTimeRef.current = null;
  };

  const renderCard = (song: SongFile, index: number) => {
    const basePos = index * ITEM_FULL_WIDTH;
    let currentPos = (basePos + scrollX) % LOOP_WIDTH;
    if (currentPos < 0) currentPos += LOOP_WIDTH;
    if (currentPos > LOOP_WIDTH / 2) currentPos -= LOOP_WIDTH;

    if (Math.abs(currentPos) > 1300) return null;

    const dist = Math.abs(currentPos);
    const isCenter = dist < ITEM_FULL_WIDTH / 2;
    
    const scale = Math.max(0.85, 1 - (dist / 2000)); 
    const zIndex = Math.round(100 - (dist / 10));
    const opacity = Math.max(0, 1 - (dist / 1000));
    const blur = Math.max(0, (dist - 300) / 40);

    const rotateY = -currentPos / 25; 
    const translateZ = Math.abs(currentPos) / -5; 

    const isPlaying = playingId === song.id;

    return (
      <div
        key={song.id}
        className="absolute top-1/2 left-1/2 cursor-pointer transition-transform duration-100 ease-out will-change-transform"
        style={{
          width: CARD_WIDTH,
          height: CARD_HEIGHT + 35,
          marginLeft: -CARD_WIDTH / 2, 
          marginTop: - (CARD_HEIGHT + 35) / 2, 
          transform: `translateX(${currentPos}px) translateZ(${isPlaying ? 50 : translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
          zIndex: isPlaying ? 200 : zIndex,
          opacity: opacity,
          filter: `blur(${blur}px)`,
        }}
        onClick={() => {
            if (opacity > 0.5) handlePlay(song);
        }}
      >
        <div 
          className={`
            relative w-full h-[135px] rounded-xl overflow-hidden shadow-lg 
            transition-all duration-300 bg-gray-900
            ${isPlaying ? 'ring-2 ring-teal-400 shadow-teal-500/50' : 'ring-1 ring-black/10 hover:ring-black/30'}
          `}
        >
          <img 
            src={song.paths.cover} 
            alt={song.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src !== song.fallback.cover) {
                    target.src = song.fallback.cover;
                }
            }} 
          />
          <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors" />

          {isPlaying && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center animate-fade-in">
               <div className="w-12 h-12 bg-teal-500/90 rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                  <Pause className="text-white fill-white w-5 h-5" />
               </div>
            </div>
          )}

          {!isPlaying && (
            <div className="absolute bottom-0 w-full p-2 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-xs font-bold truncate">{song.title}</p>
              <div className="flex items-center justify-between mt-1">
                 <span className="text-[9px] text-gray-300 uppercase tracking-wider">{song.language}</span>
                 {isCenter && <Play size={12} className="text-teal-400 fill-teal-400" />}
              </div>
            </div>
          )}
        </div>

        <div 
          className={`
            mt-3 w-full h-4 relative flex items-center transition-all duration-300
            ${isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-30'}
          `}
          onClick={(e) => handleSeek(e, song.id)}
        >
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden shadow-inner relative">
              <motion.div 
                className="h-full bg-teal-500 rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: isPlaying ? `${progress * 100}%` : 0 }}
                transition={{ type: "spring", bounce: 0, duration: 0.1 }}
              >
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/40 blur-[2px]" />
              </motion.div>
          </div>

          {isPlaying && (
            <motion.div 
                className="absolute w-3.5 h-3.5 bg-white border-2 border-teal-500 rounded-full shadow-md z-10"
                style={{ left: `calc(${progress * 100}% - 7px)` }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="relative w-full py-24 bg-white overflow-hidden select-none border-t border-gray-100">
       <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col items-center relative z-10">
          <div className="flex items-center space-x-2 text-teal-600 mb-2">
            <Disc className="w-5 h-5 animate-spin-slow" />
            <span className="font-mono text-xs tracking-[0.2em] font-bold uppercase">Interactive Showroom</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center">
            Demo Gallery
          </h2>
          <p className="text-gray-400 text-sm mt-2 font-medium">Click to play & scrub progress</p>
       </div>

       <div 
         className="relative h-[280px] w-full perspective-container cursor-grab active:cursor-grabbing overflow-hidden"
         style={{ perspective: '800px' }}
         onMouseDown={onDragStart}
         onMouseMove={onDragMove}
         onMouseUp={onDragEnd}
         onMouseLeave={onDragEnd}
         onTouchStart={onDragStart}
         onTouchMove={onDragMove}
         onTouchEnd={onDragEnd}
       >
          <div className="absolute inset-0 preserve-3d">
             {SONG_CORPUS.map((song, i) => renderCard(song, i))}
          </div>

          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />
       </div>

       <div className="flex justify-center items-center gap-6 text-gray-500 text-xs font-mono mt-8">
          <div className="flex items-center gap-2">
             <Music4 size={10} />
             <span>Audio Assets Loaded</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            <span>Interactive Seeking Enabled</span>
          </div>
       </div>
    </section>
  );
};