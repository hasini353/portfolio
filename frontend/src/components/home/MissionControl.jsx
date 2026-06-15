import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Activity, Zap, Code2, Database } from 'lucide-react';

const Heatmap = () => {
  // Generate a mock heatmap
  const cols = 24;
  const rows = 7;
  const cells = Array.from({ length: cols * rows });

  return (
    <div className="flex flex-col gap-1">
      {Array.from({ length: rows }).map((_, rIdx) => (
        <div key={rIdx} className="flex gap-1">
          {Array.from({ length: cols }).map((_, cIdx) => {
            // Random intensity for effect
            const intensity = Math.random();
            const bgClass = intensity > 0.8 ? 'bg-[#FF1E1E]' : intensity > 0.5 ? 'bg-[#FF1E1E]/60' : intensity > 0.2 ? 'bg-[#FF1E1E]/30' : 'bg-white/5';
            return (
              <motion.div
                key={cIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (rIdx * cols + cIdx) * 0.005 }}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-[2px] ${bgClass} hover:ring-2 ring-[#FF1E1E] transition-all cursor-crosshair`}
                title={`Activity level: ${Math.floor(intensity * 100)}%`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

const MissionControl = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="mission-control" className="py-24 bg-[#0A0A0A] relative z-10 border-t border-[#FF1E1E]/20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
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
              System Dashboard
            </h2>
            <div className="w-12 h-[2px] bg-[#FF1E1E]" />
          </motion.div>
          <motion.h3 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter"
          >
            Mission Control
          </motion.h3>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Terminal Window */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass-panel border border-[#FF1E1E]/30 bg-[#050505] rounded-none relative overflow-hidden"
          >
            {/* Window Header */}
            <div className="bg-[#111111] border-b border-[#FF1E1E]/20 p-3 flex justify-between items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-[#A0A0A0] text-xs font-mono flex items-center space-x-2">
                <Terminal size={14} />
                <span>hasini@system:~/mission-control</span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 font-mono text-sm space-y-6">
              <div className="space-y-2">
                <p className="text-[#FF1E1E]">❯ ./status --check</p>
                <div className="pl-4 border-l-2 border-[#FF1E1E]/30 space-y-1">
                  <p className="text-white flex items-center"><Zap size={14} className="text-green-500 mr-2" /> System Online</p>
                  <p className="text-[#A0A0A0] flex items-center"><Activity size={14} className="text-[#FF1E1E] mr-2" /> Live Status: <strong className="text-green-400 ml-2 animate-pulse">READY FOR FULL-TIME OPPORTUNITIES</strong></p>
                  <p className="text-[#A0A0A0]">Local Time: {time}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[#FF1E1E]">❯ cat currently_learning.txt</p>
                <ul className="pl-4 list-disc list-inside text-[#A0A0A0] space-y-1">
                  <li><span className="text-white font-bold">High-Level System Design</span></li>
                  <li><span className="text-white font-bold">Advanced AI Agent Architectures</span></li>
                  <li>Distributed Systems Optimization</li>
                </ul>
              </div>

              <div className="space-y-2">
                <p className="text-[#FF1E1E]">❯ tail -f activity.log</p>
                <div className="pl-4 text-[#A0A0A0] opacity-80">
                  <p>[10:45:01] Pushed commit: Optimized indexing latency.</p>
                  <p>[14:22:18] Refactoring microservices architecture...</p>
                  <p className="animate-pulse">_</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            
            {/* Heatmap Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel border border-white/10 p-6 bg-[#0F0F0F]"
            >
              <h4 className="text-white font-mono font-bold uppercase tracking-wider mb-4 flex items-center text-sm">
                <Code2 size={16} className="text-[#FF1E1E] mr-2" />
                Coding Activity
              </h4>
              <div className="overflow-x-auto pb-2">
                <Heatmap />
              </div>
              <div className="flex justify-between items-center mt-4 text-[10px] text-[#A0A0A0] font-mono">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-white/5" />
                  <div className="w-2 h-2 bg-[#FF1E1E]/30" />
                  <div className="w-2 h-2 bg-[#FF1E1E]/60" />
                  <div className="w-2 h-2 bg-[#FF1E1E]" />
                </div>
                <span>More</span>
              </div>
            </motion.div>

            {/* Performance Metrics */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, delay: 0.1 }}
              className="glass-panel border border-white/10 p-6 bg-[#0F0F0F]"
            >
              <h4 className="text-white font-mono font-bold uppercase tracking-wider mb-4 flex items-center text-sm">
                <Database size={16} className="text-[#FF1E1E] mr-2" />
                Core Metrics
              </h4>
              <div className="space-y-4">
                {[
                  { label: 'System Uptime', value: '99.99%' },
                  { label: 'Problem Solving', value: 'Optimal' },
                  { label: 'Bug Resolution', value: '< 24h' },
                ].map((metric, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[#A0A0A0] text-xs font-mono">{metric.label}</span>
                    <span className="text-[#FF1E1E] text-xs font-bold font-mono">{metric.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default MissionControl;
