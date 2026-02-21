import React, { useState, useEffect } from "react";
import { ArrowRight, Calendar, User, Tag, Clock, ChevronRight, Mail, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setBlogPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      setError("Unable to load blogs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 500);
      }
    }
  }, []);

  const filteredPosts = (blogPosts || []).filter(post => {
    const title = post?.title || "";
    const category = post?.category || "";
    const search = searchTerm.toLowerCase();
    return title.toLowerCase().includes(search) || category.toLowerCase().includes(search);
  });

  return (
    <div className="font-sans text-gray-800 bg-white selection:bg-blue-600 selection:text-white overflow-x-hidden">

      {/* --- HERO SECTION (Matches About/Contact) --- */}
      <div className="relative h-[60vh] md:h-[80vh] w-full bg-gray-900 overflow-hidden rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-2xl z-10">

        {/* Parallax Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1608481337062-4093bf3ed404?q=80&w=2070&auto=format&fit=crop"
            alt="Ceyloria Travel Journal"
            className="w-full h-full object-cover scale-105 animate-subtle-zoom opacity-60"
          />
          {/* Complex Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-blue-900/40 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-transparent to-gray-900/30" />
        </div>

        {/* Hero Content */}
        <div className="relative h-full container mx-auto px-6 flex flex-col justify-center pb-10">
          <div className="max-w-4xl space-y-6 md:space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-tight md:leading-[0.9] drop-shadow-2xl">
              Ceyloria <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Travel Journal
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed border-l-4 border-cyan-400 pl-6">
              Your ultimate guide to uncovering the hidden gems, culture, and stories of Sri Lanka.
            </p>
          </div>
        </div>
      </div>

      {/* --- SEARCH & DECOR --- */}
      <section className="relative mt-12 md:mt-20 container mx-auto px-6 pb-20">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px] -z-10 opacity-60" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-50 rounded-full blur-[100px] -z-10 opacity-60" />

        {/* Search Bar (Floating Style) */}
        <div className="max-w-xl mx-auto mb-20">
          <div className="relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
              <Search size={24} />
            </div>
            <input
              type="text"
              placeholder="Search for destinations or stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-100 rounded-[2rem] pl-16 pr-8 py-5 shadow-xl outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-medium text-lg placeholder-gray-400"
            />
          </div>
        </div>

        {/* --- BLOG GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {loading ? (
            <div className="col-span-full py-20 text-center">
              <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500 font-medium">Loading our stories...</p>
            </div>
          ) : error ? (
            <div className="col-span-full py-20 text-center">
              <p className="text-red-500 font-bold text-xl">{error}</p>
              <button
                onClick={fetchBlogs}
                className="mt-4 text-blue-600 hover:underline font-bold"
              >
                Try refreshing
              </button>
            </div>
          ) : (
            (() => {
              if (filteredPosts.length === 0) {
                return (
                  <div className="col-span-full py-20 text-center">
                    <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                      <Search size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">No results found</h3>
                    <p className="text-gray-500 mt-2">Try searching for something else like "Colombo" or "Nature"</p>
                  </div>
                );
              }

              return filteredPosts.map((post) => (
                <div
                  key={post._id}
                  className="group relative bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 flex flex-col h-full"
                  onClick={() => window.location.href = post.path || `/blog/${post._id}`}
                >
                  {/* --- Image Section --- */}
                  <div className="relative h-72 overflow-hidden bg-gray-100 cursor-pointer">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />

                    <img
                      src={post.image || "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a"}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
                      <div className="bg-white/90 backdrop-blur-md text-gray-800 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-sm border border-white/50">
                        <span className="uppercase tracking-wide">
                          {post.category || "Journal"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* --- Content Section --- */}
                  <div className="p-8 flex flex-col flex-grow relative cursor-pointer">
                    {/* Title */}
                    <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight line-clamp-1">
                      {post.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* --- Footer Section --- */}
                    <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">
                        Read Article
                      </span>

                      {/* Explore Button */}
                      <button className="relative overflow-hidden group/btn bg-gray-900 text-white pl-6 pr-5 py-3 rounded-full font-bold text-sm shadow-lg shadow-gray-900/20 transition-all hover:shadow-gray-900/40 hover:-translate-y-1">
                        <span className="relative z-10 flex items-center gap-2">
                          Read
                          <div className="bg-white/20 p-1 rounded-full group-hover/btn:translate-x-1 transition-transform">
                            <ArrowRight size={14} />
                          </div>
                        </span>
                        {/* Hover Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                      </button>
                    </div>
                  </div>
                </div>
              ));
            })()
          )}
        </div>
      </section>

      <style>{`
        @keyframes subtle-zoom {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.15); }
        }
        .animate-subtle-zoom {
          animation: subtle-zoom 20s infinite alternate ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Blog;
