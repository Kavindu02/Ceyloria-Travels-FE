import React, { useState, useEffect, useMemo } from 'react';
import AccommodationsCard from '../../components/AccommodationsCard'; // Ensure path is correct
import {
  Search, 
  Filter, 
  X, 
  MapPin,
  SlidersHorizontal,
  DollarSign,
  Bed,
  Frown
} from 'lucide-react';

const AccommodationsPage = () => {

  // --- State ---
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // --- Filter State ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [priceRange, setPriceRange] = useState(1000); // Default placeholder
  const [maxPriceLimit, setMaxPriceLimit] = useState(1000);

  // --- Derived Data Lists ---
  const [availableLocations, setAvailableLocations] = useState([]);
  const [accommodationTypes, setAccommodationTypes] = useState([]);

  // --- Fetch Data ---
  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/accommodations`);
        if (!res.ok) throw new Error('Failed to load accommodations');
        const data = await res.json();

        setAccommodations(data);

        // Extract unique filters from data
        const locations = new Set();
        const types = new Set();
        let highestPrice = 0;

        data.forEach(acc => {
          if (acc.location) locations.add(acc.location);
          if (acc.type) types.add(acc.type);
          
          // Handle price variations (price vs pricePerNight)
          const price = acc.price || acc.pricePerNight || 0;
          if (price > highestPrice) highestPrice = price;
        });

        setAvailableLocations([...locations].sort());
        setAccommodationTypes([...types].sort());
        
        // Set dynamic max price (add buffer)
        const calculatedMax = highestPrice > 0 ? highestPrice + 100 : 1000;
        setMaxPriceLimit(calculatedMax);
        setPriceRange(calculatedMax);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching accommodations:", err);
        setError(err.message || 'Something went wrong');
        setLoading(false);
      }
    };
    fetchAccommodations();
  }, []);

  // --- Filtering Logic ---
  const filteredAccommodations = useMemo(() => {
    return accommodations.filter(acc => {
      const price = acc.price || acc.pricePerNight || 0;

      const matchesSearch =
        (acc.name && acc.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (acc.description && acc.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (acc.location && acc.location.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesLocation =
        selectedLocation === 'All' ||
        acc.location === selectedLocation;

      const matchesType =
        selectedType === 'All' ||
        acc.type === selectedType;

      const matchesPrice = price <= priceRange;

      return matchesSearch && matchesLocation && matchesType && matchesPrice;
    });
  }, [accommodations, searchTerm, selectedLocation, selectedType, priceRange]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLocation('All');
    setSelectedType('All');
    setPriceRange(maxPriceLimit);
  };

  return (
    <div className="font-sans text-gray-800 bg-white selection:bg-blue-600 selection:text-white min-h-screen pb-20 overflow-x-hidden">

      {/* --- HERO SECTION --- */}
      <div className="relative h-[50vh] lg:h-[60vh] w-full bg-gray-900 overflow-hidden rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-2xl z-10">
        
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
           <img 
             src="https://images.unsplash.com/photo-1546708773-e529a691902d?q=80&w=2070&auto=format&fit=crop" 
             alt="Sri Lanka Accommodations" 
             className="w-full h-full object-cover opacity-60"
           />
           {/* Gradient Overlays */}
           <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-blue-900/40 to-transparent mix-blend-multiply" />
           <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-transparent to-gray-900/90" />
        </div>

        {/* Hero Content */}
        <div className="relative h-full container mx-auto px-6 flex flex-col justify-center items-center text-center pb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-tight drop-shadow-2xl mb-4">
              Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Perfect Stay</span>
            </h1>
            <p className="text-base md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed">
              Discover premium villas, hotels, and resorts across Sri Lanka.
            </p>
        </div>
      </div>

      {/* --- FLOATING SEARCH BAR --- */}
      <div className="container mx-auto px-4 relative z-30 -mt-16 mb-16">
        <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/40 p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            
            {/* Search Input */}
            <div className="flex-1 w-full relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <Search size={22} />
              </div>
              <input
                className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl pl-14 pr-4 py-4 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-700 placeholder-gray-400"
                placeholder="Search villas, locations..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Quick Location Filter */}
            <div className="flex-1 w-full relative group hidden md:block">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <MapPin size={22} />
              </div>
              <select
                className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl pl-14 pr-4 py-4 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-700 cursor-pointer appearance-none"
                value={selectedLocation}
                onChange={e => setSelectedLocation(e.target.value)}
              >
                <option value="All">All Locations</option>
                {availableLocations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT LAYOUT --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-20">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6 flex justify-between items-center">
            <span className="font-bold text-gray-500 text-sm uppercase tracking-wider">
                {filteredAccommodations.length} Properties Found
            </span>
            <button
                onClick={() => setShowMobileFilters(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full font-bold shadow-sm text-blue-900 active:scale-95 transition-transform"
            >
                <SlidersHorizontal size={18} className="text-blue-600" /> Filters
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* --- SIDEBAR FILTERS --- */}
          <aside
            className={`lg:col-span-3 fixed lg:static inset-0 bg-white/95 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none z-50 lg:z-auto transition-transform duration-300 ease-in-out
            ${showMobileFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
          >
            <div className="h-full overflow-y-auto lg:overflow-visible p-6 lg:p-0 lg:sticky lg:top-24 scrollbar-hide">
              
              {/* Mobile Header */}
              <div className="flex justify-between items-center lg:hidden mb-8">
                <h3 className="font-black text-2xl text-gray-900">Filters</h3>
                <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-gray-100 rounded-full text-gray-600">
                  <X size={24} />
                </button>
              </div>

              {/* Filter Card */}
              <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-gray-100 relative overflow-hidden">
                <div className="flex justify-between items-center mb-8 relative z-10">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
                    <Filter size={18} className="text-blue-600" /> Filter By
                  </h3>
                  <button
                    onClick={clearFilters}
                    className="text-xs font-bold text-blue-500 hover:text-blue-700 uppercase tracking-wider transition-colors"
                  >
                    Reset
                  </button>
                </div>

                <div className="space-y-8 relative z-10">
                  
                  {/* Location (Sidebar) */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase text-gray-400 tracking-wider flex items-center gap-2">
                       <MapPin size={14} /> Location
                    </label>
                    <div className="relative">
                      <select
                        className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-700 cursor-pointer text-sm"
                        value={selectedLocation}
                        onChange={e => setSelectedLocation(e.target.value)}
                      >
                        <option value="All">All Locations</option>
                        {availableLocations.map(loc => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                         <MapPin size={14} />
                      </div>
                    </div>
                  </div>

                  {/* Type */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase text-gray-400 tracking-wider flex items-center gap-2">
                       <Bed size={14} /> Type
                    </label>
                    <div className="relative">
                      <select
                        className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-700 cursor-pointer text-sm"
                        value={selectedType}
                        onChange={e => setSelectedType(e.target.value)}
                      >
                        <option value="All">All Types</option>
                        {accommodationTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                         <Filter size={14} />
                      </div>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <label className="text-xs font-bold uppercase text-gray-400 tracking-wider flex items-center gap-2">
                         <DollarSign size={14} /> Max Price
                       </label>
                       <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                         ${priceRange}
                       </span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max={maxPriceLimit}
                      value={priceRange}
                      onChange={e => setPriceRange(+e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    
                    <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase">
                      <span>$0</span>
                      <span>${maxPriceLimit}</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </aside>

          {/* --- RESULTS GRID --- */}
          <main className="lg:col-span-9">

            {/* Desktop Count */}
            <div className="hidden lg:flex items-center justify-between mb-6">
                 <h2 className="text-2xl font-black text-gray-900">Available Properties</h2>
                 <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {filteredAccommodations.length} results
                 </span>
            </div>

            {loading && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p className="font-bold text-gray-400 animate-pulse">Loading accommodations...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 p-8 rounded-[2rem] text-center font-bold shadow-sm">
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && filteredAccommodations.length === 0 && (
               <div className="bg-gray-50 border border-gray-100 p-12 rounded-[2rem] text-center flex flex-col items-center">
                  <div className="bg-gray-200 w-20 h-20 rounded-full flex items-center justify-center mb-6 text-gray-400">
                     <Frown size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Matches Found</h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-6">We couldn't find any properties matching your current filters. Try adjusting your search criteria.</p>
                  <button onClick={clearFilters} className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">
                      Clear All Filters
                  </button>
               </div>
            )}

            {!loading && !error && filteredAccommodations.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredAccommodations.map(acc => (
                    <div key={acc._id} className="h-full">
                         <AccommodationsCard
                          id={acc._id}
                          // Pass array directly, let component handle logic
                          image={acc.images} 
                          name={acc.name}
                          location={acc.location}
                          type={acc.type}
                          description={acc.description}
                          // Handle price naming differences
                          pricePerNight={acc.price || acc.pricePerNight} 
                          // Pass boolean directly
                          isAvailable={acc.isAvailable} 
                          rating={acc.rating}
                          amenities={acc.amenities}
                        />
                    </div>
                  ))}
                </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
};



export default AccommodationsPage;