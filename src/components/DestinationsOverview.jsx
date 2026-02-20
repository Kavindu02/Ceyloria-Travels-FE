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
                            From misty mountains to golden shores, explore the most iconic experiences across the pearl of the Indian Ocean.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- CATEGORY OVERVIEW VIEW --- */}
            <section className="relative py-24 container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">Select Your Journey</h2>
                    <p className="text-gray-500 font-medium tracking-wide first-letter:uppercase">Discover Sri Lanka by experience</p>
                    <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categoryData.map((cat) => (
                        <div
                            key={cat.id}
                            onClick={() => onSelectCategory(cat)}
                            className={`group cursor-pointer transition-all duration-700 transform hover:-translate-y-3 relative`}
                        >
                            <div className="relative bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] h-[440px] flex flex-col justify-end overflow-hidden border border-gray-50 transition-all duration-500">

                                <div className="absolute top-0 right-0 w-[88%] h-[60%] overflow-hidden rounded-bl-[4rem] z-0 shadow-inner">
                                    <img
                                        src={cat.image}
                                        alt={cat.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40" />
                                </div>

                                <div className="relative z-10 w-full">
                                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                                        {cat.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed italic">
                                        {cat.tagline}
                                    </p>

                                    <div className="mt-8 flex items-center gap-2 text-blue-600 font-bold group-hover:gap-4 transition-all duration-300">
                                        <span className="text-xs uppercase tracking-widest">Explore</span>
                                        <ArrowRight size={18} />
                                    </div>
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
