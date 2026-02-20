import React, { useState, useEffect } from "react";
import { ArrowRight, MapPin, Compass, Search, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Destinations = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const destinations = [
        {
            id: "anuradhapura",
            title: "Anuradhapura",
            subtitle: "The Sacred City",
            image: "/pagesPhotos/anuradhapura/hero.png",
            description: "The first capital of Sri Lanka, home to magnificent stupas and ancient hydraulic civilizations.",
            tag: "Heritage",
            link: "/anuradhapura"
        },
        {
            id: "colombo",
            title: "Colombo",
            subtitle: "The Vibrant Metropolis",
            image: "/pagesPhotos/colombo/hero.png",
            description: "A blend of colonial charm and modern skyline, the commercial heartbeat of the island.",
            tag: "City Life",
            link: "/colombo"
        },
        {
            id: "ella",
            title: "Ella",
            subtitle: "The Misty Highlands",
            image: "/pagesPhotos/ella/hero.png",
            description: "Famous for its breathtaking mountain views, tea plantations, and the iconic Nine Arch Bridge.",
            tag: "Mountains",
            link: "/ella"
        },
        {
            id: "galle",
            title: "Galle",
            subtitle: "The Colonial Jewel",
            image: "/pagesPhotos/galle/hero.png",
            description: "A UNESCO World Heritage site known for its historic fort, cobblestone streets, and coastal beauty.",
            tag: "Coastal",
            link: "/galle"
        },
        {
            id: "sigiriya",
            title: "Sigiriya",
            subtitle: "The Lion Rock",
            image: "/pagesPhotos/sigiriya/hero.png",
            description: "An ancient rock fortress rising 200 meters, featuring stunning frescoes and a mirror wall.",
            tag: "History",
            link: "/sigiriyafortress"
        }
    ];

    const filteredDestinations = destinations.filter(dest =>
        dest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="font-sans text-gray-800 bg-white selection:bg-blue-600 selection:text-white overflow-x-hidden">

            {/* --- HERO SECTION --- */}
            <div className="relative h-[60vh] md:h-[80vh] w-full bg-gray-900 overflow-hidden rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-2xl z-10">

                {/* Parallax Background Image */}
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039&auto=format&fit=crop"
                        alt="Sri Lanka Destinations"
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
                            Island <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                                Wonders
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed border-l-4 border-cyan-400 pl-6">
                            From misty mountains to golden shores, explore the most iconic destinations across the pearl of the Indian Ocean.
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
                            placeholder="Search for a destination..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-gray-100 rounded-[2rem] pl-16 pr-8 py-5 shadow-xl outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all font-medium text-lg placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* --- DESTINATIONS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {filteredDestinations.length > 0 ? (
                        filteredDestinations.map((dest) => (
                            <Link
                                to={dest.link}
                                key={dest.id}
                                className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-500 group flex flex-col h-[500px] transform hover:-translate-y-2 relative"
                            >
                                {/* Image Background */}
                                <div className="absolute inset-0 h-full w-full">
                                    <img
                                        src={dest.image}
                                        alt={dest.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                                </div>

                                {/* Content Container */}
                                <div className="mt-auto p-8 relative z-10">
                                    <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg mb-4 inline-block">
                                        {dest.tag}
                                    </span>

                                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight group-hover:text-cyan-400 transition-colors">
                                        {dest.title}
                                    </h3>

                                    <p className="text-gray-300 leading-relaxed line-clamp-2 mb-6 text-sm font-light">
                                        {dest.description}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                        <div className="flex items-center gap-2 text-white">
                                            <MapPin size={16} className="text-cyan-400" />
                                            <span className="text-xs font-bold uppercase tracking-wider">{dest.subtitle}</span>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors">
                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                                <Search size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">No destinations found</h3>
                            <p className="text-gray-500 mt-2">Try searching for something else</p>
                        </div>
                    )}
                </div>
            </section>

            {/* --- CTA SECTION --- */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto rounded-[3rem] bg-gray-900 overflow-hidden relative shadow-3xl">
                    <div className="absolute inset-0 opacity-30">
                        <img
                            src="https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=2070&auto=format&fit=crop"
                            alt="Plan Your Trip"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent" />
                    </div>

                    <div className="relative z-10 p-10 md:p-20 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="max-w-xl text-center md:text-left">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                                Ready to start your <span className="text-cyan-400">adventure?</span>
                            </h2>
                            <p className="text-gray-400 text-lg">
                                Explore our curated travel packages and find the perfect journey tailored just for you.
                            </p>
                        </div>
                        <Link
                            to="/packages"
                            className="bg-white text-gray-900 px-10 py-5 rounded-full font-black text-lg hover:bg-cyan-400 hover:scale-105 transition-all shadow-xl shadow-cyan-400/20 flex items-center gap-3"
                        >
                            View Packages <Compass size={24} />
                        </Link>
                    </div>
                </div>
            </section>

            <style jsx="true" global="true">{`
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

export default Destinations;
