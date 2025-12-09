import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin, Calendar, Users } from "lucide-react";
import Gallery from "../components/Gallery";

// ---------------------- REUSABLE SCROLL ANIMATION COMPONENT ----------------------
const FadeInSection = ({ children, delay = "0ms" }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Trigger animation when element enters viewport
          if (entry.isIntersecting) {
            setVisible(true);
            // Optional: Stop observing once visible so it doesn't fade out again
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: delay }}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"
      }`}
    >
      {children}
    </div>
  );
};

// ---------------------- HERO SLIDES ----------------------
const heroSlides = [
  {
    image: "/gallery/maligawa.png",
    title: "Temple Of Tooth",
    subtitle: "Sacred temple of the Tooth Relic",
    location: "Kandy"
  },
  {
    image: "/gallery/sigiriya.png",
    title: "Sigiriya Rock Fortress",
    subtitle: "Ancient wonders meet natural beauty",
    location: "Central Province"
  },
  {
    image: "/gallery/ninearch.png",
    title: "Nine Arch Bridge",
    subtitle: "Iconic bridge in lush tea country",
    location: "Ella"
  },
  {
    image: "/gallery/colombo2.png",
    title: "Colombo City",
    subtitle: "Relax by the scenic coastline",
    location: "Colombo"
  }
];


// ---------------------- PACKAGES ----------------------
const packages = [
  {
    title: "Cultural Triangle",
    desc: "Explore ancient cities, temples, and UNESCO World Heritage sites across Sri Lanka's cultural heartland.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    days: "5 Days",
    people: "2-8"
  },
  {
    title: "Coastal Retreat",
    desc: "Relax on pristine beaches, enjoy water sports, and witness stunning ocean sunsets.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
    days: "7 Days",
    people: "2-6"
  },
  {
    title: "Hill Country Escape",
    desc: "Journey through tea plantations, misty mountains, and colonial-era towns.",
    image: "https://images.unsplash.com/photo-1608481337062-4093bf3ed404?auto=format&fit=crop&w=800&q=80",
    days: "4 Days",
    people: "2-10"
  },
];

// ---------------------- INTERACTIVE MAP CATEGORIES ----------------------
const categories = [
  {
    name: "Popular Beaches",
    image: "/beach.png",
    locations: [
      { x: 35, y: 95, label: "Mirissa" },
      { x: 65, y: 35, label: "Marble Beach" },
      { x: 25, y: 89, label: "Hikkaduwa" },
    //   { x: 35, y: 85, label: "Matara" },
      { x: 84, y: 75, label: "Arugam Bay" },
    ],
  },
  {
    name: "Wildlife & Nature",
    image: "/wildlife.png",
    locations: [
      { x: 25, y: 29, label: "Wilpattu" },
      { x: 77, y:83, label: "Yala" },
    ],
  },
  {
    name: "Adventure",
    image: "/adventure.png",
    locations: [
      { x: 40, y: 75, label: "Kithulgala Rafting" },
      { x: 60, y: 80, label: "Flying Ravana Adventure Park" },
    ],
  },
  {
    name: "History & Culture",
    image: "/culture.png",
    locations: [
      { x: 45, y: 63, label: "Sigiriya" },
      { x: 55, y: 48, label: "Polonnaruwa" },
      { x: 45, y: 38, label: "Anuradhapura" },
    ],
  },
  {
    name: "Lesser Travelled",
    image: "/lessertraveled.png",
    locations: [
      { x: 38, y: 97, label: "Polhena" },
      { x: 38, y: 80, label: "Rathnapura" },
    ],
  },
  {
    name: "Gastronomy",
    image: "/food.png",
    locations: [
      { x: 22, y: 74, label: "Colombo" },
      { x: 55, y: 70, label: "Mahiyanganaya" },
    ],
  },
];

// ---------------------- GALLERY IMAGES ----------------------
const galleryList = [
  "/gallery/img1.jpg",
  "/gallery/img2.jpg",
  "/gallery/img3.jpg",
  "/gallery/img4.jpg",
  "/gallery/img5.jpg",
  "/gallery/img6.jpg",
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [active, setActive] = useState(null);
  const [progress, setProgress] = useState(0);

  const nextSlide = () => {
    setCurrent(current === heroSlides.length - 1 ? 0 : current + 1);
    setProgress(0);
  };
  
  const prevSlide = () => {
    setCurrent(current === 0 ? heroSlides.length - 1 : current - 1);
    setProgress(0);
  };

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 2;
      });
    }, 100);
    
    return () => clearInterval(progressTimer);
  }, [current]);

  return (
    <div className="font-sans bg-neutral-50">

      {/* HERO SECTION - KEPT AS IS (NO SCROLL ANIM NEEDED) */}
      <div className="relative w-full h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div key={index}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ${
              index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <img src={slide.image} className="w-full h-full object-cover" alt={slide.title} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"></div>
          </div>
        ))}

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-32 px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4 opacity-90">
              <MapPin className="w-4 h-4 text-white" />
              <span className="text-white text-sm tracking-wider uppercase">
                {heroSlides[current].location}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-4 tracking-tight">
              {heroSlides[current].title}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 font-light tracking-wide mb-8">
              {heroSlides[current].subtitle}
            </p>

            <button className="group px-8 py-4 bg-white text-neutral-900 font-medium tracking-wide hover:bg-neutral-100 transition-all duration-300 flex items-center gap-3">
              Explore Destinations
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button 
          onClick={prevSlide} 
          className="absolute top-1/2 left-6 -translate-y-1/2 text-white p-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button 
          onClick={nextSlide} 
          className="absolute top-1/2 right-6 -translate-y-1/2 text-white p-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 z-20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Progress Indicators */}
        <div className="absolute bottom-10 left-8 md:left-16 lg:left-24 flex gap-4 z-20">
          {heroSlides.map((_, idx) => (
            <div key={idx} className="relative w-16 h-1 bg-white/30 cursor-pointer overflow-hidden" onClick={() => { setCurrent(idx); setProgress(0); }}>
              <div 
                className={`absolute top-0 left-0 h-full bg-white transition-all duration-100 ${
                  idx === current ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ width: idx === current ? `${progress}%` : '0%' }}
              />
            </div>
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-10 right-8 md:right-16 lg:right-24 text-white font-light text-lg z-20">
          <span className="text-2xl">{String(current + 1).padStart(2, '0')}</span>
          <span className="text-white/60"> / {String(heroSlides.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* INTERACTIVE MAP SECTION */}
      <section className="py-32 px-8 md:px-16 lg:px-24 bg-white">
        <FadeInSection>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-light text-neutral-900 text-center mb-6 tracking-tight">
              Explore Sri Lanka
            </h2>
            <p className="text-center text-neutral-600 text-lg mb-20 max-w-2xl mx-auto">
              Discover the diverse landscapes and rich culture of the pearl of the Indian Ocean
            </p>

            <div className="flex flex-col lg:flex-row justify-between gap-12">
              {/* LEFT CATEGORIES */}
              <div className="flex flex-col gap-6 w-full lg:w-1/3">
                {categories.slice(0, 3).map((cat, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setActive(cat)}
                    onMouseLeave={() => setActive(null)}
                    className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                  >
                    <div className="flex items-center gap-5 p-6">
                      <img
                        src={cat.image}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                        alt={cat.name}
                      />
                      <p className="text-xl font-semibold text-neutral-900 group-hover:text-indigo-700 transition-colors duration-300">
                        {cat.name}
                      </p>
                    </div>
                    {/* Animated underline on hover */}
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-indigo-500 group-hover:w-full transition-all duration-500"></div>
                  </div>
                ))}
              </div>

              {/* CENTER MAP */}
              <div className="relative flex justify-center items-center w-full lg:w-1/3">
                <img src="/srilanka-map.png" className="w-[380px] max-w-full" alt="Sri Lanka Map" />
                {active && active.locations.map((loc, index) => (
                  <div key={index} className="absolute" style={{ left: `${loc.x}%`, top: `${loc.y}%` }}>
                    <div className="w-3 h-3 bg-indigo-600 rounded-full absolute -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                    <div className="absolute -translate-x-1/2 -translate-y-full mb-3 bg-indigo-600 text-white text-xs px-3 py-1.5 whitespace-nowrap rounded-full font-medium tracking-wide">
                      {loc.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* RIGHT CATEGORIES */}
              <div className="flex flex-col gap-6 w-full lg:w-1/3">
                {categories.slice(3).map((cat, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setActive(cat)}
                    onMouseLeave={() => setActive(null)}
                    className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-green-50 via-lime-50 to-yellow-50 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                  >
                    <div className="flex items-center gap-5 p-6">
                      <img
                        src={cat.image}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                        alt={cat.name}
                      />
                      <p className="text-xl font-semibold text-neutral-900 group-hover:text-green-700 transition-colors duration-300">
                        {cat.name}
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-green-500 group-hover:w-full transition-all duration-500"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>


      {/* GALLERY SECTION */}
      <section className="py-31 px-8 md:px-16 lg:px-24 bg-neutral-50">
        <FadeInSection>
          <div className="max-w-12xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-light text-neutral-900 text-center mb-20 tracking-tight">
              Latest Gallery
            </h2>
            <Gallery images={galleryList} />
          </div>
        </FadeInSection>
      </section>

      {/* SIGIRIYA SECTION */}
      <section className="py-32 px-8 md:px-16 lg:px-24 bg-white">
        <FadeInSection>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-20">

              {/* IMAGE */}
              <div className="w-full lg:w-1/2 relative group">
                {/* Main Image Container */}
                <div className="relative overflow-hidden shadow-2xl">
                  <img
                    src="/aboutsigiriya.png"
                    alt="Sigiriya Rock Fortress"
                    className="w-full h-[600px] object-cover transform transition-all duration-1000 ease-out group-hover:scale-110"
                  />
                  
                  {/* Subtle Gradient Overlay on Edges */}
                  <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.1)] pointer-events-none"></div>
                  
                  {/* Corner Accents - Minimal */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-neutral-300 opacity-60 group-hover:opacity-100 group-hover:w-20 group-hover:h-20 transition-all duration-500"></div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-neutral-300 opacity-60 group-hover:opacity-100 group-hover:w-20 group-hover:h-20 transition-all duration-500"></div>
                </div>
                
                {/* Floating Info Cards - Staggered Animation */}
                <div className="absolute -top-6 -right-6 bg-white px-8 py-4 shadow-xl border border-neutral-100 transform transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                  <p className="text-xs tracking-widest text-neutral-500 uppercase mb-1">UNESCO</p>
                  <p className="text-3xl font-light text-neutral-900">1982</p>
                </div>
                
                <div className="absolute -bottom-6 -left-6 bg-neutral-900 px-8 py-4 shadow-xl transform transition-all duration-700 group-hover:translate-y-2 group-hover:shadow-2xl">
                  <p className="text-xs tracking-widest text-white/60 uppercase mb-1">Elevation</p>
                  <p className="text-3xl font-light text-white">200m</p>
                </div>
              </div>

              {/* TEXT CONTENT */}
              <div className="w-full lg:w-1/2 flex flex-col gap-8">
                {/* Animated Label */}
                <div className="inline-block overflow-hidden">
                  <span className="block text-sm tracking-widest text-neutral-500 uppercase animate-[slideIn_0.6s_ease-out]">
                    Featured Destination
                  </span>
                </div>
                
                {/* Title with Underline Animation */}
                <div className="relative">
                  <h2 className="text-5xl md:text-7xl font-light text-neutral-900 tracking-tight leading-tight">
                    Sigiriya Rock<br />Fortress
                  </h2>
                  <div className="h-1 bg-neutral-900 mt-6 w-0 animate-[expandWidth_1s_ease-out_0.3s_forwards]"></div>
                </div>
                
                {/* Description with Fade In */}
                <div className="space-y-6 animate-[fadeIn_0.8s_ease-out_0.5s_both]">
                  <p className="text-xl text-neutral-600 leading-relaxed">
                    Sigiriya, famously known as Lion Rock, is one of Sri Lanka's most iconic UNESCO World Heritage Sites. 
                    This ancient fortress stands nearly 200 meters above the surrounding plains, showcasing remarkable engineering, beautiful frescoes, and breathtaking views.
                  </p>
                  
                  <p className="text-xl text-neutral-600 leading-relaxed">
                    Wander through its meticulously designed water gardens, ascend the Lion's Staircase, and experience a unique blend of history, culture, and natural beauty.
                  </p>
                </div>
                
                {/* Stats Grid with Staggered Animation */}
                <div className="grid grid-cols-2 gap-6 mt-4">
                  {[
                    { label: "Heritage", value: "UNESCO World Site", delay: "0.7s" },
                    { label: "Height", value: "200 Meters", delay: "0.8s" },
                    { label: "Era", value: "5th Century AD", delay: "0.9s" },
                    { label: "Features", value: "Frescoes & Gardens", delay: "1s" }
                  ].map((stat, idx) => (
                    <div 
                      key={idx} 
                      className="group/stat border-l-2 border-neutral-300 pl-5 hover:border-neutral-900 transition-all duration-300 animate-[slideInLeft_0.6s_ease-out_both]"
                      style={{ animationDelay: stat.delay }}
                    >
                      <p className="text-xs text-neutral-400 mb-2 uppercase tracking-wider group-hover/stat:text-neutral-600 transition-colors">
                        {stat.label}
                      </p>
                      <p className="text-lg font-light text-neutral-900 group-hover/stat:translate-x-1 transition-transform duration-300">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* CTA Button with Hover Effect */}
                <button className="group/btn mt-8 px-10 py-5 bg-neutral-900 text-white font-light tracking-wider hover:bg-neutral-800 transition-all duration-300 flex items-center gap-3 w-fit relative overflow-hidden">
                  <span className="relative z-10">Discover More</span>
                  <ChevronRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-2 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-white/10 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
                </button>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 80px;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>



      {/* PACKAGES SECTION */}
      <section className="py-32 px-8 md:px-16 lg:px-24 bg-white">
        <FadeInSection>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-light text-neutral-900 text-center mb-6 tracking-tight">
              Travel Packages
            </h2>
            <p className="text-center text-neutral-600 text-lg mb-20 max-w-2xl mx-auto">
              Curated experiences designed to showcase the best of Sri Lanka
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg, idx) => (
                <div key={idx} className="group bg-white border border-neutral-200 overflow-hidden hover:border-neutral-900 transition-all duration-300">
                  <div className="relative h-72 overflow-hidden">
                    <img src={pkg.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={pkg.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-light text-neutral-900 mb-3 tracking-wide">
                      {pkg.title}
                    </h3>
                    <p className="text-neutral-600 mb-6 leading-relaxed">
                      {pkg.desc}
                    </p>
                    <div className="flex items-center gap-6 mb-6 text-sm text-neutral-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{pkg.days}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{pkg.people} People</span>
                      </div>
                    </div>
                    <button className="w-full py-3 bg-neutral-900 text-white font-light tracking-wider hover:bg-neutral-800 transition-colors duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

    </div>
  );
}