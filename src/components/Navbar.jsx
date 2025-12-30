import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Search, ArrowRight, MapPin, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
    setShowResults(false);
  }, [location]);

  // Handle Click Outside to close search
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced Search Logic
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          const [packagesRes, accommodationsRes] = await Promise.all([
            fetch(`${import.meta.env.VITE_BACKEND_URL}/packages`),
            fetch(`${import.meta.env.VITE_BACKEND_URL}/accommodations`)
          ]);

          const packagesData = await packagesRes.json();
          const accommodationsData = await accommodationsRes.json();

          const filteredPackages = Array.isArray(packagesData)
            ? packagesData.filter(pkg =>
                pkg.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pkg.description?.toLowerCase().includes(searchQuery.toLowerCase())
              ).slice(0, 3)
            : [];

          const filteredAccommodations = Array.isArray(accommodationsData)
            ? accommodationsData.filter(acc =>
                acc.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                acc.description?.toLowerCase().includes(searchQuery.toLowerCase())
              ).slice(0, 3)
            : [];

          setSearchResults([
            ...filteredPackages.map(item => ({ ...item, type: 'package' })),
            ...filteredAccommodations.map(item => ({ ...item, type: 'accommodation' }))
          ]);
          setShowResults(true);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300); // Wait 300ms after user stops typing

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
  };

  // Check if on overview pages (white background pages)
  const isOverviewPage = location.pathname.includes('/package-overview/') || 
                         location.pathname.includes('/accommodation-overview/');

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-black/90 backdrop-blur-lg border-b border-white/10 shadow-lg"
          : isOverviewPage 
            ? "bg-black/70 backdrop-blur-md border-b border-white/5 py-4"
            : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="relative z-50 flex items-center gap-2 group">
          <div className="relative overflow-hidden rounded-lg">
             {/* Replace with your logo image */}
             <img src="/logo.jpg" alt="Logo" className="h-10 w-auto object-contain transition-transform group-hover:scale-105" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight hidden lg:block">
            SDK<span className="text-blue-500">Travel</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 text-white/90 font-medium text-sm lg:text-base">
          {['Home', 'Packages', 'Accommodations', 'About'].map((item) => (
            <li key={item}>
              <Link
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="relative hover:text-white transition-colors py-2 group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Section: Search & CTA */}
        <div className="hidden md:flex items-center gap-6">
          {/* Search Bar */}
          <div className="relative" ref={searchRef}>
            <div className={`flex items-center transition-all duration-300 ${
              showResults || searchQuery ? "w-64 bg-white/10" : "w-48 bg-white/5 hover:bg-white/10"
            } rounded-full border border-white/10 focus-within:border-blue-500 focus-within:bg-black/40`}>
              <Search className="ml-3 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchSubmit}
                onFocus={() => searchQuery.trim() && setShowResults(true)}
                className="w-full bg-transparent border-none text-white text-sm px-3 py-2 focus:ring-0 focus:outline-none placeholder-gray-400"
              />
              {isSearching && (
                 <div className="mr-3 w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>

            {/* Desktop Search Results Dropdown */}
            <AnimatePresence>
              {showResults && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-3 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20"
                >
                  <div className="max-h-[60vh] overflow-y-auto">
                    {searchResults.map((result, idx) => (
                      <Link
                        key={idx}
                        to={result.type === 'package' ? '/packages' : '/accommodations'}
                        className="flex items-start gap-3 p-3 hover:bg-blue-50 transition border-b border-gray-100 last:border-0"
                      >
                        <div className={`p-2 rounded-lg ${result.type === 'package' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                          {result.type === 'package' ? <Package size={16} /> : <MapPin size={16} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-gray-900 truncate">{result.title || result.name}</h4>
                          <p className="text-xs text-gray-500 truncate">{result.type === 'package' ? 'Travel Package' : 'Accommodation'}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate(`/search?query=${encodeURIComponent(searchQuery)}`)}
                    className="w-full py-3 bg-gray-50 text-blue-600 text-xs font-bold uppercase tracking-wide hover:bg-gray-100 transition"
                  >
                    View All Results
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/contact"
            className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-blue-500 hover:text-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-blue-500/50"
          >
            Contact Us
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
            {/* Mobile Search */}
            <div className="mb-8 relative">
              <input
                type="text"
                placeholder="Search packages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-12 py-4 text-lg focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              
              {/* Mobile Results */}
              {showResults && searchResults.length > 0 && (
                <div className="mt-4 bg-white rounded-xl overflow-hidden">
                  {searchResults.slice(0, 3).map((result, idx) => (
                    <Link
                      key={idx}
                      to={result.type === 'package' ? '/packages' : '/accommodations'}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 p-4 border-b border-gray-100 last:border-0 text-black"
                    >
                       <span className="text-lg">
                         {result.type === 'package' ? '📦' : '🏨'}
                       </span>
                       <div className="flex-1">
                          <div className="font-semibold">{result.title || result.name}</div>
                          <div className="text-xs text-gray-500 uppercase">{result.type}</div>
                       </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Links */}
            <nav className="flex flex-col gap-6">
              {['Home', 'Packages', 'Accommodations', 'About', 'Contact'].map((item, idx) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className={`text-3xl font-bold ${
                      item === 'Contact' ? 'text-blue-500' : 'text-white'
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