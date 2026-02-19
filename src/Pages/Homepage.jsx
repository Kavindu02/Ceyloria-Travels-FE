import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin, Calendar, Users, ArrowRight, Compass } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Gallery from "../components/Gallery";

// IMPORT YOUR CUSTOM LOADER HERE
// Assuming the file is named 'loader.jsx' inside the components folder
import CeyloriaLoader from "../components/loader";

// ---------------------- FONTS & GLOBAL STYLES ----------------------
const fontHead = "font-['Playfair_Display',_serif]";
const fontBody = "font-['DM_Sans',_sans-serif]";

// ---------------------- REUSABLE ANIMATION COMPONENT ----------------------
const Reveal = ({ children, className = "", delay = 0, direction = "up" }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const currentElement = domRef.current;
    if (currentElement) observer.observe(currentElement);
    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, []);

  const getTransform = () => {
    if (!isVisible) {
      if (direction === "up") return "translate-y-20 opacity-0";
      if (direction === "left") return "-translate-x-20 opacity-0";
      if (direction === "right") return "translate-x-20 opacity-0";
    }
    return "translate-y-0 translate-x-0 opacity-100";
  };

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform ${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
};

// ---------------------- DATA ----------------------
const heroSlides = [
  { image: "/gallery/maligawa.png", title: "Temple Of Tooth", subtitle: "Sacred temple of the Tooth Relic", location: "Kandy" },
  { image: "/gallery/sigiriya.png", title: "Sigiriya Fortress", subtitle: "Ancient wonders meet natural beauty", location: "Central Province" },
  { image: "/gallery/ninearch.png", title: "Nine Arch Bridge", subtitle: "Iconic bridge in lush tea country", location: "Ella" },
  { image: "/gallery/colombo2.png", title: "Colombo City", subtitle: "Relax by the scenic coastline", location: "Colombo" },
];

const scrollImages = [
  "/gallery/Galle2.png",
  "/gallery/Petta.png",
  "/gallery/yala.png",
  "/gallery/kithulgala.png",
  "/gallery/maligawa.png",
  "/gallery/mirissa.png",
  "/gallery/ninearch.png",
  "/gallery/sigiriya.png",
];

