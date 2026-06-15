import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, BarChart2, CheckCircle2, Layout, Database, Server, GitPullRequest } from 'lucide-react';
import { api } from '../services/api';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeDiagTab, setActiveDiagTab] = useState('system'); // 'system' | 'schema' | 'apiFlow' | 'deployment'

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await api.getProject(id);
        setProject(data);
      } catch (err) {
        console.error('Failed to load project details:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center font-mono text-[#8F9CAE]">
        &gt; Loading Case Study Data...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center font-mono space-y-4">
        <div className="text-red-400">&gt; ERROR: Project Case Study Not Found.</div>
        <Link to="/" className="text-portfolio-primary hover:underline flex items-center space-x-1">
          <ArrowLeft size={14} />
          <span>Back to dashboard</span>
        </Link>
      </div>
    );
  }

  const diagTabs = [
    { id: 'system', name: 'System Architecture', icon: <Server size={14} /> },
    { id: 'schema', name: 'Database Schema', icon: <Database size={14} /> },
    { id: 'apiFlow', name: 'API Flow Path', icon: <GitPullRequest size={14} /> },
    { id: 'deployment', name: 'Deployment Topology', icon: <Layout size={14} /> }
  ];

  return (
    <div className="min-h-screen bg-[#050816] pt-32 pb-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
        
        {/* Navigation Link */}
        <Link to="/" className="inline-flex items-center space-x-2 text-xs md:text-sm font-mono text-portfolio-primary hover:underline">
          <ArrowLeft size={16} />
          <span>Back to dashboard</span>
        </Link>

        {/* Header Title Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-8 border-b border-white/[0.05]">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded bg-white/[0.03] text-portfolio-primary border border-white/5">
              {project.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {project.title}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/5 text-xs font-bold text-white hover:bg-white/[0.06] transition-all"
              >
                <Github size={16} />
                <span>View Code</span>
              </a>
            )}
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-portfolio-primary to-portfolio-secondary text-white font-bold text-xs shadow-glow-primary hover:opacity-95 transition-all"
              >
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Metrics Overview Grid */}
        {project.metrics && Object.keys(project.metrics).length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-[#0c0f24] p-6 rounded-2xl border border-white/5">
            {Object.entries(project.metrics).map(([key, val]) => (
              <div key={key} className="space-y-1">
                <span className="text-[10px] uppercase font-mono text-[#8F9CAE]/60 tracking-wider">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <div className="text-base md:text-lg font-bold text-white font-mono flex items-center space-x-1.5">
                  <BarChart2 size={14} className="text-portfolio-accent" />
                  <span>{val}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Interactive System Design Diagrams Canvas */}
        {project.diagrams && Object.keys(project.diagrams).length > 0 && (
          <div className="glass-panel p-6 rounded-2xl border border-white/[0.06] space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-white/[0.04]">
              <div>
                <h3 className="text-base font-bold text-white">System Design Blueprint</h3>
                <p className="text-xs text-[#8F9CAE]">Select tabs to visualize individual system schematics.</p>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-2">
                {diagTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveDiagTab(tab.id)}
                    className={`flex items-center space-x-1.5 text-[11px] font-mono px-3 py-1.5 rounded-lg border transition-all ${
                      activeDiagTab === tab.id
                        ? 'bg-portfolio-primary/10 border-portfolio-primary text-portfolio-primary'
                        : 'bg-white/[0.02] border-white/5 text-[#8F9CAE] hover:border-white/20'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Diagram Display Panel */}
            <div className="w-full bg-[#050816]/75 rounded-xl border border-white/5 p-4 flex items-center justify-center overflow-hidden max-h-[500px]">
              {project.diagrams[activeDiagTab] ? (
                <div
                  className="w-full h-full flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: project.diagrams[activeDiagTab] }}
                />
              ) : (
                <span className="text-xs font-mono text-[#8F9CAE]/40">No diagram schematic loaded for this section.</span>
              )}
            </div>
          </div>
        )}

        {/* Detailed Case Study Contents */}
        {project.caseStudy && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Written breakdown reports (Left) */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">1. Executive Overview</h3>
                <p className="text-xs md:text-sm text-[#8F9CAE] leading-relaxed">{project.caseStudy.overview}</p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">2. The Problem Statement</h3>
                <p className="text-xs md:text-sm text-[#8F9CAE] leading-relaxed">{project.caseStudy.problem}</p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">3. Proposed Solution</h3>
                <p className="text-xs md:text-sm text-[#8F9CAE] leading-relaxed">{project.caseStudy.solution}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">4. Core Implementation Challenges</h3>
                <p className="text-xs md:text-sm text-[#8F9CAE] leading-relaxed bg-red-500/5 border border-red-500/25 p-4 rounded-xl">
                  {project.caseStudy.challenges}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white">5. Architectural Learnings</h3>
                <p className="text-xs md:text-sm text-[#8F9CAE] leading-relaxed bg-portfolio-accent/5 border border-portfolio-accent/25 p-4 rounded-xl">
                  {project.caseStudy.learnings}
                </p>
              </div>
            </div>

            {/* List structures (Right sidebar) */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Features checklist */}
              <div className="glass-panel p-6 rounded-2xl border border-white/[0.05] space-y-4">
                <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider text-portfolio-primary">
                  Features List
                </h4>
                <ul className="space-y-2.5">
                  {project.caseStudy.features && project.caseStudy.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start text-xs text-[#8F9CAE] leading-relaxed">
                      <CheckCircle2 size={14} className="text-portfolio-accent mr-2.5 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improvements checklist */}
              <div className="glass-panel p-6 rounded-2xl border border-white/[0.05] space-y-4">
                <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider text-portfolio-secondary">
                  Future Roadmap
                </h4>
                <ul className="space-y-2.5">
                  {project.caseStudy.futureImprovements && project.caseStudy.futureImprovements.map((imp, impIdx) => (
                    <li key={impIdx} className="flex items-start text-xs text-[#8F9CAE] leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-portfolio-secondary mr-2.5 mt-1.5 flex-shrink-0" />
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default ProjectDetail;
