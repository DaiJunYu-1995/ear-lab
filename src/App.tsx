
import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AudioShowcase } from './components/AudioShowcase';
import { DuoTokViz } from './components/DuoTokViz';
import { EarVaeViz } from './components/EarVaeViz';
import { EvalViz } from './components/EvalViz';
import { SpotlightCard } from './components/SpotlightCard';
import { ExternalLink, FileText, Database, Wand2, Box, Github, Mail } from 'lucide-react';
import { Paper, Member, InnovationPoint } from './types';

// --- DATA ---
const INNOVATION_POINTS: InnovationPoint[] = [
  {
    title: "Semantic & Acoustic Unification",
    description: "Bridging the gap between semantic understanding and high-fidelity acoustic generation through novel XY-Tokenizer architectures.",
    icon: <Database className="w-6 h-6 text-teal-600" />
  },
  {
    title: "DiT-GAN Synthesis",
    description: "Pioneering the combination of Diffusion Transformers (DiT) with Generative Adversarial Networks for high-speed generation.",
    icon: <Wand2 className="w-6 h-6 text-teal-600" />
  },
  {
    title: "High-Fidelity Reconstruction",
    description: "Redefining audio VAEs with perceptually driven loss functions and phase coherence for studio-quality reconstruction.",
    icon: <Box className="w-6 h-6 text-teal-600" />
  }
];

