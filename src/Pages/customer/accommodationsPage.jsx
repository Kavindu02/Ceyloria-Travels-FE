import React, { useState, useEffect, useMemo } from 'react';
import AccommodationsCard from '../../components/AccommodationsCard';
import {
  Search, 
  Filter, 
  X, 
  MapPin,
  SlidersHorizontal,
  DollarSign,
  Star,
  Wifi,
  UtensilsCrossed,
  Bed
} from 'lucide-react';

const AccommodationsPage = () => {

  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [priceRange, setPriceRange] = useState(5000);

  const [maxPriceLimit, setMaxPriceLimit] = useState(5000);
  const [availableLocations, setAvailableLocations] = useState([]);
  const [accommodationTypes, setAccommodationTypes] = useState([]);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/accommodations`);
        if (!res.ok) throw new Error('Failed to load accommodations');
        const data = await res.json();

        setAccommodations(data);

        const locations = new Set();
        const types = new Set();
        let highestPrice = 0;

        data.forEach(acc => {
          if (acc.location) locations.add(acc.location);
          if (acc.type) types.add(acc.type);
          if (acc.pricePerNight > highestPrice) highestPrice = acc.pricePerNight;
        });

        setAvailableLocations([...locations]);
        setAccommodationTypes([...types]);
        setMaxPriceLimit(highestPrice + 500);
        setPriceRange(highestPrice + 500);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Something went wrong');
        setLoading(false);
      }
    };
    fetchAccommodations();
  }, []);

  const filteredAccommodations = useMemo(() => {
    return accommodations.filter(acc => {
      const matchesSearch =
        acc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        acc.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation =
        selectedLocation === 'All' ||
        acc.location === selectedLocation;

      const matchesType =
        selectedType === 'All' ||
        acc.type === selectedType;

      const matchesPrice = acc.pricePerNight <= priceRange;

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
      <div className="relative h-[60vh] lg:h-[70vh] w-full bg-gray-900 overflow-hidden rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-2xl z-10">
        
        {/* Parallax Background Image */}
        <div className="absolute inset-0 w-full h-full">
           <img 
             src="accommodationshero.png" 
             alt="Sri Lanka Accommodations" 
             className="w-full h-full object-cover scale-105 animate-subtle-zoom opacity-60"
           />
           {/* Complex Gradients */}
           <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-blue-900/40 to-transparent mix-blend-multiply" />
           <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-transparent to-gray-900/30" />
        </div>

        {/* Hero Content */}
        <div className="relative h-full container mx-auto px-6 flex flex-col justify-center pb-20 items-center text-center">
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-tight drop-shadow-2xl mb-6">
              Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Perfect Stay</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed">
              Discover premium accommodations across Sri Lanka, from luxury resorts to cozy boutique hotels.
            </p>
        </div>
      </div>

      {/* --- FLOATING SEARCH BAR --- */}
      <div className="container mx-auto px-4 relative z-30 -mt-24 mb-16">
        <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/40 p-3 md:p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            
            {/* Search Input */}
            <div className="flex-1 w-full relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <Search size={22} />
              </div>
              <input
                className="w-full bg-white/50 border border-gray-200 rounded-2xl pl-14 pr-4 py-4 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-700 placeholder-gray-400"
                placeholder="Search accommodations..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Location Input */}
            <div className="flex-1 w-full relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <MapPin size={22} />
              </div>
              <select
                className="w-full bg-white/50 border border-gray-200 rounded-2xl pl-14 pr-4 py-4 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-700"
                value={selectedLocation}
                onChange={e => setSelectedLocation(e.target.value)}
              >
                <option value="All">All Locations</option>
                {availableLocations.map(loc => (
                  <option key={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-600/30 transition-all transform hover:scale-105 active:scale-95">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-20">
        
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px] -z-10 opacity-60" />

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-8 flex justify-end">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full font-bold shadow-sm text-blue-900"
          >
            <SlidersHorizontal size={18} className="text-blue-600" /> Filters
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* --- FILTER SIDEBAR --- */}
          <aside
            className={`lg:col-span-3 fixed lg:static inset-0 bg-white/95 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none z-50 lg:z-auto transition-transform duration-300 ease-in-out
            ${showMobileFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
          >
            <div className="h-full overflow-y-auto lg:overflow-visible p-6 lg:p-0 lg:sticky lg:top-24">
              
              {/* Mobile Header */}
              <div className="flex justify-between items-center lg:hidden mb-8">
                <h3 className="font-black text-2xl text-gray-900">Filters</h3>
                <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-gray-100 rounded-full text-gray-600">
                  <X size={24} />
                </button>
              </div>

              {/* Filter Card */}
              <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-gray-100 relative overflow-hidden">
                {/* Decorative blob inside card */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl -mr-10 -mt-10 opacity-50" />

                <div className="flex justify-between items-center mb-8 relative z-10">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
                    <Filter size={18} className="text-blue-600" /> Filter By
                  </h3>
                  <button
                    onClick={clearFilters}
                    className="text-xs font-bold text-blue-500 hover:text-blue-700 uppercase tracking-wider"
                  >
                    Reset All
                  </button>
                </div>

                <div className="space-y-8 relative z-10">
                  
                  {/* Location Select */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase text-gray-400 tracking-wider flex items-center gap-2">
                       <MapPin size={14} /> Location
                    </label>
                    <div className="relative">
                      <select
                        className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-700 cursor-pointer"
                        value={selectedLocation}
                        onChange={e => setSelectedLocation(e.target.value)}
                      >
                        <option value="All">All Locations</option>
                        {availableLocations.map(loc => (
                          <option key={loc}>{loc}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                      </div>
                    </div>
                  </div>

                  {/* Accommodation Type Select */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase text-gray-400 tracking-wider flex items-center gap-2">
                       <Bed size={14} /> Type
                    </label>
                    <div className="relative">
                      <select
                        className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-700 cursor-pointer"
                        value={selectedType}
                        onChange={e => setSelectedType(e.target.value)}
                      >
                        <option value="All">All Types</option>
                        {accommodationTypes.map(type => (
                          <option key={type}>{type}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                      </div>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                       <label className="text-xs font-bold uppercase text-gray-400 tracking-wider flex items-center gap-2">
                         <DollarSign size={14} /> Max Price/Night
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

            {loading && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p className="font-bold text-gray-400">Finding the perfect accommodation for you...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 p-8 rounded-[2rem] text-center font-bold shadow-sm">
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && filteredAccommodations.length === 0 && (
               <div className="bg-gray-50 border border-gray-100 p-12 rounded-[2rem] text-center">
                  <div className="bg-gray-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                     <Search size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Accommodations Found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                  <button onClick={clearFilters} className="mt-6 text-blue-600 font-bold hover:underline">Clear all filters</button>
               </div>
            )}

            {!loading && !error && filteredAccommodations.length > 0 && (
              <div className="space-y-6">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest pl-2">
                  Showing {filteredAccommodations.length} Properties
                </p>
                
                {/* Use grid for cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredAccommodations.map(acc => (
                    <div key={acc._id || acc.id} className="transform transition-all duration-300 hover:-translate-y-2">
                         <AccommodationsCard
                          image={acc.images || acc.image || acc.photos || acc.photosList}
                          name={acc.name || acc.title || acc.propertyName}
                          location={acc.location || acc.city || acc.address}
                          type={acc.type || acc.category || acc.propertyType}
                          description={acc.description || acc.shortDescription || acc.details}
                          pricePerNight={acc.pricePerNight || acc.price || acc.costPerNight}
                          rating={acc.rating || acc.stars}
                          amenities={acc.amenities || acc.facilities || acc.features}
                          id={acc._id || acc.id}
                        />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
};

export default AccommodationsPage;