const packages = [
  { title: "Cultural Triangle", desc: "Explore ancient cities, temples, and UNESCO World Heritage sites across Sri Lanka's cultural heartland.", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", days: "5 Days", people: "2-8" },
  { title: "Coastal Retreat", desc: "Relax on pristine beaches, enjoy water sports, and witness stunning ocean sunsets.", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80", days: "7 Days", people: "2-6" },
  { title: "Hill Country Escape", desc: "Journey through tea plantations, misty mountains, and colonial-era towns.", image: "https://images.unsplash.com/photo-1608481337062-4093bf3ed404?auto=format&fit=crop&w=800&q=80", days: "4 Days", people: "2-10" },
];

const categories = [
  { name: "Popular Beaches", image: "/beach.png", locations: [{ x: 35, y: 95, label: "Mirissa" }, { x: 65, y: 35, label: "Marble Beach" }, { x: 25, y: 89, label: "Hikkaduwa" }, { x: 84, y: 75, label: "Arugam Bay" }] },
  { name: "Wildlife & Nature", image: "/wildlife.png", locations: [{ x: 25, y: 29, label: "Wilpattu" }, { x: 77, y: 83, label: "Yala" }] },
  { name: "Adventure", image: "/adventure.png", locations: [{ x: 40, y: 75, label: "Kithulgala" }, { x: 60, y: 80, label: "Flying Ravana" }] },
  { name: "History & Culture", image: "/culture.png", locations: [{ x: 45, y: 63, label: "Sigiriya" }, { x: 55, y: 48, label: "Polonnaruwa" }, { x: 45, y: 38, label: "Anuradhapura" }] },
  { name: "Lesser Travelled", image: "/lessertraveled.png", locations: [{ x: 38, y: 97, label: "Polhena" }, { x: 38, y: 80, label: "Rathnapura" }] },
  { name: "Gastronomy", image: "/food.png", locations: [{ x: 22, y: 74, label: "Colombo" }, { x: 55, y: 70, label: "Mahiyanganaya" }] },
];

const galleryList = ["/gallery/img1.jpg", "/gallery/img2.jpg", "/gallery/img3.jpg", "/gallery/img4.jpg", "/gallery/img5.jpg", "/gallery/img6.jpg"];

export default function HomePage() {
  // 1. Loader State
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Existing States
  const [current, setCurrent] = useState(0);
  const [activeCategory, setActiveCategory] = useState(null);
  const [progress, setProgress] = useState(0);
  const [latestPackages, setLatestPackages] = useState([]);
  const [_pkgError, _setPkgError] = useState(null);

  // Router Navigation
  const navigate = useNavigate();

  // Ref for Captured Moments section
  const capturedMomentsRef = useRef(null);

  // 2. Effect to handle Loader Timing
  useEffect(() => {
    // Set a timeout to ensure the loader is visible for at least 3 seconds
    // You can adjust '3000' to whatever milliseconds you prefer
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Hero Logic
  const nextSlide = () => { setCurrent(current === heroSlides.length - 1 ? 0 : current + 1); setProgress(0); };
  const prevSlide = () => { setCurrent(current === 0 ? heroSlides.length - 1 : current - 1); setProgress(0); };

  const scrollToCapturedMoments = () => {
    capturedMomentsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          setCurrent((prev) => prev === heroSlides.length - 1 ? 0 : prev + 1);
          return 0;
        }
        return old + 0.5;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  // Fetch latest packages
  useEffect(() => {
    let cancelled = false;
    const fetchPackages = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/packages`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error('Invalid packages data');
        const sorted = data.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        if (!cancelled) setLatestPackages(sorted.slice(0, 3));
      } catch (err) {
        if (!cancelled) {
          _setPkgError(err.message);
          if (import.meta.env.DEV) console.warn('[HomePage] failed to fetch packages:', err);
        }
      }
    };

    fetchPackages();
    return () => { cancelled = true; };
  }, []);

  // 3. Conditional Return: Show Loader if loading
  if (isPageLoading) {
    return <CeyloriaLoader />;
  }

  // 4. Main Page Content (Only shows after loader finishes)
  return (
    <div className={`bg-white text-gray-900 ${fontBody} selection:bg-blue-600 selection:text-white`}>

      {/* ---------------------- 1. HERO SECTION ---------------------- */}
      <div className="relative w-full h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            <div className={`relative w-full h-full transform transition-transform duration-[10000ms] ease-linear ${index === current ? "scale-110" : "scale-100"}`}>
              <img src={slide.image} className="w-full h-full object-cover" alt={slide.title} />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
            </div>
          </div>
        ))}

        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-24 px-6 md:px-16 lg:px-24 pointer-events-none">
          <div className="max-w-5xl pointer-events-auto">
            <div className="flex items-center gap-3 mb-6 overflow-hidden">
              <div className={`flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/10 animate-fade-in-up`}>
                <MapPin className="w-3.5 h-3.5 text-cyan-300" />
                <span className="text-white text-xs font-bold tracking-widest uppercase">{heroSlides[current].location}</span>
              </div>
            </div>

            <h1 className={`${fontHead} text-5xl md:text-7xl lg:text-9xl text-white leading-[0.9] mb-6 drop-shadow-lg tracking-tight`}>
              {heroSlides[current].title.split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-4 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                  {word}
                </span>
              ))}
            </h1>

            <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
              <p className="text-lg md:text-xl text-white/90 font-light max-w-lg leading-relaxed border-l-2 border-cyan-400 pl-6">
                {heroSlides[current].subtitle}
              </p>

              <button onClick={scrollToCapturedMoments} className="group relative overflow-hidden bg-white text-neutral-900 px-8 py-4 rounded-full font-medium transition-transform hover:scale-105 active:scale-95 w-fit">
                <span className="relative z-10 flex items-center gap-3">
                  Explore Destinations <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-8 md:right-24 z-30 flex items-center gap-6">
          <div className="flex gap-3">
            {heroSlides.map((_, idx) => (
              <div key={idx} onClick={() => { setCurrent(idx); setProgress(0); }} className="group relative h-1 w-12 bg-white/20 cursor-pointer overflow-hidden rounded-full">
                <div className={`absolute top-0 left-0 h-full bg-cyan-400 transition-all duration-100 ease-linear ${idx === current ? "opacity-100" : "opacity-0"}`} style={{ width: idx === current ? `${progress}%` : "0%" }} />
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button onClick={prevSlide} className="p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={nextSlide} className="p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>
      </div>

      {/* ---------------------- 2. INTERACTIVE MAP ---------------------- */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-tr from-blue-50/80 via-cyan-50/50 to-blue-50/50 rounded-full blur-3xl pointer-events-none -z-0 opacity-80"></div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <Reveal>
            <div className="text-center mb-16 md:mb-24">
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3 block">Discover Sri Lanka</span>
              <h2 className={`${fontHead} text-4xl md:text-6xl text-gray-900 mb-6`}>Find Your Perfect Escape</h2>
              <div className="w-24 h-1 bg-blue-200 mx-auto rounded-full"></div>
            </div>
          </Reveal>

          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12">

            {/* Left Column Categories */}
            <div className="w-full lg:w-1/4 flex flex-col gap-6">
              {categories.slice(0, 3).map((cat, i) => (
                <CategoryCard key={i} cat={cat} active={activeCategory} setActive={setActiveCategory} align="left" delay={i * 100} />
              ))}
            </div>

            {/* Center Map Stage */}
            <div className="w-full lg:w-1/2 flex justify-center py-8 lg:py-0 relative">
              <div className="relative w-full max-w-[550px] aspect-[3/4] flex items-center justify-center">

                {/* Concentric Circles */}
                <div className="absolute inset-0 border border-gray-200/50 rounded-full scale-125 pointer-events-none"></div>
                <div className="absolute inset-0 border border-gray-200/50 rounded-full scale-110 pointer-events-none"></div>

                <img
                  src="/srilanka-map.png"
                  alt="Sri Lanka Map"
                  className="relative w-full h-full object-contain drop-shadow-2xl z-10"
                />

                {/* Map Points */}
                {activeCategory && activeCategory.locations.map((loc, idx) => (
                  <div
                    key={idx}
                    className="absolute z-20"
                    style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                  >
                    <div className="relative transform -translate-x-1/2 -translate-y-1/2 animate-scale-in">
                      <div className="absolute inset-0 -m-3 bg-blue-600/30 rounded-full animate-ping"></div>
                      <div className="relative w-5 h-5 bg-blue-600 rounded-full border-[3px] border-white shadow-lg"></div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-30">
                        <div className="relative bg-white/80 backdrop-blur-xl text-neutral-900 text-sm font-bold px-5 py-2.5 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/60 whitespace-nowrap transform transition-all hover:scale-105">
                          {loc.label}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-[6px] border-transparent border-t-white/80"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {!activeCategory && (
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-md px-6 py-3 rounded-full text-sm font-medium text-gray-500 border border-white/50 shadow-sm pointer-events-none whitespace-nowrap">
                    Hover a category to explore
                  </div>
                )}
              </div>
            </div>

            {/* Right Column Categories */}
            <div className="w-full lg:w-1/4 flex flex-col gap-6">
              {categories.slice(3).map((cat, i) => (
                <CategoryCard key={i} cat={cat} active={activeCategory} setActive={setActiveCategory} align="right" delay={(i + 3) * 100} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------- 3. GALLERY ---------------------- */}
      <section ref={capturedMomentsRef} className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="px-6 md:px-12 lg:px-24">
          <Reveal>
            <h2 className={`${fontHead} text-4xl md:text-5xl text-center text-gray-900 mb-16`}>Captured Moments</h2>
            <div className="w-full">
              <Gallery images={galleryList} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------- 4. FEATURED: SIGIRIYA ---------------------- */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 -skew-x-12 translate-x-1/4 z-0"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="w-full lg:w-1/2 relative">
              <Reveal direction="left">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                  <img src="/aboutsigiriya.png" alt="Sigiriya" className="w-full h-[500px] md:h-[600px] object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>

                  <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/50 max-w-[140px]">
                    <span className="block text-4xl font-light text-blue-600 mb-1">5th</span>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Century AD</span>
                  </div>
                  <div className="absolute bottom-8 left-8 bg-neutral-900/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/10">
                    <div className="flex items-center gap-3 mb-1">
                      <Compass className="w-5 h-5 text-cyan-400" />
                      <span className="text-white text-lg font-medium">200m High</span>
                    </div>
                    <span className="text-xs text-neutral-400 uppercase tracking-wider pl-8">Elevation</span>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="w-full lg:w-1/2">
              <Reveal direction="right" delay={200}>
                <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">UNESCO World Heritage</div>
                <h2 className={`${fontHead} text-5xl md:text-7xl text-gray-900 mb-8 leading-tight`}>
                  The Lion Rock <br /> <span className="italic text-gray-400">Fortress</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Sigiriya is one of the most valuable historical monuments of Sri Lanka. Referred by locals as the Eighth Wonder of the World, this ancient palace and fortress complex has significant archaeological importance and attracts thousands of tourists every year.
                </p>
                <div className="grid grid-cols-2 gap-8 my-10 border-y border-gray-100 py-8">
                  <div>
                    <h4 className="text-3xl font-light text-gray-900 mb-1">1,200</h4>
                    <p className="text-sm text-gray-500 uppercase tracking-wider">Steps to Top</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-light text-gray-900 mb-1">1982</h4>
                    <p className="text-sm text-gray-500 uppercase tracking-wider">Inscribed Year</p>
                  </div>
                </div>
                <Link
                  to="/sigiriyafortress"
                  className="flex items-center gap-4 text-gray-900 font-medium hover:gap-6 transition-all group"
                >
                  Read More
                  <div className="w-12 h-[1px] bg-gray-900 group-hover:bg-blue-600 transition-colors"></div>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------- 5. PARALLAX STACK ---------------------- */}
      <div className="bg-gray-900 py-24 px-6 text-center">
        <p className="text-gray-400 text-sm uppercase tracking-[0.3em] mb-4">The Journey</p>
        <h3 className={`${fontHead} text-white text-3xl md:text-5xl italic`}>"Sri Lanka is not just a place,<br />it's a feeling."</h3>
      </div>

      <section className="relative bg-neutral-900">
        {scrollImages.map((src, index) => (
          <div key={index} className="sticky top-0 w-full h-screen overflow-hidden shadow-2xl" style={{ zIndex: index + 1 }}>
            <img src={src} alt="Scenic" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute bottom-12 left-6 md:left-24">
              <span className="text-white/50 text-8xl md:text-[12rem] font-bold opacity-20 leading-none select-none">{String(index + 1).padStart(2, '0')}</span>
            </div>
          </div>
        ))}
      </section>

      {/* ---------------------- 6. PACKAGES ---------------------- */}
      <section className="py-32 px-6 md:px-16 lg:px-24 bg-gray-50 relative z-50 rounded-t-[3rem] -mt-20">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div>
                <h2 className={`${fontHead} text-5xl md:text-6xl text-gray-900 mb-4`}>Curated Packages</h2>
                <p className="text-gray-500 max-w-md">Handpicked experiences designed to show you the soul of the island.</p>
              </div>
              <Link to="/packages">
                <button className="px-8 py-3 border border-gray-300 rounded-full hover:bg-gray-900 hover:text-white transition-colors">View All Offers</button>
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {((latestPackages && latestPackages.length) ? latestPackages : packages).map((pkg, idx) => (
              <Reveal key={idx} delay={idx * 150}>
                <div
                  onClick={() => pkg._id && navigate(`/package-overview/${pkg._id}`)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full flex flex-col w-full">
                  <div className="relative h-80 overflow-hidden">
                    {/* support both sample pkg.image and backend pkg.images array */}
                    <img src={pkg.image || (Array.isArray(pkg.images) && pkg.images[0]) || "/gallery/img1.jpg"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={pkg.title} />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
                      Best Seller
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {pkg.days}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {pkg.people} Pax</span>
                    </div>
                    <h3 className={`${fontHead} text-2xl text-gray-900 mb-3 group-hover:text-blue-600 transition-colors`}>{pkg.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">{pkg.desc}</p>
                    <div className="flex justify-between items-center mt-auto pt-6 border-t border-gray-100">
                      <span className="text-sm font-medium underline decoration-gray-300 underline-offset-4 group-hover:decoration-blue-600 transition-all">View Itinerary</span>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>



      <style jsx global>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0; 
        }
        @keyframes fadeUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in-up {
          animation: fadeUp 0.8s ease-out forwards;
        }
        @keyframes scaleIn {
          from { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
}

// ---------------------- UPDATED CATEGORY CARD ----------------------
const CategoryCard = ({ cat, active, setActive, align, delay }) => {
  const isActive = active?.name === cat.name;

  return (
    <Reveal delay={delay} direction={align === "left" ? "right" : "left"}>
      <div
        onMouseEnter={() => setActive(cat)}
        onMouseLeave={() => setActive(null)}
        className={`
          relative flex items-center gap-6 p-5 rounded-2xl cursor-pointer transition-all duration-300 border backdrop-blur-sm
          ${isActive
            ? "bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border-blue-100 scale-105 z-20"
            : "bg-white/40 border-white/50 hover:bg-white hover:shadow-lg hover:border-transparent"
          }
        `}
      >
        <img
          src={cat.image}
          className={`w-20 h-20 rounded-xl object-cover shadow-md transition-transform duration-300 ${isActive ? "scale-105 ring-2 ring-blue-200" : ""}`}
          alt={cat.name}
        />

        <div className="flex-1">
          <h4 className={`text-lg font-bold transition-colors mb-1 ${isActive ? "text-blue-600" : "text-gray-800"}`}>{cat.name}</h4>
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-blue-600" : "bg-gray-300"}`}></span>
            <p className="text-sm text-neutral-500 font-medium">{cat.locations.length} Locations</p>
          </div>
        </div>

        <div className={`
           w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
           ${isActive ? "bg-blue-100 text-blue-600 rotate-0 opacity-100" : "bg-transparent text-gray-300 -rotate-45 opacity-0"}
        `}>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Reveal>
  );
};