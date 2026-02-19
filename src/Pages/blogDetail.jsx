import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock, Share2, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const fontHead = "font-['Playfair_Display',_serif]";
const fontBody = "font-['DM_Sans',_sans-serif]";


const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs/${id}`);
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Post not found</h2>
          <Link to="/blogs" className="text-blue-600 hover:underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-950 ${fontBody} pt-24 pb-20`}>
      <article className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <Link to="/blogs" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-8 group">
          <ArrowLeft size={20} className="transform group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-blue-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 inline-block">
              {post.category}
            </span>
            <h1 className={`text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight ${fontHead}`}>
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-10">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{post.author}</p>
                  <p className="text-xs">Travel Expert</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar size={18} className="text-blue-500" /> {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}
              </div>
              {post.readTime && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={18} className="text-blue-500" /> {post.readTime}
                </div>
              )}
            </div>
          </motion.div>
        </header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="rounded-[2rem] overflow-hidden mb-12 shadow-2xl"
        >
          <img src={post.image} alt={post.title} className="w-full h-auto object-cover max-h-[600px]" />
        </motion.div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div
            className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-6 blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Footer / Share */}
        <footer className="mt-16 pt-10 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                <Share2 size={18} /> Share Post
              </button>
              <button className="flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                <MessageSquare size={18} /> 4 Comments
              </button>
            </div>
          </div>
        </footer>
      </article>

      {/* Custom Styles for Blog Content */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .blog-content h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.875rem;
          font-weight: 700;
          color: #111827;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
        }
        .dark .blog-content h3 {
          color: #f3f4f6;
        }
        .blog-content p {
          font-size: 1.125rem;
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }
      `}} />
    </div>
  );
};

export default BlogDetail;
