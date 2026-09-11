import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Activity, Terminal, Star, Briefcase } from 'lucide-react';

const TITLES = [
  'Backend Developer',
  'AI Enthusiast',
  'Problem Solver',
  'Future AI Engineer',
  'Software Engineer'
];

const Hero = () => {
  const [titleIdx, setTitleIdx] = useState(0);
  const [typedTitle, setTypedTitle] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentFullTitle = TITLES[titleIdx];

    if (!isDeleting) {
      // Typing
      timer = setTimeout(() => {
        setTypedTitle(currentFullTitle.substring(0, typedTitle.length + 1));
      }, 80);

      // Finish typing, wait and start delete
      if (typedTitle === currentFullTitle) {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      // Deleting
      timer = setTimeout(() => {
        setTypedTitle(currentFullTitle.substring(0, typedTitle.length - 1));
      }, 40);

      // Finished deleting, go to next word
      if (typedTitle === '') {
        setIsDeleting(false);
        setTitleIdx((prev) => (prev + 1) % TITLES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [typedTitle, isDeleting, titleIdx]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-[#050505]">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF1E1E]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[#D90429]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Texts */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left z-20">
          
          {/* Status Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-3 px-4 py-2 rounded-none border border-[#FF1E1E]/30 bg-[#0F0F0F]/80 backdrop-blur-sm"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF1E1E] shadow-[0_0_10px_#FF1E1E] animate-pulse" />
            <span className="text-xs font-mono text-[#A0A0A0] tracking-[0.2em] uppercase">
              MISSION ACTIVE // NO LIMITS // JUST BUILD
            </span>
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase text-white drop-shadow-2xl"
            >
              HASINI <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF1E1E] to-[#D90429] glow-text-red">
                GUNDUBOGULA
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-[#A0A0A0] font-medium max-w-2xl mx-auto lg:mx-0"
            >
              Building Scalable Systems, AI-Powered Applications, and Problem Solver.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-12 text-2xl md:text-3xl font-mono text-white flex items-center justify-center lg:justify-start"
          >
            <span className="text-[#FF1E1E] mr-3">&gt;</span>
            <span className="font-bold">{typedTitle}</span>
            <span className="w-3 h-8 bg-[#FF1E1E] ml-2 animate-pulse shadow-[0_0_10px_#FF1E1E]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-5 items-center justify-center lg:justify-start pt-4"
          >
            <a
              href="#projects"
              className="group relative flex items-center justify-center space-x-2 px-8 py-4 bg-transparent border-2 border-[#FF1E1E] text-white font-bold uppercase tracking-wider overflow-hidden hover:scale-105 active:scale-95 transition-transform duration-300"
            >
              <div className="absolute inset-0 bg-[#FF1E1E] translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-in-out z-0" />
              <span className="relative z-10">View Projects</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
  href="/cv.pdf"
  download="Hasini_Gundubogula_Resume.pdf"
  className="flex items-center space-x-2 px-8 py-4 bg-[#0F0F0F] border border-white/10 text-white font-bold uppercase tracking-wider hover:bg-white/5 hover:border-white/20 transition-all duration-300"
>
  <Download className="w-5 h-5 text-[#A0A0A0]" />
  <span>Download Resume</span>
</a>

            <a
              href="#contact"
              className="text-[#A0A0A0] hover:text-[#FF1E1E] uppercase font-bold tracking-widest text-sm transition-colors border-b border-transparent hover:border-[#FF1E1E] pb-1 ml-4"
            >
              Contact Me
            </a>
          </motion.div>

          {/* Statistics Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-white/5 mt-10"
          >
            {[
              { label: 'DSA Problems Solved', value: '500+', icon: Terminal },
              { label: 'LeetCode Rating', value: '1544', icon: Activity },
              { label: 'CGPA', value: '8.93', icon: Star },
              { label: 'AWS AI/ML Intern', value: '2025', icon: Briefcase },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col space-y-2 p-3 bg-[#0F0F0F]/50 border border-[#FF1E1E]/10 rounded-lg hover:border-[#FF1E1E]/40 transition-colors">
                <div className="flex items-center space-x-2 text-[#A0A0A0]">
                  <stat.icon className="w-4 h-4 text-[#FF1E1E]" />
                  <span className="text-[10px] uppercase tracking-wider font-mono">{stat.label}</span>
                </div>
                <div className="text-xl font-black text-white font-mono">{stat.value}</div>
              </div>
            ))}
          </motion.div>

        </div>

        {/* Visual Profile Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 flex justify-center lg:justify-end relative"
        >
          {/* Tech rotating borders */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full border border-[#FF1E1E]/20 border-dashed animate-[spin_20s_linear_infinite] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] md:w-[450px] md:h-[450px] rounded-full border-t-2 border-[#FF1E1E]/40 animate-[spin_15s_linear_infinite_reverse] pointer-events-none" />
          
          <div className="relative group animate-float cursor-none">
            {/* Neon Glow behind image */}
            <div className="absolute -inset-2 rounded-full bg-[#FF1E1E] opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500" />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#FF1E1E] to-[#D90429] opacity-50 blur-lg group-hover:opacity-80 transition-opacity duration-500" />
            
            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-[3px] border-[#FF1E1E]/50 shadow-[0_0_30px_rgba(255,30,30,0.4)] group-hover:shadow-[0_0_50px_rgba(255,30,30,0.8)] group-hover:border-[#FF1E1E] transition-all duration-500 z-10 bg-[#050505]">
              {/* Ensure you put the actual image 'hasini.jpeg' in the public folder */}
              <img
                src="/hasini.jpeg"
                alt="Hasini Gundubogula"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#FF1E1E]/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500" />
            </div>
            
            {/* Cyberpunk accent tags on image */}
            <div className="absolute top-4 right-4 bg-[#FF1E1E] text-white text-[10px] font-mono px-2 py-1 rotate-12 z-20 shadow-[0_0_10px_#FF1E1E]">
             PROBLEM.SOLVER
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
