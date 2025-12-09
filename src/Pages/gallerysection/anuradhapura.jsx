import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, MapPin, Compass, Star, ArrowDown, Clock, History, ChevronRight, Play } from 'lucide-react';

const AnuradhapuraPage = () => {
  // --- Custom Hook for Scroll Animations ---
  const useElementOnScreen = (options) => {
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) setIsVisible(true);
      }, options);

      if (containerRef.current) observer.observe(containerRef.current);

      return () => {
        if (containerRef.current) observer.unobserve(containerRef.current);
      };
    }, [containerRef, options]);

    return [containerRef, isVisible];
  };

  // --- Scroll Progress Bar Logic ---
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans text-stone-800 bg-stone-50 selection:bg-amber-200 selection:text-amber-900 overflow-x-hidden">
      
      {/* Sticky Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-amber-600 z-50 transition-all duration-300 ease-out" style={{ width: `${scrollProgress * 100}%` }} />

      {/* ==================== 1. CINEMATIC HERO SECTION ==================== */}
      <div className="relative h-[95vh] w-full overflow-hidden group">
        
        {/* Background Image with Slow Parallax Scale */}
        <div className="absolute inset-0 overflow-hidden">
            <img 
              src="/pagesPhotos/anuradhapura/hero.png" 
              alt="Anuradhapura Ruwanwelisaya Stupa" 
              className="w-full h-full object-cover scale-105 animate-slow-pan"
            />
            {/* Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-stone-900/90 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        {/* Navigation / Header Area (Simulated) */}
        <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-30 text-white/90">
             <div className="text-xs font-bold tracking-[0.3em] uppercase border-b border-transparent hover:border-amber-500 transition-colors cursor-pointer">
                SDK Travel
             </div>
             <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest uppercase">
                <span className="hover:text-amber-400 cursor-pointer transition-colors">History</span>
                <span className="hover:text-amber-400 cursor-pointer transition-colors">Destinations</span>
                <span className="hover:text-amber-400 cursor-pointer transition-colors">Luxury</span>
             </div>
        </div>

        {/* Hero Content - Bottom Aligned & Modern */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 z-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            {/* Title Block */}
            <div className="lg:col-span-8 animate-slide-up">
              <span className="inline-block px-3 py-1 mb-4 border border-white/30 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-white backdrop-blur-md">
                The Sacred City
              </span>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white leading-[0.9] tracking-tighter mb-6">
                Anuradha<span className="text-amber-500 italic">pura</span>
              </h1>
              <p className="text-lg md:text-xl text-stone-200 font-light max-w-2xl leading-relaxed border-l-2 border-amber-500 pl-6">
                The first capital. A testament to a civilization that mastered stone and water while the rest of the world slept.
              </p>
            </div>

            {/* Interactive Play/Explore Block */}
            <div className="lg:col-span-4 flex justify-start lg:justify-end pb-2">
                <button className="group relative flex items-center gap-4 pl-2 pr-6 py-2 overflow-hidden rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-amber-600 hover:border-amber-600 transition-all duration-500">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-stone-900 group-hover:scale-110 transition-transform">
                        <ArrowDown size={18} />
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase text-white">Begin Journey</span>
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== 2. ELEGANT STATS STRIP ==================== */}
      <div className="bg-stone-900 text-white py-12 px-6 border-b border-stone-800">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-stone-800/50">
            {[
                { label: "Established", value: "4th Century BC", icon: History },
                { label: "Reign", value: "1,300 Years", icon: Clock },
                { label: "Status", value: "UNESCO Site", icon: Star },
                { label: "Location", value: "North Central", icon: MapPin },
            ].map((stat, idx) => (
                <div key={idx} className="pl-4 md:pl-8 group cursor-default">
                    <stat.icon className="w-5 h-5 text-amber-600 mb-3 group-hover:animate-bounce" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-1">{stat.label}</p>
                    <p className="text-xl md:text-2xl font-serif text-stone-100">{stat.value}</p>
                </div>
            ))}
        </div>
      </div>

      {/* ==================== 3. NARRATIVE & MAP (Asymmetrical Layout) ==================== */}
      <section className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="relative">
             {/* Decorative Background Text */}
            <div className="absolute -top-20 -left-20 text-[12rem] font-serif text-stone-100 select-none opacity-50 z-0 leading-none">
                KINGDOM
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                {/* Image/Map Side (Spans 7 columns) */}
                <div className="lg:col-span-7 relative group">
                    <div className="relative rounded-[2rem] overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.01]">
                         <img 
                            src="/srilanka-map.png" 
                            alt="Map of Sri Lanka" 
                            className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                         />
                         {/* Animated Pin */}
                         <div className="absolute top-[38%] left-[45%] translate-x-[-50%] translate-y-[-50%]">
                            <span className="relative flex h-8 w-8">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-8 w-8 bg-amber-500 border-4 border-white shadow-lg"></span>
                            </span>
                            <div className="absolute left-10 top-1 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-xl text-xs font-bold uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-4 group-hover:translate-x-0">
                                You are here
                            </div>
                         </div>
                    </div>
                </div>

                {/* Text Side (Overlaps visually on large screens) */}
                <div className="lg:col-span-5 lg:-ml-20 mt-8 lg:mt-0">
                    <div className="bg-white/90 backdrop-blur-xl p-8 md:p-12 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white/50">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-12 h-[1px] bg-amber-600"></span>
                            <span className="text-amber-600 text-xs font-bold uppercase tracking-widest">The Origin Story</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight mb-6">
                            Where History is <br/><span className="italic text-stone-400">Etched in Stone.</span>
                        </h2>
                        <div className="space-y-4 text-stone-600 font-light leading-relaxed">
                            <p>
                                Anuradhapura was not merely a city; it was a hydraulic civilization that defied the engineering limitations of the ancient world. 
                            </p>
                            <p>
                                Reigning for over a millennium, 117 rulers built magnificent palaces and stupas smaller in size only to the pyramids of Giza. Today, the ruins whisper tales of a golden era.
                            </p>
                        </div>
                        <div className="mt-8 pt-8 border-t border-stone-100 flex items-center gap-4">
                             <div className="bg-amber-50 p-3 rounded-full text-amber-600">
                                <Compass size={24} />
                             </div>
                             <div>
                                <p className="text-xs font-bold uppercase text-stone-400">Travel Distance</p>
                                <p className="font-serif text-lg text-stone-800">205 km from Colombo</p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* ==================== 4. FEATURED EXPERIENCES (Modern Cards) ==================== */}
      <section className="bg-white py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
                 <span className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-3 block">Curated Exploration</span>
                 <h2 className="text-4xl md:text-6xl font-serif text-stone-900">Iconic Landmarks</h2>
            </div>
            <div className="flex gap-2">
                <button className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all"><ArrowRight className="rotate-180" size={18}/></button>
                <button className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all"><ArrowRight size={18}/></button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <ExperienceCard 
                img="/pagesPhotos/anuradhapura/Sri Maha Bodhiya.png"
                title="Sri Maha Bodhiya"
                subtitle="The Sacred Fig Tree"
                desc="The oldest living human-planted tree in the world, a direct sapling from the Bodhi tree under which the Buddha attained enlightenment."
             />
             <ExperienceCard 
                img="/pagesPhotos/anuradhapura/Ruwanweli Maha Seya.png"
                title="Ruwanweli Seya"
                subtitle="The Great Stupa"
                desc="A marvel of ancient engineering, this bubble-shaped stupa enshrines the largest collection of relics of the Buddha."
             />
             <ExperienceCard 
                img="/pagesPhotos/anuradhapura/Mihintale.png"
                title="Mihintale"
                subtitle="The Cradle of Buddhism"
                desc="A mountain peak believed to be the meeting point between the Buddhist monk Mahinda and King Devanampiyatissa."
             />
          </div>
        </div>
      </section>

      {/* ==================== 5. EDITORIAL JOURNAL ==================== */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
         <div className="text-center mb-20">
            <span className="text-stone-400 font-bold uppercase tracking-[0.2em] text-xs">The Journal</span>
            <h2 className="text-5xl font-serif text-stone-900 mt-4 mb-6">Unearthing Secrets</h2>
            <div className="w-[1px] h-16 bg-amber-500 mx-auto"></div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Article 1 */}
            <div className="group cursor-pointer">
                <div className="overflow-hidden h-[400px] mb-8 relative">
                    <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                    <img src="/pagesPhotos/anuradhapura/spa.png" alt="Spa" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"/>
                </div>
                <div className="flex flex-col gap-4 pr-10">
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Wellness & Heritage</span>
                    <h3 className="text-3xl font-serif text-stone-800 leading-snug group-hover:text-amber-700 transition-colors">
                        Healing in the Shadow of Giants: Ancient Ayurveda
                    </h3>
                    <p className="text-stone-500 font-light leading-relaxed">
                        Step off the beaten path and discover the hidden gems that lie in the shadow of the great stupas, where ancient healing practices are still alive.
                    </p>
                    <div className="pt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-900 group-hover:underline decoration-amber-500 underline-offset-4">
                        Read Story <ChevronRight size={14} />
                    </div>
                </div>
            </div>

            {/* Article 2 */}
            <div className="group cursor-pointer mt-12 lg:mt-0">
                <div className="overflow-hidden h-[400px] mb-8 relative">
                    <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                    <img src="/pagesPhotos/anuradhapura/wildlife.png" alt="Wildlife" className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"/>
                </div>
                <div className="flex flex-col gap-4 pr-10">
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Culinary Journey</span>
                    <h3 className="text-3xl font-serif text-stone-800 leading-snug group-hover:text-amber-700 transition-colors">
                        A Taste of the Dry Zone: Village Kitchens
                    </h3>
                    <p className="text-stone-500 font-light leading-relaxed">
                        A culinary journey through the rice paddies and village kitchens of the North Central Province, exploring flavors unchanged for centuries.
                    </p>
                    <div className="pt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-900 group-hover:underline decoration-amber-500 underline-offset-4">
                        Read Story <ChevronRight size={14} />
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* ==================== 6. DARK MODE OFFERS SECTION ==================== */}
      <section className="bg-stone-900 py-32 px-6 text-white relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
                <div>
                   <h2 className="text-4xl md:text-6xl font-serif mb-2">Exclusive Retreats</h2>
                   <p className="text-stone-400 font-light">Curated packages for the discerning traveler.</p>
                </div>
                <button className="hidden md:block px-8 py-3 border border-white/20 rounded-full hover:bg-white hover:text-stone-900 transition-all text-xs font-bold uppercase tracking-widest">
                    View All Offers
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Offer 1 */}
                <div className="bg-stone-800 rounded-3xl p-4 group hover:bg-stone-800/80 transition-colors">
                    <div className="relative h-64 overflow-hidden rounded-2xl mb-6">
                        <img src="/pagesPhotos/anuradhapura/spa.png" alt="Luxury Spa" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                        <div className="absolute top-4 right-4 bg-white text-stone-900 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest">
                            Best Seller
                        </div>
                    </div>
                    <div className="px-4 pb-4">
                        <h3 className="text-2xl font-serif mb-2">Royal Wellness Escape</h3>
                        <p className="text-stone-400 text-sm mb-6 line-clamp-2">Experience the healing powers of ancient kings with our specialized Ayurveda treatments.</p>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-[10px] text-stone-500 uppercase tracking-widest">Starting from</p>
                                <p className="text-xl font-serif text-amber-500">$2,900</p>
                            </div>
                            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-amber-600 transition-colors">
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Offer 2 */}
                <div className="bg-stone-800 rounded-3xl p-4 group hover:bg-stone-800/80 transition-colors">
                    <div className="relative h-64 overflow-hidden rounded-2xl mb-6">
                        <img src="/pagesPhotos/anuradhapura/hero.png" alt="Heritage Tour" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                    </div>
                    <div className="px-4 pb-4">
                        <h3 className="text-2xl font-serif mb-2">The Kingdom Tour</h3>
                        <p className="text-stone-400 text-sm mb-6 line-clamp-2">A private guided tour through the sacred city with an archaeologist expert.</p>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-[10px] text-stone-500 uppercase tracking-widest">Starting from</p>
                                <p className="text-xl font-serif text-amber-500">$3,360</p>
                            </div>
                            <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-amber-600 transition-colors">
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Inline Styles for Custom Animations */}
      <style>{`
        @keyframes slow-pan {
            0% { transform: scale(1.05) translate(0,0); }
            100% { transform: scale(1.15) translate(-1%, -1%); }
        }
        .animate-slow-pan {
            animation: slow-pan 20s infinite alternate ease-in-out;
        }
        @keyframes slide-up {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
            animation: slide-up 1s ease-out forwards;
        }
      `}</style>

    </div>
  );
};

// --- Helper Component for Experience Cards (Cleaner Code) ---
const ExperienceCard = ({ img, title, subtitle, desc }) => (
    <div className="group relative h-[600px] rounded-[2rem] overflow-hidden cursor-pointer">
        <img 
            src={img} 
            alt={title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col justify-end h-full">
            <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{subtitle}</p>
                <h3 className="text-3xl font-serif text-white mb-4">{title}</h3>
                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                    <p className="text-stone-300 text-sm font-light leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity delay-200 duration-500">
                        {desc}
                    </p>
                </div>
                <div className="flex items-center gap-3 text-white/50 group-hover:text-white transition-colors">
                    <div className="h-[1px] w-8 bg-current"></div>
                    <span className="text-xs font-bold uppercase tracking-widest">Discover</span>
                </div>
            </div>
        </div>
    </div>
);

export default AnuradhapuraPage;