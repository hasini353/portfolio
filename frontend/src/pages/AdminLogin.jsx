import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Key, Mail, Info } from 'lucide-react';
import { api } from '../services/api';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // If already logged in, skip to dashboard
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError(null);

    try {
      await api.login(email, password);
      // Success: redirect
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login submission failed:', err.message);
      setError(err.message || 'Invalid administrative credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center pt-24 pb-20 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 cosmic-grid pointer-events-none opacity-40" />

      <div className="max-w-md w-full px-6 relative z-10 space-y-6">
        
        {/* Logo and title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-portfolio-secondary/15 flex items-center justify-center text-portfolio-secondary border border-portfolio-secondary/30 mx-auto">
            <ShieldAlert size={24} />
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight font-sans">
            Admin Console Login
          </h1>
          <p className="text-xs text-[#8F9CAE]">
            Authorization required for content CRUD parameters modification.
          </p>
        </div>

        {/* Login form */}
        <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/[0.05] shadow-2xl space-y-4">
          {error && (
            <div className="p-3.5 text-xs text-red-400 bg-red-500/5 border border-red-500/20 rounded-xl text-center font-semibold font-mono">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#8F9CAE] font-bold">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#101530] border border-white/5 rounded-lg px-4 py-2.5 pl-10 text-xs md:text-sm text-white focus:outline-none focus:border-portfolio-primary"
                  placeholder="admin@hasini.dev"
                />
                <Mail className="absolute left-3 top-3 text-[#8F9CAE]/70" size={16} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#8F9CAE] font-bold">Secret Key</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#101530] border border-white/5 rounded-lg px-4 py-2.5 pl-10 text-xs md:text-sm text-white focus:outline-none focus:border-portfolio-primary"
                  placeholder="••••••••"
                />
                <Key className="absolute left-3 top-3 text-[#8F9CAE]/70" size={16} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-2.5 rounded-xl bg-gradient-to-r from-portfolio-secondary to-portfolio-primary text-white font-semibold text-xs md:text-sm shadow-glow-secondary hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            </button>
          </form>

          {/* Dev testing tip box */}
          <div className="p-3.5 bg-portfolio-primary/5 border border-portfolio-primary/20 rounded-xl flex items-start space-x-2 text-[10px] md:text-xs text-[#8F9CAE] leading-relaxed">
            <Info size={16} className="text-portfolio-primary mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-white">Quick Review Seeder Tip:</strong><br />
              Default auth credentials are pre-seeded in the database fallback:<br />
              User: <code className="text-portfolio-primary font-mono select-all">admin@hasini.dev</code><br />
              Pass: <code className="text-portfolio-primary font-mono select-all">admin12345</code>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