const PAPERS: Paper[] = [
  {
    id: "paper-duo-tok",
    title: "DUO-TOK: Dual-Track Semantic Music Tokenizer for Vocal-Accompaniment Generation",
    authors: "Rui Lin*, Zhiyue Wu*, Jiahe Lei, Kangdi Wang, Weixiong Chen, Junyu Dai, Tao Jiang",
    abstract: "Duo-Tok is a source-aware dual-codebook tokenizer targeting the tension between reconstruction quality and LM learnability.",
    link: "https://eps-acoustic-revolution-lab.github.io/DUO_TOK/",
    pdfLink: "https://arxiv.org/abs/2511.20224", 
    image: "https://picsum.photos/id/101/600/400",
    tags: ["Music Generation", "Tokenizer", "Dual-Track"]
  },
  {
    id: "paper-ear-vae",
    title: "BACK TO EAR: Perceptually Driven High Fidelity Music Reconstruction",
    authors: "Kangdi Wang*, Zhiyue Wu*, Dinghao Zhou, Rui Lin, Junyu Dai, Tao Jiang",
    abstract: "εar-VAE optimizes the VAE training paradigm for high-fidelity music reconstruction using K-weighting perceptual filters.",
    link: "https://eps-acoustic-revolution-lab.github.io/EAR_VAE/",
    pdfLink: "https://arxiv.org/abs/2509.14912",
    image: "https://picsum.photos/id/160/600/400",
    tags: ["VAE", "High Fidelity", "Phase Coherence"]
  },
  {
    id: "paper-eval",
    title: "Multidimensional Music Aesthetic Evaluation via Semantically Consistent C-Mixup Augmentation",
    authors: "Shuyang Liu*, Yuan Jin*, Rui Lin, Shizhe Chen, Junyu Dai, Tao Jiang",
    abstract: "A robust music aesthetic evaluation framework combining multi-source multi-scale feature extraction.",
    link: undefined,
    pdfLink: "https://arxiv.org/abs/2511.18869",
    image: "https://picsum.photos/id/453/600/400",
    tags: ["Evaluation", "Aesthetics", "Ranking"]
  }
];

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
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      <Navbar />
      <Hero />

      {/* Introduction */}
      <section id="introduction" className="py-24 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="reveal reveal-blur">
            <h3 className="text-3xl font-bold mb-8">Who We Are</h3>
            <p className="text-xl text-gray-700 leading-relaxed">
              We are a non-profit academic research group from China. 
              United by a passion for cutting-edge technology, we are dedicated to pushing the boundaries of 
              <span className="font-semibold text-teal-700"> Semantic & Acoustic Audio Modeling</span>. 
            </p>
          </div>
        </div>
      </section>

      {/* Brainstorm */}
      <section id="innovation" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-16 reveal reveal-fade-up">
            <h3 className="text-4xl font-bold mb-4">Innovation</h3>
            <p className="text-gray-500 font-medium uppercase tracking-widest text-xs">Core Technology</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {INNOVATION_POINTS.map((point, index) => (
              <div 
                key={index} 
                className={`p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 bg-white group reveal reveal-fade-up delay-${(index + 1) * 100}`}
              >
                <div className="mb-6 p-4 bg-teal-50 rounded-full w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {point.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-900">{point.title}</h4>
                <p className="text-gray-600 leading-relaxed text-sm">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Papers */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12 reveal reveal-slide">
             <h3 className="text-4xl font-bold text-gray-900">Publications</h3>
             <span className="text-gray-400 font-mono text-xs">RESEARCH_HIGHLIGHTS_2025</span>
          </div>

          <div className="space-y-12">
            {PAPERS.map((paper, idx) => (
              <SpotlightCard
                key={paper.id}
                id={paper.id}
                className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 reveal reveal-fade-up overflow-hidden"
                spotlightColor="rgba(13, 148, 136, 0.1)"
              >
                <div className="grid md:grid-cols-12 gap-0 relative z-10">
                  <div className={`relative md:col-span-7 min-h-[350px] ${idx % 2 === 1 ? 'md:order-last' : ''}`}>
                    {paper.id === 'paper-duo-tok' ? <DuoTokViz /> : paper.id === 'paper-ear-vae' ? <EarVaeViz /> : <EvalViz />}
                  </div>
                  <div className="md:col-span-5 p-8 md:p-12 flex flex-col justify-center bg-white">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {paper.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-teal-50 text-teal-700 text-[10px] font-bold uppercase tracking-wider rounded border border-teal-100/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-teal-700 transition-colors">
                      {paper.title}
                    </h2>
                    <p className="text-xs font-mono text-gray-400 mb-6">{paper.authors}</p>
                    <div className="flex items-center space-x-6">
                      {paper.link && (
                        <a href={paper.link} target="_blank" rel="noopener noreferrer" className="flex items-center text-teal-700 font-bold hover:underline text-sm">
                          <ExternalLink className="w-4 h-4 mr-2" /> Demo
                        </a>
                      )}
                      <a href={paper.pdfLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 font-medium hover:text-black transition-colors text-sm">
                        <FileText className="w-4 h-4 mr-2" /> arXiv
                      </a>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Demos */}
      <section id="demos">
        <AudioShowcase />
      </section>

      {/* Members */}
      <section id="members" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 reveal reveal-fade-up">
            <h3 className="text-4xl font-bold mb-4">Our Team</h3>
            <p className="text-gray-500">The minds behind &epsilon;ar-Lab</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[...LEADS, ...CORE_MEMBERS].map((member, i) => (
              <div key={i} className="flex flex-col items-center text-center group reveal reveal-fade-up">
                <div className="w-24 h-24 mb-4 relative">
                  <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover border-2 border-gray-100 shadow-md grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <h4 className="text-sm font-bold text-gray-900">{member.name}</h4>
                <p className="text-[10px] text-teal-600 font-bold uppercase mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Improved Footer for Public Access */}
      <footer className="bg-gray-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 pb-16 border-b border-gray-800">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-serif italic text-xl mr-4">
                  &epsilon;
                </div>
                <span className="text-xl font-bold tracking-tight">Epsilon Acoustic Revolution Lab</span>
              </div>
              <p className="text-gray-400 max-w-md text-sm leading-relaxed">
                A non-profit research group dedicated to the advancement of generative audio models and acoustic intelligence.
              </p>
            </div>
            
            <div className="space-y-4">
              <h5 className="font-bold text-sm uppercase tracking-widest text-gray-500">Links & Contact</h5>
              <div className="flex flex-col space-y-3">
                <a href="https://github.com/Epsilon-Acoustic-Revolution-Lab" className="flex items-center text-gray-300 hover:text-white transition-colors text-sm">
                  <Github className="w-4 h-4 mr-3" /> GitHub Organization
                </a>
                <a href="mailto:contact@ear-lab.org" className="flex items-center text-gray-300 hover:text-white transition-colors text-sm">
                  <Mail className="w-4 h-4 mr-3" /> contact@ear-lab.org
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-10 flex flex-col md:flex-row justify-between items-center text-gray-500 text-[10px] font-mono uppercase tracking-widest">
            <span>&copy; {new Date().getFullYear()} εar-Lab Team</span>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#introduction" className="hover:text-white transition-colors">Intro</a>
              <a href="#demos" className="hover:text-white transition-colors">Demos</a>
              <a href="#innovation" className="hover:text-white transition-colors">Research</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
