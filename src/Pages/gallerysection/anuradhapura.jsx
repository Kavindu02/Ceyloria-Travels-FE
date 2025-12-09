import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Compass, Star, ArrowDown, Clock, History } from 'lucide-react'; 

const AnuradhapuraPage = () => {
  const [scrolled, setScrolled] = useState(false);
  // Map Pin Location (Anuradhapura Coordinates)
  const mapLocation = { x: 45, y: 38, label: "Anuradhapura" };

  // Scroll listener for nice reveal effects (optional)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans text-slate-800 bg-slate-50 selection:bg-amber-200 selection:text-amber-900">
      
      {/* ==================== 1. IMMERSIVE HERO SECTION ==================== */}
      <div className="relative h-[90vh] w-full overflow-hidden">
        {/* Parallax-style Background with Slow Zoom Animation */}
        <div className="absolute inset-0">
            <img 
            src="/pagesPhotos/anuradhapura/hero.png" 
            alt="Anuradhapura Ruwanwelisaya Stupa" 
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/90"></div>
        </div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 pt-20">
          <div className="animate-fade-in-up">
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium text-white mb-6 tracking-tight drop-shadow-2xl">
              Anuradhapura
            </h1>
            <p className="text-lg md:text-2xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed tracking-wide">
              The First Capital. The Sacred City. The Beginning of a Civilization.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
            <ArrowDown className="w-6 h-6" />
        </div>
      </div>

      {/* ==================== 2. FLOATING STATS BAR (New Interactive Element) ==================== */}
      <div className="relative z-20 max-w-6xl mx-auto -mt-16 px-6">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-slate-100 items-center">
            <div className="text-center group cursor-default">
                <div className="flex justify-center mb-2 text-amber-500"><History size={20}/></div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Founded</p>
                <p className="text-xl font-serif font-bold text-slate-800 group-hover:text-amber-600 transition-colors">4th Century BC</p>
            </div>
            <div className="text-center pl-4 group cursor-default">
                <div className="flex justify-center mb-2 text-amber-500"><Clock size={20}/></div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Dynasty Duration</p>
                <p className="text-xl font-serif font-bold text-slate-800 group-hover:text-amber-600 transition-colors">1,000+ Years</p>
            </div>
            <div className="text-center pl-4 group cursor-default">
                <div className="flex justify-center mb-2 text-amber-500"><Star size={20}/></div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Significance</p>
                <p className="text-xl font-serif font-bold text-slate-800 group-hover:text-amber-600 transition-colors">First Capital</p>
            </div>
            <div className="text-center pl-4 flex items-center justify-center">
                 <button className="bg-slate-900 hover:bg-amber-600 text-white rounded-full p-4 transition-all shadow-lg hover:scale-110">
                    <ArrowDown className="w-5 h-5" />
                 </button>
            </div>
        </div>
      </div>

      {/* ==================== 3. NARRATIVE & MAP SECTION ==================== */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Narrative Text */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
              A Kingdom of <span className="italic text-amber-600">Colossal</span> Proportions
            </h2>
            <div className="prose prose-lg text-slate-600">
                <p className="leading-relaxed">
                   Anuradhapura was the first historical capital of Sri Lanka, and its marvels still radiate greatness. Reigning for over a millennium, the kingdom had 117 rulers who built magnificent palaces, great reservoirs and irrigation systems, pleasure gardens and Buddhist temples.
                </p>
                <p className="leading-relaxed">
                   Some of these structures are amongst the biggest architectural creations of the ancient world, smaller in size only to the pyramids of Giza.
                </p>
            </div>
            
            {/* Fact Box */}
            <div className="border-l-4 border-amber-500 pl-6 py-4 bg-amber-50 rounded-r-xl">
                <p className="text-xs font-bold text-amber-900 uppercase tracking-widest mb-1">Traveler Tip</p>
                <p className="text-slate-700 italic text-sm">
                    "The surviving ruins, and the restored temples and stupas are just a few of the places to visit in the sacred city."
                </p>
            </div>
          </div>

          {/* Right: Interactive Map Card */}
          <div className="lg:col-span-5 relative group">
             <div className="bg-white p-3 rounded-[2rem] shadow-2xl border border-slate-100 relative overflow-hidden transform transition-transform duration-700 hover:-translate-y-2">
                
                {/* Map Tag */}
                <div className="absolute top-6 left-6 z-10">
                    <span className="flex items-center gap-2 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 shadow-sm border border-slate-200">
                        <Compass className="w-3 h-3 text-amber-500" /> Location Context
                    </span>
                </div>

                {/* The Map Image */}
                <img 
                  src="/srilanka-map.png" 
                  alt="Map of Sri Lanka" 
                  className="w-full h-auto object-contain opacity-90 rounded-3xl"
                />
                
                {/* Interactive Pin Logic */}
                <div 
                  className="absolute" 
                  style={{ left: `${mapLocation.x}%`, top: `${mapLocation.y}%` }}
                >
                    <div className="w-6 h-6 bg-amber-500/30 rounded-full absolute -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
                    <div className="w-3 h-3 bg-amber-600 rounded-full absolute -translate-x-1/2 -translate-y-1/2 border-2 border-white shadow-md z-20"></div>
                    
                    {/* Tooltip Label */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 bg-slate-900 text-white text-xs px-4 py-2 rounded-lg shadow-xl font-medium tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
                        <div className="flex items-center gap-2">
                             <MapPin size={10} /> {mapLocation.label}
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-900"></div>
                    </div>
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* ==================== 4. FEATURED EXPERIENCES (PRESERVED AS REQUESTED) ==================== */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-purple-600 font-bold uppercase tracking-widest text-xs mb-2 block">
                Discover
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
                [cite_start]Featured Experiences in Anuradhapura 
              </h2>
            </div>
            <p className="text-gray-500 max-w-sm text-sm md:text-right pb-2">
              Immerse yourself in the sacred history and architectural marvels of the ancient capital.
            </p>
          </div>

          {/* Modern Card Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Sri Maha Bodhiya */}
            <div className="group relative h-[500px] overflow-hidden rounded-3xl cursor-pointer shadow-xl">
              <img 
                src="/pagesPhotos/anuradhapura/Sri Maha Bodhiya.png" 
                alt="Sri Maha Bodhiya" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                <div className="w-12 h-1 bg-yellow-500 mb-4 transition-all duration-300 group-hover:w-20"></div>
                <h3 className="text-2xl font-serif font-bold text-white mb-3">Sri Maha Bodhiya </h3>
                <p className="text-gray-300 text-sm leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500 ease-in-out overflow-hidden">
                  Considered to be the oldest planted tree in the world with a recorded history, this sacred Bo tree dates back to 245 BC.
                </p>
                <div className="mt-4 flex items-center text-white/80 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                  Explore <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Card 2: Ruwanweli Maha Seya */}
            <div className="group relative h-[500px] overflow-hidden rounded-3xl cursor-pointer shadow-xl">
              <img 
                src="/pagesPhotos/anuradhapura/Ruwanweli Maha Seya.png" 
                alt="Ruwanweli Maha Seya" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                <div className="w-12 h-1 bg-yellow-500 mb-4 transition-all duration-300 group-hover:w-20"></div>
                <h3 className="text-2xl font-serif font-bold text-white mb-3">Ruwanweli Maha Seya </h3>
                <p className="text-gray-300 text-sm leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500 ease-in-out overflow-hidden">
                 Built by King Dutugemuna around 140 BC, this giant stupa contains the largest collection of relics of Lord Buddha.
                </p>
                <div className="mt-4 flex items-center text-white/80 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                  Explore <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Card 3: Mihintale */}
            <div className="group relative h-[500px] overflow-hidden rounded-3xl cursor-pointer shadow-xl">
              <img 
                src="/pagesPhotos/anuradhapura/Mihintale.png" 
                alt="Mihintale" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                <div className="w-12 h-1 bg-yellow-500 mb-4 transition-all duration-300 group-hover:w-20"></div>
                <h3 className="text-2xl font-serif font-bold text-white mb-3">Mihintale </h3>
                <p className="text-gray-300 text-sm leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500 ease-in-out overflow-hidden">
                   Deemed the birthplace of Buddhism in Sri Lanka, this 500m tall outcrop features ancient stupas and cave dwellings.
                </p>
                <div className="mt-4 flex items-center text-white/80 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                  Explore <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== 5. EDITORIAL BLOG SECTION ==================== */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-slate-50">
        <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-3 block">Travel Journal</span>
            <h2 className="text-4xl font-serif text-slate-900 mb-4">Journey Beyond the Guidebooks </h2>
            <div className="w-16 h-1 bg-slate-200 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Article 1 - Image Top */}
            <div className="group flex flex-col gap-6 cursor-pointer">
                <div className="overflow-hidden rounded-2xl h-80 w-full relative shadow-md">
                    <img src="/pagesPhotos/anuradhapura/spa.png" alt="Spa" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-slate-800">Local Insights</div>
                </div>
                <div>
                    <h3 className="text-2xl font-serif font-bold text-slate-800 mb-3 group-hover:text-amber-600 transition-colors">
                      [cite_start]Unravelling the Secrets of Unexplored Destinations 
                    </h3>
                    <p className="text-slate-500 leading-relaxed mb-4 line-clamp-2">
                        Step off the beaten path and discover the hidden gems that lie in the shadow of the great stupas...
                    </p>
                    <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 group-hover:border-amber-500 transition-all">
                        Read Article <ArrowRight size={14} className="ml-2"/>
                    </span>
                </div>
            </div>

            {/* Article 2 - Image Top */}
            <div className="group flex flex-col gap-6 cursor-pointer">
                <div className="overflow-hidden rounded-2xl h-80 w-full relative shadow-md">
                    <img src="/pagesPhotos/anuradhapura/wildlife.png" alt="Elephant" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-slate-800">Travel Tales</div>
                </div>
                <div>
                    <h3 className="text-2xl font-serif font-bold text-slate-800 mb-3 group-hover:text-amber-600 transition-colors">
                      [cite_start]Exploring Sri Lanka's Flavourful Tapestry
                    </h3>
                    <p className="text-slate-500 leading-relaxed mb-4 line-clamp-2">
                        A culinary journey through the rice paddies and village kitchens of the North Central Province...
                    </p>
                    <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 group-hover:border-amber-500 transition-all">
                        Read Article <ArrowRight size={14} className="ml-2"/>
                    </span>
                </div>
            </div>
        </div>
      </section>

      {/* ==================== 6. EXCLUSIVE OFFERS ==================== */}
      <section className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12">
               <div>
                 <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-2 block">Premium Packages</span>
                 <h2 className="text-3xl md:text-5xl font-serif text-slate-900">Unmatched Deals </h2>
               </div>
               <a href="#" className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-amber-600 transition-colors mt-4 md:mt-0">
                   View All Offers <ArrowRight className="w-4 h-4" />
               </a>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {/* Offer Card 1 */}
               <div className="relative h-[480px] rounded-3xl overflow-hidden group cursor-pointer shadow-2xl">
                   <img src="/pagesPhotos/anuradhapura/spa.png" alt="Wellness" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>
                   
                   <div className="absolute top-6 right-6 bg-white text-slate-900 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg z-10">
                       Save 20%
                   </div>

                   <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                       <h3 className="text-3xl font-serif text-white mb-2">Luxe Wellness </h3>
                       <p className="text-white/80 text-sm line-clamp-2 mb-4 font-light">
                          Immerse yourself in bespoke retreats crafted for ultimate rejuvenation. From exotic spa therapies to exclusive mindfulness escapes.
                       </p>
                       <div className="flex items-center justify-between border-t border-white/20 pt-4">
                           <div className="flex flex-col">
                               <span className="text-xs text-white/60 uppercase tracking-widest">Starting From</span>
                               <span className="text-xl font-bold text-white">$2,900 </span>
                           </div>
                           <button className="bg-white/10 backdrop-blur border border-white/30 text-white px-6 py-2 rounded-full hover:bg-white hover:text-slate-900 transition-all font-medium uppercase text-xs tracking-widest">
                               Reserve
                           </button>
                       </div>
                   </div>
               </div>

               {/* Offer Card 2 */}
               <div className="relative h-[480px] rounded-3xl overflow-hidden group cursor-pointer shadow-2xl">
                   <img src="/pagesPhotos/anuradhapura/spa.png" alt="Winter" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>
                   
                   <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                       [cite_start]<h3 className="text-3xl font-serif text-white mb-2">Luxury Winter Getaway </h3>
                       <p className="text-white/80 text-sm line-clamp-2 mb-4 font-light">
                          [cite_start]Embrace the season's charm with our Luxury Winter Getaway Offer. Bask in the cozy embrace of opulent accommodations.
                       </p>
                       <div className="flex items-center justify-between border-t border-white/20 pt-4">
                           <div className="flex flex-col">
                               <span className="text-xs text-white/60 uppercase tracking-widest">Starting From</span>
                               [cite_start]<span className="text-xl font-bold text-white">$3,360 </span>
                           </div>
                           <button className="bg-white/10 backdrop-blur border border-white/30 text-white px-6 py-2 rounded-full hover:bg-white hover:text-slate-900 transition-all font-medium uppercase text-xs tracking-widest">
                               Reserve
                           </button>
                       </div>
                   </div>
               </div>
           </div>
        </div>
      </section>

      
      
      {/* CSS Animations (Inline for simplicity) */}
      <style>{`
        @keyframes slow-zoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
            animation: slow-zoom 20s infinite alternate ease-in-out;
        }
        @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AnuradhapuraPage;