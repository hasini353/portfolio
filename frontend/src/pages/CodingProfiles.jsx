import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Code2, Target, Crosshair } from 'lucide-react';

const STATS = [
  {
    platform: 'LeetCode',
    title: 'Global Algorithm Ranking',
    rating: '1544',
    maxRating: 'Max Rating',
    solved: '400+',
    solvedLabel: 'Problems Solved',
    color: '#FF1E1E',
    icon: Code2,
    badge: 'Elite Solver'
  },
  {
    platform: 'Codeforces',
    title: 'Competitive Programming',
    rating: 'Pupil',
    maxRating: 'Current Tier',
    solved: '120+',
    solvedLabel: 'Contest Submissions',
    color: '#D90429',
    icon: Target,
    badge: 'Competitive'
  },
  {
    platform: 'GeeksforGeeks',
    title: 'Data Structures Mastery',
    rating: 'Rank 1',
    maxRating: 'Institute Rank',
    solved: '350+',
    solvedLabel: 'Coding Score',
    color: '#FF1E1E',
    icon: Trophy,
    badge: 'Top Ranker'
  }
];

const CodingProfiles = ({ isEmbedded = false }) => {
  return (
    <section id="coding-profiles" className={`relative z-10 border-t border-white/5 bg-[#0F0F0F] ${isEmbedded ? 'py-24' : 'min-h-screen pt-32 pb-24'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="flex flex-col items-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-4"
          >
            <div className="w-12 h-[2px] bg-[#FF1E1E]" />
            <h2 className="text-sm font-mono text-[#FF1E1E] tracking-[0.3em] uppercase font-bold">
              Combat Stats
            </h2>
            <div className="w-12 h-[2px] bg-[#FF1E1E]" />
          </motion.div>
          <motion.h3 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter text-center"
          >
            Competitive Coding Profiles
          </motion.h3>
        </div>

        {/* Gaming Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Card Container */}
              <div className="glass-panel p-8 border-t-4 bg-[#0A0A0A]/80 border-t-[#FF1E1E] hover:bg-[#111111] transition-colors relative overflow-hidden h-full flex flex-col justify-between z-10">
                
                {/* Background Crosshair */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none group-hover:scale-150 transition-transform duration-700">
                  <Crosshair size={150} color={stat.color} />
                </div>

                {/* Header */}
                <div className="relative z-10 mb-8 border-b border-white/10 pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-black border border-[#FF1E1E]/50 text-[#FF1E1E]">
                      <stat.icon size={24} />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-black bg-[#FF1E1E] px-2 py-1">
                      {stat.badge}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-wide group-hover:text-[#FF1E1E] transition-colors">
                    {stat.platform}
                  </h3>
                  <p className="text-[#A0A0A0] text-xs font-mono uppercase tracking-widest mt-1">
                    {stat.title}
                  </p>
                </div>

                {/* Stats */}
                <div className="relative z-10 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-3xl font-black text-white font-mono drop-shadow-[0_0_10px_rgba(255,30,30,0.5)]">
                      {stat.rating}
                    </div>
                    <div className="text-[10px] text-[#A0A0A0] font-mono uppercase tracking-widest mt-1">
                      {stat.maxRating}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-white font-mono drop-shadow-[0_0_10px_rgba(255,30,30,0.5)]">
                      {stat.solved}
                    </div>
                    <div className="text-[10px] text-[#A0A0A0] font-mono uppercase tracking-widest mt-1">
                      {stat.solvedLabel}
                    </div>
                  </div>
                </div>

                {/* Bottom Accents */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF1E1E]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CodingProfiles;
