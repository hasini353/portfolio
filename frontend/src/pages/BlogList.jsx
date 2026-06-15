import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Eye, ArrowRight, Tag } from 'lucide-react';
import { api } from '../services/api';

const BLOG_CATEGORIES = ['All', 'System Design', 'Cloud Computing', 'Databases'];

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await api.getBlogs(search, category);
      setBlogs(data);
    } catch (err) {
      console.error('Failed to load blogs:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [category]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchBlogs();
  };

  return (
    <div className="min-h-screen bg-[#050816] pt-32 pb-20 relative overflow-hidden">
      {/* Background radial highlights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-portfolio-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-portfolio-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid background */}
      <div className="absolute inset-0 cosmic-grid pointer-events-none opacity-40" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-xs font-mono text-portfolio-primary tracking-widest uppercase">
            // Engineering Journals
          </h1>
          <p className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Technical Insights
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-portfolio-primary to-portfolio-secondary mx-auto rounded-full" />
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          
          {/* Search form */}
          <form onSubmit={handleSearchSubmit} className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0c0f24] border border-white/5 rounded-xl px-4 py-2.5 pl-10 text-xs md:text-sm text-white focus:outline-none focus:border-portfolio-primary"
            />
            <Search className="absolute left-3.5 top-3 text-[#8F9CAE]" size={16} />
          </form>

          {/* Category buttons */}
          <div className="flex flex-wrap gap-2">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-xs font-mono px-4 py-2 rounded-full border transition-all ${
                  category === cat
                    ? 'bg-portfolio-primary/10 border-portfolio-primary text-portfolio-primary shadow-glow-primary'
                    : 'bg-white/[0.02] border-white/5 text-[#8F9CAE] hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Blogs List */}
        {loading ? (
          <div className="text-center font-mono text-xs text-[#8F9CAE] py-20">&gt; Retrieving journals from DB...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center font-mono text-xs text-[#8F9CAE]/50 py-20">No matching technical journals found.</div>
        ) : (
          <div className="space-y-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="glass-panel p-6 md:p-8 rounded-2xl border border-white/[0.05] relative overflow-hidden group hover:border-portfolio-primary/30 transition-all flex flex-col justify-between"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-portfolio-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Category, Date & View count details */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8F9CAE] mb-4">
                    <span className="text-portfolio-primary font-bold">{blog.category}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    <span className="flex items-center space-x-1">
                      <Calendar size={12} />
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                    <span className="flex items-center space-x-1">
                      <Eye size={12} />
                      <span>{blog.views || 0} views</span>
                    </span>
                  </div>

                  {/* Title */}
                  <Link to={`/blog/${blog.slug}`}>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-3 hover:text-portfolio-primary transition-colors">
                      {blog.title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  <p className="text-xs md:text-sm text-[#8F9CAE] leading-relaxed mb-6">
                    {blog.excerpt}
                  </p>
                </div>

                {/* Tags and link */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-4 border-t border-white/[0.03]">
                  <div className="flex flex-wrap gap-1.5">
                    {blog.tags && blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-[#8F9CAE] flex items-center space-x-0.5"
                      >
                        <Tag size={8} />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/blog/${blog.slug}`}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-portfolio-primary hover:translate-x-1 transition-transform"
                  >
                    <span>Read Journal</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default BlogList;
