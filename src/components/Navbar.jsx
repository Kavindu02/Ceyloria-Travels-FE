import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setMenuOpen(false);
      setShowResults(false);
    }
  };

  const handleSearchInput = async (value) => {
    setSearchQuery(value);
    
    if (value.trim().length > 0) {
      try {
        // Search packages
        const packagesRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/packages`);
        const packagesData = await packagesRes.json();
        
        // Search accommodations
        const accommodationsRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/accommodations`);
        const accommodationsData = await accommodationsRes.json();
        
        // Filter results
        const filteredPackages = Array.isArray(packagesData) 
          ? packagesData.filter(pkg => 
              pkg.title?.toLowerCase().includes(value.toLowerCase()) ||
              pkg.description?.toLowerCase().includes(value.toLowerCase())
            ).slice(0, 3)
          : [];
        
        const filteredAccommodations = Array.isArray(accommodationsData)
          ? accommodationsData.filter(acc =>
              acc.name?.toLowerCase().includes(value.toLowerCase()) ||
              acc.description?.toLowerCase().includes(value.toLowerCase())
            ).slice(0, 3)
          : [];
        
        const results = [
          ...filteredPackages.map(item => ({ ...item, type: 'package' })),
          ...filteredAccommodations.map(item => ({ ...item, type: 'accommodation' }))
        ];
        
        setSearchResults(results);
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
      }
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50">
      <header className="flex items-center justify-between px-6 md:px-16 h-20 backdrop-blur-md bg-black/60 transition-all duration-300">

        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img src="/logo.jpg" alt="Logo" className="h-12 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        {/* Changed gap-6 to gap-10 for better spacing */}
        <ul className="hidden md:flex items-center gap-10 text-white font-medium text-base">
          <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
          <li><Link to="/packages" className="hover:text-blue-400 transition">Packages</Link></li>
          <li><Link to="/accommodations" className="hover:text-blue-400 transition">Accommodations</Link></li>
          
          {/* Moved About here so Contact is last */}
          <li><Link to="/about" className="hover:text-blue-400 transition">About</Link></li>

          {/* Contact Us - Highlighted as a White Button */}
          <li>
            <Link 
              to="/contact" 
              className="bg-white text-black px-6 py-2.5 rounded-full font-bold hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Desktop Search */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search packages, accommodations..."
            value={searchQuery}
            onChange={(e) => handleSearchInput(e.target.value)}
            onKeyDown={handleSearch}
            onFocus={() => searchQuery.trim().length > 0 && setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
            className="w-44 lg:w-56 px-10 py-2 rounded-full border border-white bg-transparent text-white placeholder-white/60 focus:w-64 focus:outline-none focus:border-blue-500 transition-all duration-300"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white cursor-pointer" size={20} />
          
          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 w-96 bg-white rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
              {searchResults.map((result, idx) => (
                <Link
                  key={idx}
                  to={result.type === 'package' ? '/packages' : '/accommodations'}
                  onClick={() => {
                    setShowResults(false);
                    setSearchQuery("");
                  }}
                  className="block p-3 hover:bg-gray-100 border-b border-gray-200 last:border-b-0 transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-gray-900 font-semibold text-sm">
                        {result.title || result.name}
                      </h4>
                      <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                        {result.description || result.desc}
                      </p>
                      <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                        {result.type === 'package' ? '📦 Package' : '🏨 Accommodation'}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                  </div>
                </Link>
              ))}
              {searchResults.length > 0 && (
                <button
                  onClick={() => {
                    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
                    setShowResults(false);
                  }}
                  className="w-full p-3 text-blue-600 font-semibold text-sm hover:bg-blue-50 transition"
                >
                  View All Results
                </button>
              )}
            </div>
          )}
          {showResults && searchResults.length === 0 && searchQuery.trim() && (
            <div className="absolute top-full mt-2 w-96 bg-white rounded-lg shadow-xl z-50 p-4">
              <p className="text-gray-500 text-sm">No results found. Press Enter to search.</p>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden bg-black/90 backdrop-blur-lg text-white overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 py-4" : "max-h-0 py-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-5 text-lg font-medium">
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/packages" onClick={() => setMenuOpen(false)}>Packages</Link></li>
          <li><Link to="/accommodations" onClick={() => setMenuOpen(false)}>Accommodations</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          {/* Highlighted Contact Button for Mobile as well */}
          <li>
            <Link 
              to="/contact" 
              onClick={() => setMenuOpen(false)}
              className="bg-white text-black px-6 py-2 rounded-full font-bold"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Mobile Search Bar */}
        <div className="mt-6 px-6 relative">
          <input
            type="text"
            placeholder="Search packages, accommodations..."
            value={searchQuery}
            onChange={(e) => handleSearchInput(e.target.value)}
            onKeyDown={handleSearch}
            onFocus={() => searchQuery.trim().length > 0 && setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
            className="w-full px-10 py-2 rounded-full border border-white bg-transparent text-white placeholder-white/60 focus:outline-none focus:border-blue-500 transition-all"
          />
          <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-white cursor-pointer" size={20} />
          
          {/* Mobile Search Results */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 left-6 right-6 bg-white rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
              {searchResults.map((result, idx) => (
                <Link
                  key={idx}
                  to={result.type === 'package' ? '/packages' : '/accommodations'}
                  onClick={() => {
                    setShowResults(false);
                    setSearchQuery("");
                    setMenuOpen(false);
                  }}
                  className="block p-3 hover:bg-gray-100 border-b border-gray-200 last:border-b-0 transition"
                >
                  <h4 className="text-gray-900 font-semibold text-sm">
                    {result.title || result.name}
                  </h4>
                  <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                    {result.description || result.desc}
                  </p>
                  <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                    {result.type === 'package' ? '📦 Package' : '🏨 Accommodation'}
                  </span>
                </Link>
              ))}
              {searchResults.length > 0 && (
                <button
                  onClick={() => {
                    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
                    setShowResults(false);
                    setMenuOpen(false);
                  }}
                  className="w-full p-3 text-blue-600 font-semibold text-sm hover:bg-blue-50 transition"
                >
                  View All Results
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );}