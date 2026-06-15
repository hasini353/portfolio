import React from 'react';
import { motion } from 'framer-motion';

const JOURNEY = [
  {
    year: '2020 - 2021',
    title: 'Secondary Education',
    desc: 'Lotus High School - Tadepalligudem - India'
  },
  {
    year: '2021 - 2023',
    title: 'Intermediate Education',
    desc: 'Sasi Educational Institutions - Velivennu - India'
  },
  {
    year: '2023 - Present',
    title: 'B.Tech in Information Technology',
    desc: 'Gayatri Vidya Parishad College of Engineering(Autonomous) - Visakhapatnam - India'
  },
  
];

const JourneyTimeline = () => {
  return (
    <section className="py-24 bg-[#0F0F0F] relative z-10 border-t border-white/5 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="flex flex-col items-center mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-4"
          >
            <div className="w-12 h-[2px] bg-[#FF1E1E]" />
            <h2 className="text-sm font-mono text-[#FF1E1E] tracking-[0.3em] uppercase font-bold">
              Educational Journey
            </h2>
            <div className="w-12 h-[2px] bg-[#FF1E1E]" />
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-[#FF1E1E]/20 ml-4 md:ml-1/2 space-y-16 py-10">
          
          {JOURNEY.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative pl-10 md:pl-16 group"
            >
              {/* Node Indicator */}
              <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-[#050505] border-2 border-[#FF1E1E] shadow-[0_0_10px_#FF1E1E] group-hover:bg-[#FF1E1E] group-hover:shadow-[0_0_20px_#FF1E1E] transition-all duration-300 z-10" />
              
              <div className="glass-panel p-6 rounded-r-2xl border-l-4 border-l-[#FF1E1E] group-hover:-translate-y-1 transition-transform duration-300">
                <div className="text-[#FF1E1E] font-mono font-black text-xl mb-2 tracking-widest drop-shadow-md">
                  {item.year}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="text-[#A0A0A0] text-sm md:text-base">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
          
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
