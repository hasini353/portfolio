import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Calendar, Target, ChevronRight } from 'lucide-react';

const EXPERIENCE = [
  {
    role: 'AWS AI/ML Virtual Intern',
    company: 'EduSkills (AWS Academy)',
    duration: 'May 2025 - July 2025',
    responsibilities: [
      'Built ML pipelines using AWS services.',
      'Worked with SageMaker, Lambda, S3 and API Gateway.',
      'Designed backend APIs integrating machine learning models.',
      'Processed 10,000+ records.',
      'Improved scalability and system performance.',
      'Worked in Agile development environments.'
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-[#0F0F0F] relative z-10 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        
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
              Professional Experience
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
            Mission History
          </motion.h3>
        </div>

        {/* Experience List */}
        <div className="space-y-12">
          {EXPERIENCE.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="glass-panel p-8 md:p-10 border-l-4 border-l-[#FF1E1E] relative group hover:-translate-y-2 transition-transform duration-300 flex flex-col md:flex-row gap-8 md:gap-16 items-start"
            >
              <div className="absolute -inset-[1px] bg-gradient-to-r from-[#FF1E1E]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Left Side: Role, Company, Duration */}
              <div className="relative z-10 w-full md:w-1/3 space-y-6 shrink-0">
                <h3 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-wider group-hover:text-[#FF1E1E] transition-colors">
                  {exp.role}
                </h3>
                
                <div className="flex flex-col space-y-4 text-sm font-mono text-[#A0A0A0]">
                  <div className="flex items-center space-x-3">
                    <Building2 size={16} className="text-[#D90429]" />
                    <span className="text-base text-white font-bold">{exp.company}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar size={16} className="text-[#D90429]" />
                    <span>{exp.duration}</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Mission Objectives */}
              <div className="relative z-10 w-full md:w-2/3">
                <div className="flex items-center space-x-2 text-[#FF1E1E] font-bold text-sm uppercase tracking-widest mb-6">
                  <Target size={16} />
                  <span>Mission Objectives</span>
                </div>
                <ul className="space-y-4">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start text-sm md:text-base text-[#A0A0A0] leading-relaxed">
                      <ChevronRight size={18} className="text-[#FF1E1E] mr-3 mt-0.5 flex-shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech accents */}
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#FF1E1E] opacity-50" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
