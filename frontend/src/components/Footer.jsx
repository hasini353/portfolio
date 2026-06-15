import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#050816] border-t border-white/[0.04] py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        
        {/* Info */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <div className="font-mono text-lg font-bold text-[#FFFFFF]">
            <span className="text-portfolio-primary">&lt;</span>
            <span>HASINI GUNDUBOGULA</span>
            <span className="text-portfolio-secondary">/&gt;</span>
          </div>
          <p className="text-xs text-[#8F9CAE]">B.Tech IT Undergraduate </p>
        </div>

        {/* Recruiter Focus Availability */}
        <div className="flex items-center space-x-2.5 px-4 py-2 rounded-full bg-portfolio-accent/10 border border-portfolio-accent/30">
          <span className="w-2 h-2 rounded-full bg-portfolio-accent animate-ping" />
          <span className="w-2 h-2 rounded-full bg-portfolio-accent absolute" />
          <span className="text-xs font-semibold text-portfolio-accent tracking-wide uppercase">
            Available for Software Engineering Roles
          </span>
        </div>

        {/* Social Link Handles */}
        <div className="flex items-center space-x-6">
          <a
            href="https://github.com/hasini353"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8F9CAE] hover:text-[#FFFFFF] transition-colors"
            title="GitHub Profile"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/hasini-gundubogula-8631742a1/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8F9CAE] hover:text-[#FFFFFF] transition-colors"
            title="LinkedIn Profile"
          >
            <Linkedin size={20} />
          </a>
          
          <a
            href="https://leetcode.com/u/hasini_353"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-[#8F9CAE] hover:text-[#FFFFFF] transition-colors"
            title="LeetCode Profile"
          >
            LeetCode
          </a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-8 pt-6 border-t border-white/[0.02] text-center">
        <p className="text-[10px] text-[#8F9CAE]/60 tracking-wider">
          © {new Date().getFullYear()} HASINI GUNDUBOGULA. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
