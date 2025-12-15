import React, { useState, useEffect } from 'react';
import TravelCard from '../../components/TravelCard';
import { Search, Filter, X } from 'lucide-react';

const PackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Mobile filter toggle
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // Backend URL
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/packages`);
        
        if (!response.ok) {
          throw new Error(`Server Error: ${response.statusText}`);
        }
        
        const data = await response.json();
        setPackages(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="font-sans text-gray-700 bg-gray-50 min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <header className="relative h-[60vh] min-h-[400px]">
        {/* Navbar Overlay */}
        

        {/* Hero Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1559586616-361e18714958?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover" 
            alt="Hero Ocean"
          />
          <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply"></div>
        </div>

        {/* Hero Title */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
          <span className="text-cyan-400 font-bold tracking-[0.2em] mb-4 uppercase text-sm animate-fade-in-up">Discover the World</span>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight drop-shadow-2xl mb-6">
            Our Packages
          </h1>
        </div>
      </header>

      {/* --- CONTENT AREA --- */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-4 gap-12 relative">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 p-3 rounded-lg font-bold text-gray-700 shadow-sm"
          >
            <Filter size={18} /> Filters
          </button>
        </div>

        {/* --- SIDEBAR (FILTERS) --- */}
        <aside className={`
          fixed inset-0 z-40 bg-white p-6 transition-transform transform lg:translate-x-0 lg:static lg:bg-transparent lg:p-0 lg:z-auto lg:block
          ${showMobileFilters ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex justify-between items-center lg:hidden mb-6">
            <h2 className="text-xl font-bold">Filters</h2>
            <button onClick={() => setShowMobileFilters(false)}><X /></button>
          </div>

          <div className="space-y-10">
            {/* Search Box */}
            <div className="relative">
              <input type="text" placeholder="Search destination..." className="w-full pl-10 pr-4 py-3 bg-white border-2 border-transparent focus:border-cyan-500 rounded-xl shadow-sm outline-none transition-all" />
              <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
            </div>

            {/* Destination Dropdown */}
            <div>
              <h4 className="font-extrabold text-gray-900 mb-4 text-sm uppercase tracking-wider">Destination</h4>
              <select className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                <option>All Destinations</option>
                <option>Thailand</option>
                <option>Japan</option>
                <option>Europe</option>
              </select>
            </div>

            {/* Date Picker */}
            <div>
              <h4 className="font-extrabold text-gray-900 mb-4 text-sm uppercase tracking-wider">Date</h4>
              <input type="date" className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-400 outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between mb-4">
                <h4 className="font-extrabold text-gray-900 text-sm uppercase tracking-wider">Max Price</h4>
                <span className="font-bold text-cyan-600">$5,000</span>
              </div>
              <input type="range" min="0" max="5000" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
            </div>
          </div>
        </aside>

        {/* --- MAIN GRID --- */}
        <main className="lg:col-span-3">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Recommended</h2>
              <div className="h-1 w-20 bg-cyan-500 mt-2 rounded-full"></div>
            </div>
            <span className="text-gray-400 text-sm hidden sm:block">Showing {packages.length} packages</span>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-100 border-t-cyan-500"></div>
              <p className="text-gray-400 animate-pulse">Loading amazing trips...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-xl flex items-center gap-4">
              <div className="bg-red-100 p-2 rounded-full">!</div>
              <div>
                <h3 className="font-bold">Oops! Something went wrong.</h3>
                <p className="text-sm opacity-80">{error}</p>
                <p className="text-xs mt-2 text-gray-500">Check if your backend is running on port 5000.</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && packages.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-400 text-lg">No packages found at this moment.</p>
            </div>
          )}

          {/* Product Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {packages.map((pkg) => (
                <TravelCard
                  key={pkg._id} 
                  // Pass the whole array. TravelCard will handle picking the first one.
                  image={pkg.images} 
                  title={pkg.title}
                  location={pkg.citiesCovered && pkg.citiesCovered.length > 0 ? pkg.citiesCovered.join(", ") : "Multiple Cities"}
                  duration={pkg.duration}
                  description={pkg.shortDescription} 
                  price={pkg.price}
                  isSale={false} 
                  onDetailsClick={() => console.log(`Clicked ${pkg._id}`)}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PackagesPage;