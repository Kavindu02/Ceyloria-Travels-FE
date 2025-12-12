import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log("Searching for:", searchQuery);
      // You can redirect to search results page here
      // navigate(`/search?query=${searchQuery}`);
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
          <li><Link to="/countries" className="hover:text-blue-400 transition">Packages</Link></li>
          <li><Link to="/tc" className="hover:text-blue-400 transition">Accommodations</Link></li>
          
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
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="w-44 lg:w-56 px-10 py-2 rounded-full border border-white bg-transparent text-white placeholder-white/60 focus:w-64 focus:outline-none focus:border-blue-500 transition-all duration-300"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white" size={20} />
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
          <li><Link to="/countries" onClick={() => setMenuOpen(false)}>Packages</Link></li>
          <li><Link to="/tc" onClick={() => setMenuOpen(false)}>Accommodations</Link></li>
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
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="w-full px-10 py-2 rounded-full border border-white bg-transparent text-white placeholder-white/60 focus:outline-none focus:border-blue-500 transition-all"
          />
          <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-white" size={20} />
        </div>
      </div>
    </nav>
  );}