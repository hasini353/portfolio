import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 bg-[#050505] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="flex flex-col items-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-4"
          >
            <div className="w-12 h-[2px] bg-[#FF1E1E]" />
            <h2 className="text-sm font-mono text-[#FF1E1E] tracking-[0.3em] uppercase font-bold">
              Who Is Hasini?
            </h2>
            <div className="w-12 h-[2px] bg-[#FF1E1E]" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-panel p-8 md:p-12 border-l-4 border-l-[#FF1E1E] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF1E1E]/5 rounded-bl-[100px] pointer-events-none transition-transform group-hover:scale-150 duration-700" />
              
              <div className="space-y-6 relative z-10 text-[#A0A0A0] text-lg leading-relaxed font-medium">
                <p>
                  I am an <strong className="text-white">Information Technology undergraduate</strong> passionate about scalable backend systems, cloud computing, artificial intelligence, and solving real-world problems through technology.
                </p>
                <p>
                  I enjoy building high-performance applications, designing efficient systems, and continuously improving my problem-solving skills through <strong className="text-white">Data Structures and Algorithms</strong>.
                </p>
                <p className="text-xl text-white font-bold border-l-2 border-[#D90429] pl-4 italic">
                  I am on a mission to build intelligent systems, solve complex challenges, and create technology that reaches and impacts millions worldwide.                </p>
              </div>
            </div>
          </motion.div>

          {/* Core Tenets */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {[
              { id: '01', title: 'Engineering Excellence', desc: 'Writing clean, scalable, and optimized code.' },
              { id: '02', title: 'Intelligence & Discipline', desc: 'Consistently solving complex algorithmic challenges.' },
              { id: '03', title: 'Sigma Mentality', desc: 'Independent, focused, and driven by impact.' },
            ].map((tenet, idx) => (
              <div key={idx} className="flex items-start space-x-6 group">
                <div className="text-4xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-b from-[#FF1E1E]/80 to-transparent group-hover:from-[#FF1E1E] transition-all duration-300">
                  {tenet.id}
                </div>
                <div className="space-y-1 mt-1">
                  <h4 className="text-xl font-bold text-white uppercase tracking-wide group-hover:text-[#FF1E1E] transition-colors">{tenet.title}</h4>
                  <p className="text-[#A0A0A0]">{tenet.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
