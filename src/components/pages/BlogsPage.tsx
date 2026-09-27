import React, { useState, useEffect } from 'react';
import { BlogPost, NavigationTab } from '../../types';
import { blogPostPath, TAB_PATHS } from '../../lib/routes';
import {
  Sparkles,
  Search,
  Clock,
  Calendar,
  User,
  ArrowRight,
  X,
  BookOpen,
  Share2,
  Tag
} from 'lucide-react';

interface BlogsPageProps {
  blogs?: BlogPost[];
  setActiveTab: (tab: NavigationTab) => void;
  /** Slug from a /blog/:slug deep link, if the page was loaded directly on one. */
  initialSlug?: string | null;
  /** Called once the initial slug has been consumed (post opened or not found). */
  onClearInitialSlug?: () => void;
}

export const BlogsPage: React.FC<BlogsPageProps> = ({ blogs = [], setActiveTab, initialSlug, onClearInitialSlug }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);

  // Open the deep-linked post (orbit-i.tech/blog/<slug>) once posts are loaded.
  useEffect(() => {
    if (!initialSlug) return;
    const match = blogs.find((b) => b.slug === initialSlug);
    if (match) setReadingPost(match);
    onClearInitialSlug?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSlug, blogs]);

  const openPost = (post: BlogPost) => {
    setReadingPost(post);
    window.history.pushState({}, '', blogPostPath(post.slug));
  };

  const closePost = () => {
    setReadingPost(null);
    window.history.pushState({}, '', TAB_PATHS.blogs);
  };

  const categories = ['All', 'AI & Data', 'Python & Scripting', 'Web Engineering', 'Design & UX', 'Marketing & Growth'];

  const filteredBlogs = (blogs || []).filter((b) => {
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    const tags = b.tags || [];
    const matchesSearch =
      (b.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.summary || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      tags.some((t) => (t || '').toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-cyan-300">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Orbit-I Engineering Radar & Insights</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Tech Blogs, AI Case Studies & Automation
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Deep-dive architectural patterns, Python scraping tutorials, 3D WebGL optimization, and modern software engineering principles.
        </p>

        {/* Search & Category Filter */}
        <div className="pt-4 max-w-lg mx-auto flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search articles by keyword or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog) => (
          <article
            key={blog.id}
            className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-950/60 text-cyan-300 border border-blue-800/60 font-semibold text-[10px]">
                  {blog.category}
                </span>
                <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3" /> {blog.readTime}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                {blog.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                {blog.summary}
              </p>

              <div className="flex flex-wrap gap-1 pt-1">
                {(blog.tags || []).map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-950 text-[10px] text-slate-400">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  className="w-7 h-7 rounded-full object-cover border border-slate-700"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-[11px] font-semibold text-white">{blog.author.name}</div>
                  <div className="text-[9px] text-slate-400">{blog.publishedDate}</div>
                </div>
              </div>

              <button
                onClick={() => openPost(blog)}
                className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 text-xs font-semibold text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                <span>Read Full</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Full Article Reader Modal */}
      {readingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-3xl max-h-[85vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-cyan-400">{readingPost.category}</span>
              <button
                onClick={closePost}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {readingPost.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-3">
                  <span>By {readingPost.author.name} ({readingPost.author.role})</span>
                  <span>•</span>
                  <span>{readingPost.publishedDate}</span>
                  <span>•</span>
                  <span>{readingPost.readTime}</span>
                </div>
              </div>

              {/* Executive Summary Card */}
              <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-800/40 text-xs text-blue-200">
                <span className="font-bold text-cyan-300">Executive TL;DR: </span>
                {readingPost.summary}
              </div>

              {/* Article Content */}
              <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 space-y-4 leading-relaxed whitespace-pre-wrap">
                {readingPost.content}
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-2">
                {(readingPost.tags || []).map((t, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
