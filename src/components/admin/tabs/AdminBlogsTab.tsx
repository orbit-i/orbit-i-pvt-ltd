import React, { useState } from 'react';
import { BlogPost } from '../../../types';
import {
  BookOpen,
  Plus,
  Trash2,
  Edit3,
  Sparkles,
  Search,
  Check,
  Eye,
  Calendar,
  Clock,
  Tag,
  User,
  FileText,
  RefreshCw,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface AdminBlogsTabProps {
  blogs: BlogPost[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>;
}

export const AdminBlogsTab: React.FC<AdminBlogsTabProps> = ({ blogs, setBlogs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // AI Assistant State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<BlogPost['category']>('AI & Data');
  const [authorName, setAuthorName] = useState('Dr. Alex Vance');
  const [authorRole, setAuthorRole] = useState('Chief AI Architect');
  const [readTime, setReadTime] = useState('6 min read');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [featured, setFeatured] = useState(false);

  const categories: BlogPost['category'][] = [
    'AI & Data',
    'Python & Scripting',
    'Web Engineering',
    'Design & UX',
    'Marketing & Growth',
  ];

  const handleStartCreate = () => {
    setEditingBlog(null);
    setTitle('');
    setSlug('');
    setCategory('AI & Data');
    setAuthorName('Orbit-I Research Team');
    setAuthorRole('Principal Solutions Engineer');
    setReadTime('5 min read');
    setSummary('');
    setContent('');
    setTagsInput('AI, Enterprise, Automation');
    setFeatured(false);
    setIsCreating(true);
    setPreviewMode(false);
  };

  const handleStartEdit = (b: BlogPost) => {
    setEditingBlog(b);
    setTitle(b.title);
    setSlug(b.slug);
    setCategory(b.category);
    setAuthorName(b.author.name);
    setAuthorRole(b.author.role);
    setReadTime(b.readTime);
    setSummary(b.summary);
    setContent(b.content);
    setTagsInput(b.tags.join(', '));
    setFeatured(!!b.featured);
    setIsCreating(true);
    setPreviewMode(false);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const generatedSlug =
      slug.trim() ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const blogData: BlogPost = {
      id: editingBlog ? editingBlog.id : `blog-${Date.now()}`,
      title: title.trim(),
      slug: generatedSlug,
      category,
      author: {
        name: authorName.trim() || 'Orbit-I Editorial',
        role: authorRole.trim() || 'Tech Writer',
        avatar:
          editingBlog?.author.avatar ||
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      },
      publishedDate:
        editingBlog?.publishedDate ||
        new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      readTime: readTime.trim() || '5 min read',
      summary: summary.trim() || title.trim(),
      content: content.trim(),
      tags: parsedTags.length > 0 ? parsedTags : ['Orbit-I', 'Tech'],
      featured,
    };

    let updatedList: BlogPost[];
    if (editingBlog) {
      updatedList = blogs.map((b) => (b.id === editingBlog.id ? blogData : b));
    } else {
      updatedList = [blogData, ...blogs];
    }

    setBlogs(updatedList);
    setIsCreating(false);
    setEditingBlog(null);

    // Sync with backend
    fetch('/api/content/blogs', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedList),
    }).catch(console.error);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      const updated = blogs.filter((b) => b.id !== id);
      setBlogs(updated);
      fetch('/api/content/blogs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      }).catch(console.error);
    }
  };

  const handleAiGenerateDraft = async () => {
    if (!aiPrompt.trim()) return;
    setAiGenerating(true);

    try {
      const res = await fetch('/api/ai/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType: 'blog post',
          topic: aiPrompt,
          tone: 'Authoritative, technical, practical',
        }),
      });
      const data = await res.json();

      if (data.title) setTitle(data.title);
      if (data.summary) setSummary(data.summary);
      if (data.content) setContent(data.content);
      if (Array.isArray(data.tags)) setTagsInput(data.tags.join(', '));
      if (!slug && data.title) {
        setSlug(
          data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '')
        );
      }
    } catch (err) {
      console.error('AI Draft error:', err);
    } finally {
      setAiGenerating(false);
    }
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = categoryFilter === 'All' || b.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Blog Writing & Publishing CMS ({blogs.length})</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Write, edit, and publish technical insights, research whitepapers, and guides.
          </p>
        </div>

        {!isCreating && (
          <button
            onClick={handleStartCreate}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Write New Article</span>
          </button>
        )}
      </div>

      {/* 1. ARTICLE EDITOR / CREATION VIEW */}
      {isCreating ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {editingBlog ? 'Edit Technical Article' : 'Write & Publish Technical Article'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Draft content in rich Markdown. Preview live before saving.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  previewMode
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{previewMode ? 'Edit Raw Markdown' : 'Live Preview'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingBlog(null);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-400 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* AI Draft Assistant Helper */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <Sparkles className="w-4 h-4" />
              <span>Gemini AI Blog Outline & Drafting Engine</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Enter topic prompt (e.g. Building High-Throughput Python Scrapers with Playwright and Postgres)"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleAiGenerateDraft}
                disabled={aiGenerating || !aiPrompt.trim()}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              >
                {aiGenerating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Synthesizing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Auto-Draft Article</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <form onSubmit={handleSaveBlog} className="space-y-5">
            {/* Meta Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Article Headline / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Architecting Distributed AI Agents for Enterprise Workflows"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (!editingBlog && !slug) {
                      setSlug(
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)+/g, '')
                      );
                    }
                  }}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  URL Slug
                </label>
                <input
                  type="text"
                  placeholder="architecting-distributed-ai-agents"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs font-mono rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-blue-500"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Author Name & Title
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Author Name"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Estimated Read Time
                </label>
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="e.g. 7 min read"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Executive Summary / Excerpt *
              </label>
              <textarea
                rows={2}
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="A concise 1-2 sentence overview of the article value proposition."
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Markdown Content vs Live Preview */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Full Article Body (Markdown Supported) *
                </label>
                <span className="text-[11px] text-slate-400">
                  {content.split(/\s+/).filter(Boolean).length} words
                </span>
              </div>

              {previewMode ? (
                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 min-h-[300px] prose dark:prose-invert prose-xs max-w-none">
                  <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">{title}</h1>
                  <p className="text-xs text-slate-500 italic mb-4">{summary}</p>
                  <div className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {content}
                  </div>
                </div>
              ) : (
                <textarea
                  rows={14}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="## 1. Introduction&#10;&#10;Write technical deep-dives, code examples, benchmarks, and architectural patterns here..."
                  className="w-full p-4 text-xs font-mono leading-relaxed rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-blue-500"
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Comma-Separated Tags
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="AI, RAG, Python, React 19"
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <input
                  type="checkbox"
                  id="featured-blog"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="featured-blog" className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  Feature this article prominently on Homepage and Blogs Radar
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingBlog(null);
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Check className="w-4 h-4" />
                <span>{editingBlog ? 'Save & Update Article' : 'Publish Article Live'}</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* 2. BLOG LISTING VIEW */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles by title, tag or summary..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <button
                onClick={() => setCategoryFilter('All')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  categoryFilter === 'All'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                All ({blogs.length})
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategoryFilter(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    categoryFilter === c
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* List of articles */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredBlogs.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No blog articles matching current filters.
              </div>
            ) : (
              filteredBlogs.map((post) => (
                <div
                  key={post.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 px-3 rounded-xl transition-colors"
                >
                  <div className="space-y-1.5 flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                        {post.category}
                      </span>
                      {post.featured && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                          Featured
                        </span>
                      )}
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                        <Calendar className="w-3 h-3" />
                        {post.publishedDate}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {post.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleStartEdit(post)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                      title="Delete Article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
