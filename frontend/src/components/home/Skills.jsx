import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Terminal, Layout, Server, Cloud, Database, Cpu, Brain } from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    name: 'Programming Languages',
    icon: Terminal,
    skills: ['Java', 'Python', 'C++', 'JavaScript']
  },
  {
    name: 'Generative AI & LLM',
    icon: Brain,
    skills: ['RAG', 'LangChain', 'LlamaIndex', 'Prompt Engineering', 'Vector DBs (ChromaDB)', 'OpenAI API']
  },
  {
    name: 'Backend & Web',
    icon: Layout,
    skills: ['REST APIs', 'Node.js', 'Express.js', 'React.js', 'HTML', 'CSS']
  },
  {
    name: 'Databases',
    icon: Database,
    skills: ['MongoDB', 'MySQL']
  },
  {
    name: 'Core Computer Science',
    icon: Cpu,
    skills: ['Data Structures', 'Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks']
  },
  {
    name: 'Cloud & Tools',
    icon: Cloud,
    skills: ['AWS', 'Git', 'GitHub', 'VS Code', 'Docker']
  }
];

const TiltCard = ({ category }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="glass-panel p-6 rounded-none border border-white/5 hover:border-[#FF1E1E]/40 transition-colors duration-300 relative group cursor-crosshair bg-[#0A0A0A]/80 h-full flex flex-col"
    >
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="flex items-center space-x-3 mb-6"
      >
        <div className="w-10 h-10 bg-[#FF1E1E]/10 border border-[#FF1E1E]/30 flex items-center justify-center text-[#FF1E1E] shadow-[0_0_10px_rgba(255,30,30,0.2)] group-hover:shadow-[0_0_20px_rgba(255,30,30,0.6)] transition-shadow">
          <category.icon size={20} />
        </div>
        <h3 className="text-base font-bold text-white uppercase tracking-wider">
          {category.name}
        </h3>
      </div>

      <div 
        style={{ transform: "translateZ(40px)" }}
        className="flex flex-wrap gap-2"
      >
        {category.skills.map((sk, idx) => (
          <span
            key={idx}
            className="text-[11px] font-mono px-3 py-1.5 bg-black border border-white/10 text-[#A0A0A0] hover:text-white hover:border-[#FF1E1E] hover:shadow-[0_0_10px_rgba(255,30,30,0.5)] transition-all duration-300"
          >
            {sk}
          </span>
        ))}
      </div>
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FF1E1E] opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#FF1E1E] opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#FF1E1E] opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#FF1E1E] opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-[#050505] relative z-10 border-t border-white/5">
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
              Systems Architecture Matrix
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
            Technical Arsenal
          </motion.h3>
        </div>

        {/* Categories Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: 1000 }}
        >
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="h-full"
            >
              <TiltCard category={cat} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;
