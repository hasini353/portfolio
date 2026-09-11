import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Code, Cloud, Database } from 'lucide-react';

const ACHIEVEMENTS = [
  {
    title: 'Problems Solved on LeetCode',
    value: 500,
    prefix: '',
    suffix: '+',
    icon: Code,
    link: 'https://leetcode.com/u/hasini_353/'
  },
  {
    title: 'LeetCode Contest Rating',
    value: 1544,
    prefix: '',
    suffix: '',
    icon: Trophy,
    link: 'https://leetcode.com/u/hasini_353/'
  },
  {
    title: 'Microsoft SQL AI Developer Associate (DP-800)',
    value: 1,
    prefix: '',
    suffix: '',
    icon: Database,
    isBoolean: true,
    link: 'https://learn.microsoft.com/en-us/users/gundubogulahasini-9997/credentials/aee504816b6e1074'
  },
  {
    title: 'AWS Cloud Foundations Certified',
    value: 1,
    prefix: '',
    suffix: '',
    icon: Cloud,
    isBoolean: true,
    link: 'https://www.credly.com/badges/5014137e-685b-40b1-b636-9a205ac2baa5/public_url'
  },
  {
    title: 'AWS Machine Learning Foundations',
    value: 1,
    prefix: '',
    suffix: '',
    icon: Cloud,
    isBoolean: true,
    link: 'https://www.credly.com/badges/e4fd7ca9-0898-46af-8030-972dcf135be0/public_url'
  },
  {
    title: 'Oracle AI Cloud Database Services',
    value: 1,
    prefix: '',
    suffix: '',
    icon: Database,
    isBoolean: true,
    link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=AC7EF90B7A919641C2198C4BA18A2F5BFB944969C9EC0E244419BB6F924962D7'
  },
  {
    title: 'Oracle Generative AI Professional',
    value: 1,
    prefix: '',
    suffix: '',
    icon: Database,
    isBoolean: true,
    link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=EDC09677A9C39764D7C8CBB9B452315A59C629033421CB7D2A3AAD9FF6C9D972'
  },
  {
    title: 'CCNA:Introduction to Networks',
    value: 1,
    prefix: '',
    suffix: '',
    icon: Database,
    isBoolean: true,
    link: 'https://www.credly.com/badges/ae544521-bac0-4759-bb7b-a5762bf489bc/public_url'
  },
  {
    title: 'AWS Generative AI Foundations',  
    value: 1,
    prefix: '',
    suffix: '',
    icon: Database,
    isBoolean: true,
    link: 'https://www.credly.com/badges/29c21727-35b1-4ff2-8e8f-25db9fc7df1b/public_url'
  }
];

const CounterCard = ({ achievement }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = achievement.value;
    if (start === end) return;

    const totalDuration = 2000;
    const increment = end / (totalDuration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [achievement.value]);

  return (
    <a href={achievement.link} target="_blank" rel="noopener noreferrer" className="block glass-panel p-6 border-t-2 border-[#FF1E1E] bg-[#0A0A0A]/90 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF1E1E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#1A0000] border border-[#FF1E1E]/30 flex items-center justify-center text-[#FF1E1E] group-hover:shadow-[0_0_15px_#FF1E1E] transition-shadow">
          <achievement.icon size={24} />
        </div>
        
        <div className="text-4xl md:text-5xl font-black text-white font-mono tracking-tighter">
          {achievement.isBoolean ? (
            <span className="text-[#FF1E1E] text-3xl">Certified</span>
          ) : (
            <>
              {achievement.prefix}{count}{achievement.suffix}
            </>
          )}
        </div>
        
        <h3 className="text-[#A0A0A0] text-sm md:text-base font-bold uppercase tracking-wider group-hover:text-white transition-colors">
          {achievement.title}
        </h3>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#FF1E1E]" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#FF1E1E]" />
    </a>
  );
};

const Achievements = () => {
  return (
    <section id="achievements" className="py-24 bg-[#050505] relative z-10 border-t border-white/5">
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
              Honors & Certifications
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
            Elite Milestones
          </motion.h3>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ACHIEVEMENTS.map((ach, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <CounterCard achievement={ach} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Achievements;
