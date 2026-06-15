import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, FileText, Layout, Mail, Trash2, Plus, LogOut, CheckCircle, BarChart2 } from 'lucide-react';
import { api } from '../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [analytics, setAnalytics] = useState(null);
  const [messages, setMessages] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // CRUD Forms states
  const [blogForm, setBlogForm] = useState({ title: '', excerpt: '', content: '', category: 'System Design', tags: '' });
  const [projForm, setProjForm] = useState({ title: '', description: '', category: 'Full Stack', tags: '', githubLink: '', demoLink: '' });
  const [skillForm, setSkillForm] = useState({ name: '', category: 'Programming Languages', level: 'Advanced', icon: 'Code', glowColor: '#00E5FF' });

  const navigate = useNavigate();

  // Guard session authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const loadData = async () => {
      setLoading(true);
      try {
        // Load all data parallel
        const [stats, msgs, articles, projs, skillList] = await Promise.all([
          api.getAnalytics(),
          api.getMessages(),
          api.getBlogs(),
          api.getProjects(),
          api.getSkills()
        ]);
        
        setAnalytics(stats);
        setMessages(msgs);
        setBlogs(articles);
        setProjects(projs);
        setSkills(skillList);
      } catch (err) {
        console.error('Failed to load dashboard data:', err.message);
        // If verify fails, force signout
        api.logout();
        navigate('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate]);

  const handleLogout = () => {
    api.logout();
    navigate('/');
  };

  // ------------------ CRUD SUBMISSIONS ------------------
  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = blogForm.tags.split(',').map(t => t.trim()).filter(Boolean);
      const data = await api.createBlog({
        ...blogForm,
        tags: tagsArray
      });
      setBlogs([data, ...blogs]);
      setBlogForm({ title: '', excerpt: '', content: '', category: 'System Design', tags: '' });
      alert('Blog post published!');
    } catch (err) {
      alert(`Error publishing blog: ${err.message}`);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = projForm.tags.split(',').map(t => t.trim()).filter(Boolean);
      const data = await api.createProject({
        ...projForm,
        tags: tagsArray
      });
      setProjects([data, ...projects]);
      setProjForm({ title: '', description: '', category: 'Full Stack', tags: '', githubLink: '', demoLink: '' });
      alert('Showcase project added successfully!');
    } catch (err) {
      alert(`Error adding project: ${err.message}`);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    try {
      const data = await api.createSkill(skillForm);
      setSkills([data, ...skills]);
      setSkillForm({ name: '', category: 'Programming Languages', level: 'Advanced', icon: 'Code', glowColor: '#00E5FF' });
      alert('Technical skill added to universe grid!');
    } catch (err) {
      alert(`Error adding skill: ${err.message}`);
    }
  };

  // ------------------ CRUD DELETIONS ------------------
  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete this contact message record?')) return;
    try {
      await api.deleteMessage(id);
      setMessages(messages.filter(m => m._id !== id));
    } catch (err) {
      alert(`Error deleting message: ${err.message}`);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Permanently delete this journal article?')) return;
    try {
      await api.deleteBlog(id);
      setBlogs(blogs.filter(b => b._id !== id));
    } catch (err) {
      alert(`Error deleting blog: ${err.message}`);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this showcase project card?')) return;
    try {
      await api.deleteProject(id);
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      alert(`Error deleting project: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center font-mono text-[#8F9CAE]">
        &gt; Mounting Session Console &amp; Decrypting Analytics...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 cosmic-grid pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-8">
        
        {/* Dashboard Title Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/[0.05]">
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-extrabold text-white flex items-center space-x-2">
              <Shield className="text-portfolio-secondary" size={22} />
              <span>Developer Panel Command Console</span>
            </h1>
            <p className="text-xs text-[#8F9CAE]">Secure token authenticated session.</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-all"
          >
            <LogOut size={14} />
            <span>End Session</span>
          </button>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pb-4 border-b border-white/[0.03]">
          {[
            { id: 'analytics', name: 'Site Analytics', icon: <Eye size={14} /> },
            { id: 'messages', name: `Inbound Messages (${messages.length})`, icon: <Mail size={14} /> },
            { id: 'blogs', name: 'Manage Journals', icon: <FileText size={14} /> },
            { id: 'projects', name: 'Manage Projects', icon: <Layout size={14} /> },
            { id: 'skills', name: 'Skills Grid', icon: <Shield size={14} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-1.5 text-xs font-mono px-4 py-2 rounded-lg border transition-all ${
                activeTab === tab.id
                  ? 'bg-portfolio-secondary/15 border-portfolio-secondary text-portfolio-secondary'
                  : 'bg-white/[0.02] border-white/5 text-[#8F9CAE] hover:border-white/20'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Workspace Panels */}
        <div className="space-y-6">
          
          {/* 1. Analytics Dashboard */}
          {activeTab === 'analytics' && analytics && (
            <div className="space-y-6">
              {/* Stats Counters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-mono text-[#8F9CAE]/60 tracking-wider">Page Views</span>
                  <div className="text-2xl font-extrabold text-white font-mono">{analytics.pageViews}</div>
                </div>
                <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-mono text-[#8F9CAE]/60 tracking-wider">Unique Visitors</span>
                  <div className="text-2xl font-extrabold text-white font-mono">{analytics.uniqueVisitors}</div>
                </div>
                <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-mono text-[#8F9CAE]/60 tracking-wider">Showcase Projects</span>
                  <div className="text-2xl font-extrabold text-white font-mono">{analytics.counts.projects}</div>
                </div>
                <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-mono text-[#8F9CAE]/60 tracking-wider">Published Articles</span>
                  <div className="text-2xl font-extrabold text-white font-mono">{analytics.counts.blogs}</div>
                </div>
              </div>

              {/* Simple daily hits graph using custom lines */}
              <div className="glass-panel p-6 rounded-2xl border border-white/[0.05] space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <BarChart2 size={16} />
                  <span>Traffic Ingress Trends (Hits per Day)</span>
                </h3>

                <div className="h-40 flex items-end justify-between gap-2 pt-6 px-4">
                  {analytics.dailyHits && analytics.dailyHits.length > 0 ? (
                    analytics.dailyHits.map((hit, idx) => {
                      const maxHits = Math.max(...analytics.dailyHits.map(h => h.count), 1);
                      const heightPercent = Math.min(100, (hit.count / maxHits) * 100);
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                          <span className="text-[10px] font-mono text-portfolio-primary font-bold">{hit.count}</span>
                          <div className="w-full bg-[#161b3d] h-24 rounded overflow-hidden flex items-end">
                            <div
                              className="w-full bg-gradient-to-t from-portfolio-secondary to-portfolio-primary"
                              style={{ height: `${heightPercent}%` }}
                            />
                          </div>
                          <span className="text-[8px] font-mono text-[#8F9CAE]/60 truncate max-w-full">
                            {hit.date.split('-')[2]}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <span className="text-xs font-mono text-[#8F9CAE]/40 mx-auto">No traffic log metrics recorded.</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 2. Messages Mailbox */}
          {activeTab === 'messages' && (
            <div className="glass-panel p-6 rounded-2xl border border-white/[0.05] space-y-6">
              <h3 className="text-base font-bold text-white mb-4">Recruiter Mailbox</h3>
              
              {messages.length === 0 ? (
                <div className="text-center font-mono text-xs text-[#8F9CAE]/50 py-10">No inbound messages received yet.</div>
              ) : (
                <div className="divide-y divide-white/5 space-y-4">
                  {messages.map((msg) => (
                    <div key={msg._id} className="pt-4 first:pt-0 flex justify-between gap-4 items-start">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="font-bold text-white">{msg.name}</span>
                          <span className="text-portfolio-primary font-mono select-all">&lt;{msg.email}&gt;</span>
                          <span className="text-[#8F9CAE]/50 font-mono">[{new Date(msg.createdAt).toLocaleString()}]</span>
                        </div>
                        {msg.subject && <div className="text-xs font-bold text-[#8F9CAE] font-mono">Subject: {msg.subject}</div>}
                        <p className="text-xs md:text-sm text-[#8F9CAE] leading-relaxed pt-2">
                          {msg.message}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteMessage(msg._id)}
                        className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10 transition-colors"
                        title="Delete Message"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. Blogs CRUD */}
          {activeTab === 'blogs' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* List */}
              <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-white/[0.05] space-y-4">
                <h3 className="text-base font-bold text-white mb-2">Published Journals</h3>
                <div className="divide-y divide-white/5">
                  {blogs.map((blog) => (
                    <div key={blog._id} className="py-3 flex justify-between items-center gap-4">
                      <div className="truncate space-y-0.5">
                        <h4 className="text-xs md:text-sm font-bold text-white truncate">{blog.title}</h4>
                        <span className="text-[10px] text-[#8F9CAE]/60 font-mono">{blog.category}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteBlog(blog._id)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-white/[0.05]">
                <h3 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
                  <Plus size={16} className="text-portfolio-primary" />
                  <span>Create Technical Journal</span>
                </h3>
                <form onSubmit={handleAddBlog} className="space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="Article Title"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    className="w-full bg-[#101530] border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Article Excerpt"
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                    className="w-full bg-[#101530] border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                  <select
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full bg-[#101530] border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="System Design">System Design</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="Databases">Databases</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Tags (separated by comma)"
                    value={blogForm.tags}
                    onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                    className="w-full bg-[#101530] border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                  <textarea
                    rows={6}
                    required
                    placeholder="Markdown Content (fenced blocks supported)"
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    className="w-full bg-[#101530] border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none font-mono"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-portfolio-primary text-white font-semibold text-xs rounded-lg hover:opacity-90 transition-all cursor-pointer"
                  >
                    Publish Post
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* 4. Projects CRUD */}
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* List */}
              <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-white/[0.05] space-y-4">
                <h3 className="text-base font-bold text-white mb-2">Portfolio Cards</h3>
                <div className="divide-y divide-white/5">
                  {projects.map((proj) => (
                    <div key={proj._id} className="py-3 flex justify-between items-center gap-4">
                      <div className="truncate space-y-0.5">
                        <h4 className="text-xs md:text-sm font-bold text-white truncate">{proj.title}</h4>
                        <span className="text-[10px] text-[#8F9CAE]/60 font-mono">{proj.category}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteProject(proj._id)}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-white/[0.05]">
                <h3 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
                  <Plus size={16} className="text-portfolio-primary" />
                  <span>Add Showcase Project</span>
                </h3>
                <form onSubmit={handleAddProject} className="space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="Project Title"
                    value={projForm.title}
                    onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
                    className="w-full bg-[#101530] border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Brief description line"
                    value={projForm.description}
                    onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                    className="w-full bg-[#101530] border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                  <select
                    value={projForm.category}
                    onChange={(e) => setProjForm({ ...projForm, category: e.target.value })}
                    className="w-full bg-[#101530] border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="Backend">Backend</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="AI/ML">AI/ML</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Tags (separated by comma)"
                    value={projForm.tags}
                    onChange={(e) => setProjForm({ ...projForm, tags: e.target.value })}
                    className="w-full bg-[#101530] border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="GitHub Repo Link"
                    value={projForm.githubLink}
                    onChange={(e) => setProjForm({ ...projForm, githubLink: e.target.value })}
                    className="w-full bg-[#101530] border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Live Demo Link"
                    value={projForm.demoLink}
                    onChange={(e) => setProjForm({ ...projForm, demoLink: e.target.value })}
                    className="w-full bg-[#101530] border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-portfolio-primary text-white font-semibold text-xs rounded-lg hover:opacity-90 transition-all cursor-pointer"
                  >
                    Publish Project
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* 5. Skills CRUD */}
          {activeTab === 'skills' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* List */}
              <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-white/[0.05] space-y-4">
                <h3 className="text-base font-bold text-white mb-2">Technical Competency Universe</h3>
                <div className="grid grid-cols-2 gap-4">
                  {skills.map((skill) => (
                    <div key={skill._id} className="p-3 bg-white/[0.01] border border-white/5 rounded-lg flex justify-between items-center">
                      <div className="truncate">
                        <span className="text-xs font-bold text-white block">{skill.name}</span>
                        <span className="text-[9px] text-[#8F9CAE] font-mono">{skill.category.split(' ')[0]}</span>
                      </div>
                      <span className="text-[10px] font-mono text-portfolio-primary">{skill.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-white/[0.05]">
                <h3 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
                  <Plus size={16} className="text-portfolio-primary" />
                  <span>Add Skill Node</span>
                </h3>
                <form onSubmit={handleAddSkill} className="space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="Skill Name"
                    value={skillForm.name}
                    onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                    className="w-full bg-[#101530] border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                  <select
                    value={skillForm.category}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                    className="w-full bg-[#101530] border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Programming Languages">Programming Languages</option>
                    <option value="Frontend Development">Frontend Development</option>
                    <option value="Backend Development">Backend Development</option>
                    <option value="Databases">Databases</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Tools">Tools</option>
                    <option value="System Design">System Design</option>
                  </select>
                  <select
                    value={skillForm.level}
                    onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })}
                    className="w-full bg-[#101530] border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Learning">Learning</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Glow color hex code (e.g. #00E5FF)"
                    value={skillForm.glowColor}
                    onChange={(e) => setSkillForm({ ...skillForm, glowColor: e.target.value })}
                    className="w-full bg-[#101530] border border-white/5 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-portfolio-primary text-white font-semibold text-xs rounded-lg hover:opacity-90 transition-all cursor-pointer"
                  >
                    Insert Skill
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
