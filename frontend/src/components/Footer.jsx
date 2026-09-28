import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const LeetCodeIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.24 5.24 0 0 0-3.85-1.472 5.24 5.24 0 0 0-3.85 1.472l-4.32 4.38A5.207 5.207 0 0 0 2 14.273c0 1.472.585 2.856 1.606 3.878l4.333 4.362A5.24 5.24 0 0 0 11.789 24c1.473 0 2.857-.585 3.878-1.606l2.609-2.636c.514-.514.496-1.365-.039-1.9-.535-.536-1.386-.554-1.9-.039zM20.811 13.01H10.666c-.733 0-1.333.6-1.333 1.333s.6 1.334 1.334 1.334h10.145c.734 0 1.334-.6 1.334-1.334s-.6-1.333-1.334-1.333z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-[#050816] border-t border-white/[0.04] py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        
        {/* Info */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <div className="font-mono text-lg font-bold text-[#FFFFFF]">
            <span className="text-[#FF1E1E]">&lt;</span>
            <span>HASINI GUNDUBOGULA</span>
            <span className="text-[#D90429]">/&gt;</span>
          </div>
          <p className="text-xs text-[#8F9CAE]">B.Tech IT Undergraduate </p>
        </div>

        {/* Recruiter Focus Availability */}
        <div className="flex items-center space-x-2.5 px-4 py-2 rounded-full bg-[#FF1E1E]/10 border border-[#FF1E1E]/30">
          <span className="w-2 h-2 rounded-full bg-[#FF1E1E] animate-ping" />
          <span className="w-2 h-2 rounded-full bg-[#FF1E1E] absolute" />
          <span className="text-xs font-semibold text-[#FF1E1E] tracking-wide uppercase font-mono">
            Available for Software Engineering Roles
          </span>
        </div>

        {/* Social Link Handles */}
        <div className="flex items-center space-x-6">
          <a
            href="https://github.com/hasini353"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8F9CAE] hover:text-[#FF1E1E] transition-colors"
            title="GitHub Profile"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/hasini-gundubogula-8631742a1/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8F9CAE] hover:text-[#FF1E1E] transition-colors"
            title="LinkedIn Profile"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://leetcode.com/u/hasini_353"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8F9CAE] hover:text-[#FF1E1E] transition-colors"
            title="LeetCode Profile"
          >
            <LeetCodeIcon size={20} />
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
