import React, { useState, useEffect } from "react";
import { ArrowRight, Calendar, User, Tag, Clock, ChevronRight, Mail, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/blogs`);
      const data = await res.json();
      setBlogPosts(data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
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

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          {filteredPosts.map((post) => (
            <div
              id={post.anchor}
              key={post.id}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-500 group flex flex-col h-full transform hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg">
                    {post.category}
                  </span>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content Container */}
              <div className="p-8 md:p-10 flex flex-col flex-1">


                <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 leading-tight group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-500 leading-relaxed line-clamp-3 mb-8 text-lg font-light">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black text-sm">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">{post.author}</p>
                      <p className="text-[10px] text-gray-400 font-medium">Travel Expert</p>
                    </div>
                  </div>

                  <Link
                    to={`/blog/${post._id}`}
                    className="relative overflow-hidden group/btn bg-gray-50 text-gray-900 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300"
                  >
                    <ArrowRight size={24} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {filteredPosts.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                <Search size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">No results found</h3>
              <p className="text-gray-500 mt-2">Try searching for something else like "Colombo" or "Nature"</p>
            </div>
          )}
        </div>
      </section>

      <style jsx global>{`
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
