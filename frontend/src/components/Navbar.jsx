import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Watch for scroll to change background opacity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/#home' },
    { name: 'About', path: '/#about' },
    { name: 'Journey', path: '/#journey' },
    { name: 'Skills', path: '/#skills' },
    { name: 'Experience', path: '/#experience' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Achievements', path: '/#achievements' },
    { name: 'Contact', path: '/#contact' }
  ];

  // Helper to determine if link is active
  const isActive = (path) => {
    if (path.startsWith('/#')) {
      return location.hash === path.substring(1);
    }
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
      scrolled ? 'bg-[#050505]/85 backdrop-blur-md border-b border-[#FF1E1E]/20 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 font-mono text-xl font-bold tracking-tight text-[#FFFFFF] group">
          <span className="text-[#FF1E1E] group-hover:text-white transition-colors">&lt;</span>
          <span className="font-black tracking-widest uppercase group-hover:text-[#FF1E1E] transition-colors">Hasini</span>
          <span className="text-[#D90429] group-hover:text-white transition-colors">/&gt;</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden xl:flex items-center space-x-6">
          {navLinks.map((link, idx) => {
            const isAnchor = link.path.startsWith('/#');
            return isAnchor ? (
              <a
                key={idx}
                href={link.path}
                className={`text-[11px] uppercase tracking-widest font-mono transition-colors hover:text-[#FF1E1E] ${
                  isActive(link.path) ? 'text-[#FF1E1E] font-bold border-b border-[#FF1E1E] pb-1' : 'text-[#A0A0A0]'
                }`}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={idx}
                to={link.path}
                className={`text-[11px] uppercase tracking-widest font-mono transition-colors hover:text-[#FF1E1E] ${
                  isActive(link.path) ? 'text-[#FF1E1E] font-bold border-b border-[#FF1E1E] pb-1' : 'text-[#A0A0A0]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <div className="xl:hidden flex items-center space-x-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#FFFFFF] hover:text-[#FF1E1E] transition-colors focus:outline-none p-1"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-[#050505] border-b border-[#FF1E1E]/20 px-6 py-6 flex flex-col space-y-4 shadow-2xl">
          {navLinks.map((link, idx) => {
            const isAnchor = link.path.startsWith('/#');
            return isAnchor ? (
              <a
                key={idx}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-mono uppercase tracking-widest py-2 transition-colors hover:text-[#FF1E1E] border-b border-white/5 ${
                  isActive(link.path) ? 'text-[#FF1E1E] font-bold' : 'text-[#A0A0A0]'
                }`}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={idx}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-mono uppercase tracking-widest py-2 transition-colors hover:text-[#FF1E1E] border-b border-white/5 ${
                  isActive(link.path) ? 'text-[#FF1E1E] font-bold' : 'text-[#A0A0A0]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
