import React, { useState, useEffect } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Activities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/activities`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setActivities(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch activities:", error);
      setError("Unable to load activities. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
    window.scrollTo(0, 0);
  }, []);

  const filteredActivities = (activities || []).filter(activity => {
    const title = activity?.title || "";
    const category = activity?.category || "";
    const search = searchTerm.toLowerCase();
    return title.toLowerCase().includes(search) || category.toLowerCase().includes(search);
  });

  return (
    <div className="font-sans text-gray-800 bg-white selection:bg-blue-600 selection:text-white overflow-x-hidden min-h-screen">

      {/* --- HERO SECTION (Matched to Destinations) --- */}
      <div className="relative h-[60vh] md:h-[80vh] w-full bg-gray-900 overflow-hidden rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-2xl z-10 transition-all duration-700">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1544450173-8c8797913cf9?q=80&w=2070&auto=format&fit=crop"
            alt="Sri Lanka Activities"
            className="w-full h-full object-cover scale-105 animate-subtle-zoom opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-blue-900/40 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-transparent to-gray-900/30" />
        </div>

        <div className="relative h-full container mx-auto px-6 flex flex-col justify-center pb-10">
          <div className="max-w-4xl space-y-6 md:space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-tight md:leading-[0.9] drop-shadow-2xl">
              Adventure <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Awaits
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed border-l-4 border-cyan-400 pl-6">
              Dive into the heart of Sri Lanka. From thrilling expeditions to tranquil rejuvenation, discover experiences that stay with you forever.
            </p>
          </div>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <section className="relative py-24 container mx-auto px-6">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px] -z-10 opacity-60" />
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
             Discover Your Spirit
          </h2>
          <p className="text-gray-500 font-medium tracking-wide first-letter:uppercase">
             Our handpicked selection of premium activities
          </p>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full" />
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-20">
          <div className="relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
              <Search size={24} />
            </div>
            <input
              type="text"
              placeholder="Search for activities or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-100 rounded-[2rem] pl-16 pr-8 py-5 shadow-xl outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-medium text-lg placeholder-gray-400"
            />
          </div>
        </div>

        {/* --- ACTIVITY GRID (Matched to Destinations Card) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full py-20 text-center">
              <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500 font-medium">Loading adventures...</p>
            </div>
          ) : error ? (
            <div className="col-span-full py-20 text-center">
              <p className="text-red-500 font-bold text-xl">{error}</p>
              <button onClick={fetchActivities} className="mt-4 text-blue-600 hover:underline font-bold">Try refreshing</button>
            </div>
          ) : filteredActivities.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                <Search size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">No results found</h3>
              <p className="text-gray-500 mt-2">Try searching for something else like "Water Sports" or "Culture"</p>
            </div>
          ) : (
            filteredActivities.map((activity) => (
              <div
                key={activity._id}
                className="group relative bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 flex flex-col h-full cursor-pointer"
                onClick={() => navigate(`/activity/${activity._id}`)}
              >
                {/* --- Image Section --- */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="bg-white/90 backdrop-blur-md text-gray-800 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm border border-white/50 uppercase tracking-widest">
                       {activity.category}
                    </div>
                  </div>
                </div>

                {/* --- Content Section --- */}
                <div className="p-6 flex flex-col flex-grow relative">
                  <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight line-clamp-1">
                    {activity.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                    {activity.tagline}
                  </p>

                  {/* --- Footer Section --- */}
                  <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between gap-4">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">
                       Experience More
                    </span>

                    {/* Explore Button */}
                    <button className="relative overflow-hidden group/btn bg-gray-900 text-white pl-5 pr-4 py-2.5 rounded-full font-bold text-xs shadow-lg shadow-gray-900/20 transition-all hover:shadow-gray-900/40 hover:-translate-y-0.5">
                      <span className="relative z-10 flex items-center gap-2">
                        Explore
                        <div className="bg-white/20 p-1 rounded-full group-hover/btn:translate-x-1 transition-transform">
                          <ArrowRight size={12} />
                        </div>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                    </button>
                  </div>
                </div>
              </div>
            ))
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
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Activities;
