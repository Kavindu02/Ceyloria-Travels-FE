import React from "react";
import { ArrowRight } from "lucide-react";

const DestinationsOverview = ({ categoryData, onSelectCategory }) => {
  return (
    <>
      {/* --- HERO SECTION --- */}
      <div className="relative h-[60vh] md:h-[80vh] w-full bg-gray-900 overflow-hidden rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-2xl z-10 transition-all duration-700">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039&auto=format&fit=crop"
            alt="Sri Lanka Destinations"
            className="w-full h-full object-cover scale-105 animate-subtle-zoom opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-blue-900/40 to-transparent mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-transparent to-gray-900/30" />
        </div>

        <div className="relative h-full container mx-auto px-6 flex flex-col justify-center pb-10">
          <div className="max-w-4xl space-y-6 md:space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-tight md:leading-[0.9] drop-shadow-2xl">
              Island <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Wonders
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed border-l-4 border-cyan-400 pl-6">
              From misty mountains to golden shores, explore the most iconic
              experiences across the pearl of the Indian Ocean.
            </p>
          </div>
        </div>
      </div>

      {/* --- CATEGORY OVERVIEW VIEW --- */}
      <section className="relative py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Select Your Journey
          </h2>
          <p className="text-gray-500 font-medium tracking-wide first-letter:uppercase">
            Discover Sri Lanka by experience
          </p>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categoryData.map((cat) => (
            <div
              key={cat.id}
              className="group relative bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 flex flex-col h-full"
              onClick={() => onSelectCategory(cat)}
            >
              {/* --- Image Section --- */}
              <div className="relative h-72 overflow-hidden bg-gray-100 cursor-pointer">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />

                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Top Badges (Optional layout similar to TravelCard) */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
                  <div className="bg-white/90 backdrop-blur-md text-gray-800 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-sm border border-white/50">
                    <span className="uppercase tracking-wide">
                      {cat.destinations?.length || 0} Locations
                    </span>
                  </div>
                </div>
              </div>

              {/* --- Content Section --- */}
              <div className="p-8 flex flex-col flex-grow relative cursor-pointer">
                {/* Title */}
                <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight line-clamp-1">
                  {cat.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-2">
                  {cat.tagline}
                </p>

                {/* --- Footer Section --- */}
                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
                  {/* This section can be empty or have a subtle label, keeping button on right to match style */}
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">
                    View Collection
                  </span>

                  {/* Explore Button */}
                  <button className="relative overflow-hidden group/btn bg-gray-900 text-white pl-6 pr-5 py-3 rounded-full font-bold text-sm shadow-lg shadow-gray-900/20 transition-all hover:shadow-gray-900/40 hover:-translate-y-1">
                    <span className="relative z-10 flex items-center gap-2">
                      Explore
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
          ))}
        </div>
      </section>
    </>
  );
};

export default DestinationsOverview;
