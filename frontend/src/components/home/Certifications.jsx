import React, { useState, useEffect } from 'react';
import { Award, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';
import { api } from '../../services/api';

const Certifications = () => {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const data = await api.getCertifications();
        setCerts(data);
      } catch (err) {
        console.error('Failed to load certs:', err.message);
      }
    };
    fetchCerts();
  }, []);

  return (
    <section id="certifications" className="py-20 bg-[#0A0A0A] relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-mono text-portfolio-secondary tracking-widest uppercase">
            // Verifiable Credentials
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold text-white">
            Certifications &amp; Badges
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-portfolio-secondary to-portfolio-primary mx-auto rounded-full" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certs.map((cert, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl border border-white/[0.05] bg-[#111111]/75 relative overflow-hidden group hover:border-portfolio-secondary/30 transition-all flex flex-col justify-between"
            >
              {/* Radial glow */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-portfolio-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Info */}
              <div>
                {/* Header Icon */}
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-lg bg-portfolio-secondary/15 flex items-center justify-center text-portfolio-secondary border border-portfolio-secondary/30">
                    <ShieldCheck size={20} />
                  </div>
                  {cert.credentialLink && cert.credentialLink !== '#' && (
                    <a
                      href={cert.credentialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#A1A1AA] hover:text-white transition-colors"
                      title="Verify Credential"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>

                <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-portfolio-primary transition-colors">
                  {cert.name}
                </h3>
                
                <div className="text-xs font-semibold text-portfolio-secondary font-mono mb-4">
                  {cert.issuer}
                </div>

                <div className="flex items-center space-x-1.5 text-xs text-[#A1A1AA] mb-6 font-mono">
                  <Calendar size={12} />
                  <span>Issued: {cert.date}</span>
                </div>
              </div>

              {/* Skills list */}
              <div className="pt-4 border-t border-white/[0.04] space-y-2">
                <span className="text-[10px] uppercase font-mono text-[#A1A1AA]/60 tracking-wider">
                  Skills Validated
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cert.skillsLearned && cert.skillsLearned.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-[#A1A1AA]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Certifications;
