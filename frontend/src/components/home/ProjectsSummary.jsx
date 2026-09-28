import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Activity, Database, Server, Cpu } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Blood Bank',
    subtitle: 'Centralized Healthcare & Emergency Blood Network',
    description: 'A centralized digital healthcare platform connecting donors, hospitals, and blood banks to streamline emergency blood requests, manage real-time inventory across all 8 blood groups, and coordinate donation drives.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    features: ['Emergency Blood Pipeline', 'Real-Time Inventory', 'Role-Based Access', 'Donor Eligibility Engine'],
    achievements: [
      'Engineered automated donor eligibility tracking with 90-day medical cooldown enforcement.',
      'Implemented instant hospital-to-lab emergency request workflows with real-time status tracking.',
      'Built secure role-based portals for 4 stakeholders: Donors, Hospitals, Labs, and Admins.'
    ],
    links: {
      github: 'https://github.com/hasini353/Blood-Bank',
      demo: 'https://blood-bank-mu-lovat.vercel.app/'
    }
  },
  {
    title: 'AI Career Advisor',
    subtitle: 'AI-Powered Career Guidance Platform',
    description: 'An intelligent platform providing real-time career recommendations through a low-latency chatbot interface.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'WebSockets'],
    features: ['Real-Time Chatbot', 'Career Recommendations', 'Low Latency Communication', 'Scalable Backend Architecture'],
    achievements: [
      'Built a career-guidance chatbot that recommends paths based on skills and interests.',
      'Implemented real-time chat interface using WebSockets for streaming responses.',
      'Engineered recommendation logic mapping inputs across 3 categories.',
      'Structured backend as a 3-layer architecture for maintainability.'
    ],
    links: {
      github: 'https://github.com/hasini353/career-advisor',
      demo: 'https://career-advisor-58ufj5x8x-hasini353s-projects.vercel.app/login'
    }
  },
  {
    title: 'RevenuePilot',
    subtitle: 'Autonomous Revenue Operating System',
    description: 'An AI-powered revenue optimization platform using Gemini and deterministic MongoDB analytics to identify cross-sell and customer revenue opportunities.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Gemini', 'Razorpay'],
    features: ['AI Optimization', 'Policy Engine', 'Razorpay Webhooks', 'Machine-Readable Endpoints'],
    achievements: [
      'Implemented REST APIs with a policy engine and human-in-the-loop approval.',
      'Integrated Razorpay APIs for payment-link creation and transaction tracking.',
      'Developed commerce endpoints supporting UAP, ACP, AP2, and x402.'
    ],
    links: {
      github: 'https://github.com/hasini353/RevenuePilot',
      demo: ''
    }
  },
  {
    title: 'DigiDiary',
    subtitle: 'Homework Management System',
    description: 'A comprehensive platform for managing academic assignments with role-based access control and high-performance data operations.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    features: ['Authentication', 'Role Based Access Control', 'REST APIs', 'Performance Optimization'],
    achievements: [
      'Improved MongoDB performance by 20–25%.',
      'Handled multiple concurrent users efficiently.'
    ],
    links: {
      github: 'https://github.com/hasini353/DigiDiary',
      demo: 'https://digi-diary-a76y0ht22-hasini353s-projects.vercel.app'
    }
  }
];

const ProjectsSummary = () => {
  return (
    <section id="projects" className="py-24 bg-[#050505] relative z-10 border-t border-white/5">
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
              Engineering Showcase
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
            Featured Projects
          </motion.h3>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="group relative"
            >
              {/* Neon Glow Background */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF1E1E] to-[#D90429] rounded-none blur-sm opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
              
              <div className="relative glass-panel p-8 border-t-4 border-t-[#FF1E1E] bg-[#0A0A0A]/90 h-full flex flex-col justify-between overflow-hidden">
                
                {/* Circuit Background Pattern */}
                <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
                   <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="#FF1E1E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                     <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                     <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                     <line x1="12" y1="22.08" x2="12" y2="12"></line>
                   </svg>
                </div>

                <div className="space-y-6 relative z-10">
                  {/* Header */}
                  <div>
                    <a
                      href={project.links.demo || project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block group/title"
                    >
                      <h3 className="text-3xl font-black text-white uppercase tracking-wider mb-2 group-hover:text-[#FF1E1E] group-hover/title:text-[#FF1E1E] transition-colors">
                        {project.title}
                      </h3>
                    </a>
                    <p className="text-[#A0A0A0] font-mono text-sm uppercase tracking-widest border-b border-white/10 pb-4">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-[#A0A0A0] text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Features & Achievements */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[#FF1E1E] text-xs font-bold font-mono uppercase mb-2">Core Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.features.map((feat, fIdx) => (
                          <span key={fIdx} className="text-xs bg-[#1A0000] border border-[#FF1E1E]/30 text-[#A0A0A0] px-2 py-1">
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {project.achievements.length > 0 && (
                      <div className="bg-[#111111] p-4 border-l-2 border-[#FF1E1E]">
                        <h4 className="text-white text-xs font-bold font-mono uppercase mb-2">Achievements</h4>
                        <ul className="space-y-2">
                          {project.achievements.map((ach, aIdx) => (
                            <li key={aIdx} className="text-xs text-[#A0A0A0] flex items-start">
                              <Activity size={12} className="text-[#FF1E1E] mr-2 mt-0.5" />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer (Tech & Links) */}
                <div className="mt-8 pt-6 border-t border-white/10 relative z-10 space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono font-bold uppercase px-2 py-1 bg-white text-black">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6">
                    {project.links.demo && (
                      <a 
                        href={project.links.demo} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-white hover:text-[#FF1E1E] transition-colors group/link font-bold uppercase text-sm tracking-wider"
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </a>
                    )}
                    <a 
                      href={project.links.github} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-[#A0A0A0] hover:text-white transition-colors group/link font-bold uppercase text-sm tracking-wider"
                    >
                      <Github size={16} />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>

                {/* Corner accents */}
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#FF1E1E] opacity-50" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSummary;
