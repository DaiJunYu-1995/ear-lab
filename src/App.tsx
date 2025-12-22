import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AudioShowcase } from './components/AudioShowcase';
import { DuoTokViz } from './components/DuoTokViz';
import { EarVaeViz } from './components/EarVaeViz';
import { EvalViz } from './components/EvalViz';
import { SpotlightCard } from './components/SpotlightCard';
import { ExternalLink, FileText, Database, Wand2, Box } from 'lucide-react';
import { Paper, Member, InnovationPoint } from './types';

// --- DATA ---

const INNOVATION_POINTS: InnovationPoint[] = [
  {
    title: "Semantic & Acoustic Unification",
    description: "Bridging the gap between semantic understanding and high-fidelity acoustic generation through novel XY-Tokenizer architectures, enabling source-aware tokenization.",
    icon: <Database className="w-6 h-6 text-teal-600" />
  },
  {
    title: "DiT-GAN Synthesis",
    description: "Pioneering the combination of Diffusion Transformers (DiT) with Generative Adversarial Networks to achieve state-of-the-art generation speed and quality.",
    icon: <Wand2 className="w-6 h-6 text-teal-600" />
  },
  {
    title: "High-Fidelity Reconstruction",
    description: "Redefining audio Variational Autoencoders (VAEs) with perceptually driven loss functions and phase coherence for studio-quality reconstruction.",
    icon: <Box className="w-6 h-6 text-teal-600" />
  }
];

const PAPERS: Paper[] = [
  {
    id: "paper-duo-tok",
    title: "DUO-TOK: Dual-Track Semantic Music Tokenizer for Vocal-Accompaniment Generation",
    authors: "Rui Lin*, Zhiyue Wu*, Jiahe Lei, Kangdi Wang, Weixiong Chen, Junyu Dai, Tao Jiang",
    abstract: "Duo-Tok is a source-aware dual-codebook tokenizer targeting the tension between reconstruction quality and LM learnability. It features a four-stage pipeline: stabilized factorization, frozen encoder with dual codebooks, and latent diffusion decoding. It achieves superior music-tagging AP and low perplexity at 0.75 kbps.",
    link: "https://eps-acoustic-revolution-lab.github.io/DUO_TOK/",
    pdfLink: "https://arxiv.org/pdf/2511.20224", 
    image: "https://picsum.photos/id/101/600/400", // Conceptual placeholder
    tags: ["Music Generation", "Tokenizer", "Dual-Track"]
  },
  {
    id: "paper-ear-vae",
    title: "BACK TO EAR: Perceptually Driven High Fidelity Music Reconstruction",
    authors: "Kangdi Wang*, Zhiyue Wu*, Dinghao Zhou, Rui Lin, Junyu Dai, Tao Jiang",
    abstract: "εar-VAE optimizes the VAE training paradigm for high-fidelity music. It introduces K-weighting perceptual filters, novel phase losses (Correlation Loss, IF & GD supervision), and a unique MSLR spectral supervision strategy. It outperforms leading open-source models in reconstructing high-frequency harmonics and spatial characteristics.",
    link: "https://eps-acoustic-revolution-lab.github.io/EAR_VAE/",
    pdfLink: "https://arxiv.org/pdf/2509.14912",
    image: "https://picsum.photos/id/160/600/400",
    tags: ["VAE", "High Fidelity", "Phase Coherence"]
  },
  {
    id: "paper-eval",
    title: "Multidimensional Music Aesthetic Evaluation via Semantically Consistent C-Mixup Augmentation",
    authors: "Shuyang Liu*, Yuan Jin*, Rui Lin, Shizhe Chen, Junyu Dai, Tao Jiang",
    abstract: "A robust music aesthetic evaluation framework combining multi-source multi-scale feature extraction and hierarchical audio augmentation. Validated on the ICASSP 2026 SongEval benchmark, it employs a hybrid regression-and-ranking objective to accurately score aesthetic dimensions and identify top-tier songs under limited labeled data.",
    link: undefined, // No demo page
    pdfLink: "https://arxiv.org/pdf/2511.18869",
    image: "https://picsum.photos/id/453/600/400",
    tags: ["Evaluation", "Aesthetics", "Ranking"]
  }
];

