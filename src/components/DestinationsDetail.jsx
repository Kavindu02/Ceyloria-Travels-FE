import React from "react";
import { ChevronLeft, MapPin, Compass, ArrowRight } from "lucide-react";

const DestinationsDetail = ({ selectedCategory, onBack }) => {
    return (
        <section className="animate-fade-in pb-20 bg-gray-50 min-h-screen">
            
            {/* --- IMMERSIVE HERO SECTION --- */}
            <div className="relative h-[70vh] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={selectedCategory.image}
                        alt={selectedCategory.title}
                        className="w-full h-full object-cover animate-subtle-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-gray-50" />
                </div>

                <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-32">
                    
                    <div className="max-w-4xl space-y-6 animate-fade-in-up">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none drop-shadow-2xl">
                            {selectedCategory.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-200 font-light italic border-l-4 border-blue-500 pl-6 max-w-2xl">
                            {selectedCategory.tagline}
                        </p>
                        <p className="text-gray-300 max-w-xl text-lg leading-relaxed pt-4">
                            {selectedCategory.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* --- SHOWCASE / TRAVEL GUIDE LAYOUT --- */}
            <div className="container mx-auto px-6 -mt-20 relative z-20 space-y-24 pb-24">
                {selectedCategory.destinations.map((dest, index) => (
                    <div
                        key={dest.id}
                        className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                    >
                        {/* Image Side */}
                        <div className="w-full lg:w-1/2 group">
                            <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-3xl">
                                <img
                                    src={dest.image}
                                    alt={dest.title}
                                    className="h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                
                                {/* Decorative Badge */}
                                <div className={`absolute top-8 ${index % 2 !== 0 ? 'right-8' : 'left-8'} bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-lg`}>
                                    <MapPin className="text-white drop-shadow-md" size={32} />
                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
                            <div className="space-y-4">
                                <span className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest">
                                    Must Visit
                                </span>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                                    {dest.title}
                                </h2>
                                <div className="h-1.5 w-24 bg-blue-600 rounded-full mx-auto lg:mx-0" />
                            </div>

                            <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-light">
                                {dest.description}
                            </p>

                            {/* Optional: Add extra details if avail (Mock data simulated for design) */}
                            <div className={`flex flex-wrap gap-6 justify-center lg:justify-start pt-4 text-gray-400 font-medium text-sm border-t border-gray-100 mt-8`}>
                                <div className="flex items-center gap-2">
                                    <Compass size={18} className="text-blue-400" />
                                    <span>Scenic Views</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={18} className="text-blue-400" />
                                    <span>Top Location</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DestinationsDetail;
