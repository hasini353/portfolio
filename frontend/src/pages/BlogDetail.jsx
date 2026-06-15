import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Eye, MessageSquare, Tag, Send } from 'lucide-react';
import { api } from '../services/api';
import { renderMarkdown } from '../utils/markdown';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // Client comment section state
  const [comments, setComments] = useState([
    { name: 'David Carter', comment: 'Outstanding write-up! Compound indexing decreased our MongoDB search speeds by 30% on our production app.', date: '1 day ago' },
    { name: 'Sarah Patel', comment: 'I really appreciated the clear WebSocket handshake breakdowns. Very useful for scale-engineering interviews!', date: '3 days ago' }
  ]);
  const [newComment, setNewComment] = useState({ name: '', comment: '' });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await api.getBlog(slug);
        setBlog(data);
      } catch (err) {
        console.error('Failed to load blog article details:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.name || !newComment.comment) return;

    setComments((prev) => [
      { name: newComment.name, comment: newComment.comment, date: 'Just now' },
      ...prev
    ]);
    setNewComment({ name: '', comment: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center font-mono text-[#8F9CAE]">
        &gt; Retrieving Journal Article...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center font-mono space-y-4">
        <div className="text-red-400">&gt; ERROR: Journal Article Not Found.</div>
        <Link to="/blog" className="text-portfolio-primary hover:underline flex items-center space-x-1">
          <ArrowLeft size={14} />
          <span>Back to blog list</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] pt-32 pb-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-8">
        
        {/* Navigation Link */}
        <Link to="/blog" className="inline-flex items-center space-x-2 text-xs md:text-sm font-mono text-portfolio-primary hover:underline">
          <ArrowLeft size={16} />
          <span>Back to blog list</span>
        </Link>

        {/* Header Metadata */}
        <div className="space-y-4 pb-6 border-b border-white/[0.05]">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8F9CAE]">
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

          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {blog.title}
          </h1>
          
          <p className="text-sm text-[#8F9CAE] italic font-medium leading-relaxed">
            {blog.excerpt}
          </p>
        </div>

        {/* Custom Compiled Content Block */}
        <article className="prose prose-invert max-w-none">
          {renderMarkdown(blog.content)}
        </article>

        {/* Tags */}
        <div className="pt-6 pb-4 border-b border-white/[0.05] flex flex-wrap gap-2">
          {blog.tags && blog.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-3 py-1 rounded bg-white/[0.02] border border-white/5 text-[#8F9CAE] flex items-center space-x-1"
            >
              <Tag size={10} />
              <span>{tag}</span>
            </span>
          ))}
        </div>

        {/* Comment sandbox section */}
        <div className="space-y-6 pt-6">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <MessageSquare className="text-portfolio-primary" size={18} />
            <span>Discussion Board ({comments.length})</span>
          </h3>

          {/* New comment input */}
          <form onSubmit={handleCommentSubmit} className="glass-panel p-4 rounded-xl border border-white/5 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={newComment.name}
                onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                className="w-full bg-[#101530] border border-white/5 rounded-lg px-3 py-2 text-xs md:text-sm text-white focus:outline-none focus:border-portfolio-primary"
              />
            </div>
            <textarea
              placeholder="Join the discussion..."
              rows={3}
              required
              value={newComment.comment}
              onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
              className="w-full bg-[#101530] border border-white/5 rounded-lg px-3 py-2 text-xs md:text-sm text-white focus:outline-none focus:border-portfolio-primary resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-portfolio-primary text-white font-semibold text-xs hover:opacity-90 transition-all cursor-pointer"
              >
                <Send size={12} />
                <span>Post Comment</span>
              </button>
            </div>
          </form>

          {/* Comment list */}
          <div className="space-y-4">
            {comments.map((c, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.03] space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white font-mono">{c.name}</span>
                  <span className="text-[#8F9CAE]/60">{c.date}</span>
                </div>
                <p className="text-xs md:text-sm text-[#8F9CAE] leading-relaxed">
                  {c.comment}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default BlogDetail;