// Reorganized Team Data
const LEADS: Member[] = [
  { name: "Junyu Dai", role: "Founder", description: "Driving acoustic innovation.", avatar: "https://picsum.photos/seed/junyu/200" },
  { name: "Tao Jiang", role: "CTO & CEO", description: "Visionary leadership in AI audio.", avatar: "https://picsum.photos/seed/tao/200" },
];

const CORE_MEMBERS: Member[] = [
  { name: "Kangdi Wang", role: "Core Researcher", description: "High-fidelity audio synthesis.", avatar: "https://picsum.photos/seed/kangdi/200" },
  { name: "Rui Lin", role: "Core Researcher", description: "Core contributor to Duo-Tok.", avatar: "https://picsum.photos/seed/rui/200" },
  { name: "Yuan Jin", role: "Core Researcher", description: "Music aesthetic evaluation.", avatar: "https://picsum.photos/seed/yuan/200" },
  { name: "Zhiyue Wu", role: "Core Researcher", description: "Specialist in VAE & reconstruction.", avatar: "https://picsum.photos/seed/zhiyue/200" },
];

function App() {
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Ensure animation plays only once
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      <Navbar />
      <Hero />

      {/* Introduction */}
      <section id="introduction" className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="reveal reveal-blur">
            <h3 className="text-3xl font-bold mb-8">Who We Are</h3>
            <p className="text-xl text-gray-700 leading-relaxed">
              We are a group of deep learning practitioners and music enthusiasts from China. 
              United by a passion for cutting-edge technology, we are dedicated to pushing the boundaries of 
              <span className="font-semibold text-teal-700"> Semantic & Acoustic Audio Modeling</span>. 
              Our work spans the unification of understanding and generation, high-fidelity reconstruction, 
              and advanced generative architectures like DiT-GAN.
            </p>
          </div>
        </div>
      </section>

      {/* Brainstorm / Innovation */}
      <section id="innovation" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-16 reveal reveal-fade-up">
            <h3 className="text-4xl font-bold mb-4">Brainstorm & Innovation</h3>
            <p className="text-gray-500">Core technologies driving our research</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {INNOVATION_POINTS.map((point, index) => (
              <div 
                key={index} 
                className={`p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 bg-white group reveal reveal-fade-up delay-${(index + 1) * 100}`}
              >
                <div className="mb-6 p-4 bg-teal-50 rounded-full w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {point.icon}
                </div>
                <h4 className="text-2xl font-bold mb-3 text-gray-900">{point.title}</h4>
                <p className="text-gray-600 leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Papers */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12 reveal reveal-slide">
             <h3 className="text-4xl font-bold text-gray-900">Selected Publications</h3>
             <span className="text-gray-400 hidden md:inline-block">Research Highlights</span>
          </div>

          <div className="space-y-16">
            {PAPERS.map((paper, idx) => {
              const isWideCard = paper.id === 'paper-duo-tok' || paper.id === 'paper-ear-vae' || paper.id === 'paper-eval';
              
              // Custom colors for spotlight effect
              let spotlightColor = "rgba(13, 148, 136, 0.15)"; // Default teal-ish
              if (paper.id === 'paper-duo-tok') {
                spotlightColor = "rgba(6, 182, 212, 0.2)"; // Cyan
              } else if (paper.id === 'paper-ear-vae') {
                spotlightColor = "rgba(20, 184, 166, 0.2)"; // Teal
              } else if (paper.id === 'paper-eval') {
                 spotlightColor = "rgba(99, 102, 241, 0.2)"; // Indigo
              }

              // Card Background Styles
              let cardStyle = "bg-white border-gray-200";
              if (paper.id === 'paper-duo-tok') {
                cardStyle = "bg-gradient-to-br from-white via-cyan-50/20 to-blue-50/30 border-blue-100";
              } else if (paper.id === 'paper-ear-vae') {
                cardStyle = "bg-gradient-to-br from-white via-teal-50/20 to-emerald-50/30 border-teal-100";
              } else if (paper.id === 'paper-eval') {
                 cardStyle = "bg-gradient-to-br from-white via-indigo-50/20 to-purple-50/30 border-indigo-100";
              }

              return (
                <SpotlightCard
                  key={paper.id}
                  id={paper.id}
                  className={`group ${cardStyle} rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 reveal reveal-fade-up bg-white`}
                  spotlightColor={spotlightColor}
                >
                  <div className="grid md:grid-cols-12 gap-0 relative z-10">
                    {/* Image/Viz Side */}
                    <div className={`relative ${isWideCard ? 'md:col-span-7 min-h-[400px] md:h-auto' : 'md:col-span-5 h-64 md:h-auto'} overflow-hidden ${idx % 2 === 1 ? 'md:order-last' : ''}`}>
                      {paper.id === 'paper-duo-tok' ? (
                        <DuoTokViz />
                      ) : paper.id === 'paper-ear-vae' ? (
                        <EarVaeViz />
                      ) : paper.id === 'paper-eval' ? (
                        <EvalViz />
                      ) : (
                        <div className="w-full h-full bg-transparent relative">
                          <div className="absolute inset-0 bg-teal-900/10 group-hover:bg-transparent transition-colors z-10" />
                          <img 
                            src={paper.image} 
                            alt={paper.title} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                          />
                        </div>
                      )}
                    </div>

                    {/* Content Side */}
                    <div className={`${isWideCard ? 'md:col-span-5' : 'md:col-span-7'} p-8 md:p-12 flex flex-col justify-center`}>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {paper.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-white/60 backdrop-blur-sm text-teal-700 text-xs font-bold uppercase tracking-wider rounded-full border border-teal-100/50">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-teal-800 transition-colors">
                        {paper.title}
                      </h2>
                      <p className="text-sm font-mono text-gray-500 mb-6">{paper.authors}</p>
                      <p className="text-gray-600 mb-8 leading-relaxed">
                        {paper.abstract}
                      </p>
                      
                      <div className="flex items-center space-x-6">
                        {paper.link && (
                          <a href={paper.link} target="_blank" rel="noopener noreferrer" className="flex items-center text-teal-700 font-bold hover:underline">
                            <ExternalLink className="w-4 h-4 mr-2" /> Demo Page
                          </a>
                        )}
                        
                        <a href={paper.pdfLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 font-medium hover:text-black transition-colors">
                          <FileText className="w-4 h-4 mr-2" /> PDF
                        </a>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demos (New 3D Carousel) */}
      <section id="demos">
        <AudioShowcase />
      </section>

      {/* Members */}
      <section id="members" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal reveal-fade-up">
            <h3 className="text-4xl font-bold mb-4">Our Team</h3>
            <p className="text-gray-500">The minds behind &epsilon;ar-Lab</p>
          </div>

          {/* Leads - Row 1 */}
          <div className="flex flex-wrap justify-center gap-16 md:gap-32 mb-16">
            {LEADS.map((member, i) => (
              <div 
                key={i} 
                className={`flex flex-col items-center text-center group reveal reveal-fade-up delay-${(i + 1) * 100}`}
              >
                <div className="w-32 h-32 mb-4 relative">
                  <div className="absolute inset-0 bg-teal-200 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 scale-110"></div>
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg z-10 relative"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h4>
                <p className="text-sm text-teal-600 font-bold uppercase tracking-wider">{member.role}</p>
              </div>
            ))}
          </div>

          {/* Core Members - Row 2 */}
          <div className="flex flex-wrap justify-center gap-16 md:gap-32 max-w-6xl mx-auto">
            {CORE_MEMBERS.map((member, i) => (
              <div 
                key={i} 
                className={`flex flex-col items-center text-center group reveal reveal-fade-up delay-${(i + 1) * 100}`}
              >
                <div className="w-32 h-32 mb-4 relative">
                  <div className="absolute inset-0 bg-teal-200 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 scale-110"></div>
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg z-10 relative"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h4>
                <p className="text-sm text-teal-600 font-bold uppercase tracking-wider">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-serif italic text-lg mr-3">
              &epsilon;
            </div>
            <span className="text-lg font-bold">Epsilon Acoustic Revolution Lab</span>
          </div>
          <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} &epsilon;ar-Lab. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;