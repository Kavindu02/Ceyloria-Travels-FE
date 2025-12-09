import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. IMPORT THIS

const galleryItems = [
  // 2. ADD A 'link' PROPERTY TO YOUR DATA
  { id: 1, title: "Colombo", img: "/gallery/Colombo.png", size: "md:col-span-1 md:row-span-1", link: "/colombo" },
  { id: 2, title: "Anuradhapura", img: "/gallery/Anuradhapura.png", size: "md:col-span-1 md:row-span-1", link: "/anuradhapura" }, // <--- THIS IS THE TARGET
  { id: 3, title: "Galle", img: "/gallery/Galle.png", size: "md:col-span-1 md:row-span-2", link: "/galle" },
  { id: 4, title: "Ella", img: "/gallery/Ella.png", size: "md:col-span-2 md:row-span-1", link: "/ella" },
];

const Gallery = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const navigate = useNavigate(); // 3. INITIALIZE THE HOOK

  // 4. FUNCTION TO HANDLE CLICK
  const handleNavigation = (link) => {
    if (link) {
        navigate(link);
        // Scrolls to top of new page automatically
        window.scrollTo(0, 0); 
    }
  };

  return (
    <div className="w-full py-8 md:py-12 px-2 md:px-4">
      <div className="max-w-12xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[280px] md:auto-rows-[280px] gap-1">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              // 5. ADD THE ONCLICK EVENT HERE
              onClick={() => handleNavigation(item.link)}
              className={`relative overflow-hidden cursor-pointer group ${item.size}`}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform transition-transform duration-500">
                <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-serif mb-1 md:mb-2 transform transition-all duration-500 group-hover:translate-y-[-8px]">
                  {item.title}
                </h2>
                
                <div className="flex items-center text-white/90 text-sm md:text-sm transform transition-all duration-500 group-hover:translate-y-[-8px]">
                  <svg className="w-4 h-4 md:w-4 md:h-4 mr-1 md:mr-2 fill-current text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span className="font-medium tracking-wide">Destinations</span>
                </div>
              </div>
              
              <div className={`absolute inset-0 border-2 md:border-4 border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none ${hoveredId === item.id ? 'scale-95' : 'scale-100'}`} />
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Gallery;