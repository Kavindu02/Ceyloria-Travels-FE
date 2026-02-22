import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);


  // Check if on overview pages (white background pages)
  const isOverviewPage = location.pathname.includes('/package-overview/') ||
    location.pathname.includes('/accommodation-overview/') ||
    location.pathname.includes('/plan-my-trip');

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || menuOpen
        ? "bg-black/90 backdrop-blur-lg border-b border-white/10 shadow-lg"
        : isOverviewPage
          ? "bg-black/70 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6 xl:px-12 h-16 md:h-20 flex items-center justify-between flex-nowrap overflow-hidden">

        <Link to="/" className="relative z-50 flex items-center gap-3 group shrink-0">
          <div className="flex flex-col">
            <span className="text-2xl md:text-3xl font-serif font-bold tracking-tight leading-none" style={{ fontFamily: "'Alice', serif" }}>
              <span style={{ color: "#FF8C00" }}>Cey</span>
              <span 
                className="transition-colors duration-300" 
                style={{ color: (scrolled || menuOpen || isOverviewPage) ? "#FFFFFF" : "#001C57" }}
              >
                loria
              </span>
            </span>
            <span className="text-[9px] md:text-[10px] font-medium tracking-[0.2em] text-gray-400 uppercase group-hover:text-blue-400 transition-colors mt-0.5">
              Your Travel Partner
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-1 xl:gap-6 text-white/90 font-medium text-sm xl:text-[16px] flex-nowrap">
          {['Home', 'About', 'Destinations', 'Activities', 'Packages', 'Accommodations', 'Blogs', 'Contact'].map((item) => (
            <li key={item} className="shrink-0">
              <Link
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="relative hover:text-white transition-colors py-2 px-2 xl:px-3 group whitespace-nowrap block"
              >
                {item === 'Contact' ? 'Contact Us' : item}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-[80%]" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Section: Search & CTA */}
        <div className="hidden md:flex items-center gap-2 xl:gap-6 flex-nowrap shrink-0">

          <Link
            to="/plan-my-trip"
            className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-blue-500 hover:text-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-blue-500/50"
          >
            Plan My Trip
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 relative p-2 text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 top-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col pt-24 px-6 md:hidden overflow-y-auto"
          >

            {/* Mobile Links */}
            <nav className="flex flex-col gap-6">
              {['Home', 'Destinations', 'Activities', 'Packages', 'Accommodations', 'About', 'Blogs', 'Contact'].map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className={`text-2xl font-bold ${item === 'Contact' ? 'text-blue-500' : 'text-white'
                      }`}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}

      </AnimatePresence>
    </nav>
  );

}