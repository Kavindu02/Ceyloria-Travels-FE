import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  Heart,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Wifi,
  UtensilsCrossed,
  Bed,
  Users,
  DollarSign,
  Calendar,
  Waves,
  Mountain,
  Camera,
  Coffee,
  Wind
} from 'lucide-react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const BUCKET_NAME = "images";

const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  let targetImage = Array.isArray(imagePath) ? imagePath.find(Boolean) : imagePath;
  if (typeof targetImage === 'object' && targetImage !== null) {
    targetImage = targetImage.url || targetImage.src || targetImage.path || targetImage.name || null;
  }
  if (!targetImage || typeof targetImage !== 'string') return null;
  targetImage = targetImage.replace(/\\/g, '/');
  if (/^(https?:|data:|blob:)/i.test(targetImage)) return targetImage;
  if (targetImage.startsWith('/') || targetImage.includes('/storage/')) return targetImage;
  if (!SUPABASE_URL) return targetImage;
  const base = SUPABASE_URL.replace(/\/$/, '');
  const imgPath = String(targetImage).replace(/^\//, '');
  return `${base}/storage/v1/object/public/${BUCKET_NAME}/${imgPath}`;
};

const AccommodationOverviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedDays, setSelectedDays] = useState(1);
  const [selectedRooms, setSelectedRooms] = useState(1);

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/accommodations/${id}`);
        if (!res.ok) throw new Error('Failed to load accommodation');
        const data = await res.json();
        setAccommodation(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Something went wrong');
        setLoading(false);
      }
    };
    if (id) fetchAccommodation();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="font-bold text-gray-400">Loading accommodation details...</p>
      </div>
    );
  }

  if (error || !accommodation) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-100 text-red-600 p-12 rounded-[2rem] text-center font-bold shadow-sm max-w-md w-full">
          <AlertCircle className="mx-auto mb-4" size={48} />
          <p className="mb-6">{error || 'Accommodation not found'}</p>
          <button 
            onClick={() => navigate('/accommodations')}
            className="text-blue-600 hover:underline"
          >
            Back to Accommodations
          </button>
        </div>
      </div>
    );
  }

  const images = Array.isArray(accommodation.images) ? accommodation.images : [accommodation.images];
  const currentImage = getImageUrl(images[currentImageIndex]);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const totalPrice = accommodation.pricePerNight * selectedDays * selectedRooms;

  return (
    <div className="font-sans text-gray-800 bg-white selection:bg-blue-600 selection:text-white overflow-x-hidden">
      
      {/* --- BACK BUTTON --- */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <button 
            onClick={() => navigate('/accommodations')}
            className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors group"
          >
            <ChevronLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
            Back to Accommodations
          </button>
        </div>
      </div>

      {/* --- HERO IMAGE SECTION --- */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-gray-900 rounded-b-[2.5rem] md:rounded-b-[4rem]">
        
        {/* Image Gallery */}
        <div className="relative w-full h-full">
          {currentImage ? (
            <img 
              src={currentImage} 
              alt={accommodation.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400">Image unavailable</span>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
        </div>

        {/* Image Navigation */}
        {images.length > 1 && (
          <div className="absolute bottom-8 left-0 right-0 z-30 flex items-center justify-center gap-4">
            <button 
              onClick={handlePrevImage}
              className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all border border-white/30"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex gap-2">
              {images.map((_, idx) => (
                <div 
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`h-2 rounded-full cursor-pointer transition-all ${
                    idx === currentImageIndex 
                      ? 'w-8 bg-cyan-400' 
                      : 'w-2 bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={handleNextImage}
              className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all border border-white/30"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        {/* Top Action Buttons */}
        <div className="absolute top-8 right-8 z-30 flex gap-3">
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-3 rounded-full backdrop-blur-md transition-all ${
              isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-white/20 text-white hover:bg-white/40'
            } border border-white/30`}
          >
            <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          <button className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all border border-white/30">
            <Share2 size={20} />
          </button>
        </div>

        {/* Floating Info Cards */}
        <div className="absolute bottom-8 left-8 z-20 flex flex-col gap-4">
          <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg border border-white/50">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">Type</span>
            <span className="text-2xl font-black text-gray-900">{accommodation.type}</span>
          </div>
          <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg border border-white/50">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">Price Per Night</span>
            <span className="text-2xl font-black text-blue-600">${accommodation.pricePerNight}</span>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* --- LEFT COLUMN: DETAILS --- */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Title & Location */}
              <div className="space-y-4">
                <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest">
                  {accommodation.type}
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
                  {accommodation.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-lg">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="text-blue-600" size={20} />
                    {accommodation.location}
                  </div>
                  {accommodation.rating && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Star className="text-yellow-400" size={20} fill="currentColor" />
                      <span className="font-bold">{accommodation.rating}</span> (87 reviews)
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">About This Property</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {accommodation.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Amenities</h2>
                {accommodation.amenities && accommodation.amenities.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {accommodation.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <Check className="text-blue-600 flex-shrink-0" size={20} />
                        <span className="text-gray-700 font-medium">{amenity}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Check className="text-blue-600 flex-shrink-0" size={20} />
                      <span className="text-gray-700 font-medium">Free WiFi</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="text-blue-600 flex-shrink-0" size={20} />
                      <span className="text-gray-700 font-medium">Air Conditioning</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="text-blue-600 flex-shrink-0" size={20} />
                      <span className="text-gray-700 font-medium">24/7 Room Service</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="text-blue-600 flex-shrink-0" size={20} />
                      <span className="text-gray-700 font-medium">Swimming Pool</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="text-blue-600 flex-shrink-0" size={20} />
                      <span className="text-gray-700 font-medium">Restaurant & Bar</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className="text-blue-600 flex-shrink-0" size={20} />
                      <span className="text-gray-700 font-medium">Parking Available</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Room Details */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Room Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-100">
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Rooms Available</p>
                    <p className="text-3xl font-black text-gray-900">{accommodation.roomsAvailable || 12}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Max Guests</p>
                    <p className="text-3xl font-black text-gray-900">{accommodation.maxGuests || 4}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Room Type</p>
                    <p className="text-xl font-bold text-gray-900">{accommodation.roomType || 'Deluxe'}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* --- RIGHT COLUMN: BOOKING CARD --- */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-8 space-y-6">
                
                {/* Price Summary */}
                <div className="space-y-4 pb-6 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Price per night</span>
                    <span className="text-2xl font-black text-gray-900">${accommodation.pricePerNight}</span>
                  </div>
                </div>

                {/* Days Selection */}
                <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <Calendar size={16} /> Number of Days
                  </label>
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                    <button 
                      onClick={() => setSelectedDays(Math.max(1, selectedDays - 1))}
                      className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 font-bold text-gray-900"
                    >
                      −
                    </button>
                    <span className="flex-1 text-center font-black text-2xl text-gray-900">
                      {selectedDays}
                    </span>
                    <button 
                      onClick={() => setSelectedDays(selectedDays + 1)}
                      className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 font-bold text-gray-900"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Rooms Selection */}
                <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <Bed size={16} /> Number of Rooms
                  </label>
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                    <button 
                      onClick={() => setSelectedRooms(Math.max(1, selectedRooms - 1))}
                      className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 font-bold text-gray-900"
                    >
                      −
                    </button>
                    <span className="flex-1 text-center font-black text-2xl text-gray-900">
                      {selectedRooms}
                    </span>
                    <button 
                      onClick={() => setSelectedRooms(selectedRooms + 1)}
                      className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 font-bold text-gray-900"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="space-y-2 bg-blue-50 p-6 rounded-2xl border border-blue-100">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Total Price</span>
                  <span className="text-4xl font-black text-blue-600">${totalPrice}</span>
                  <span className="text-xs text-gray-500">{selectedDays} day{selectedDays > 1 ? 's' : ''} × {selectedRooms} room{selectedRooms > 1 ? 's' : ''}</span>
                </div>

                {/* CTA Buttons */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-blue-600/30 transition-all transform hover:scale-105 active:scale-95">
                  Book Now
                </button>
                
                <button className="w-full bg-white border-2 border-gray-200 text-gray-900 font-bold py-4 px-6 rounded-2xl hover:bg-gray-50 transition-all">
                  Contact Us
                </button>

                {/* Info Cards */}
                <div className="space-y-3 pt-6 border-t border-gray-100">
                  <div className="flex gap-3">
                    <Calendar className="text-blue-600 flex-shrink-0" size={20} />
                    <div className="text-sm">
                      <span className="font-bold text-gray-900 block">Flexible Booking</span>
                      <span className="text-gray-600">Free cancellation up to 7 days</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Users className="text-blue-600 flex-shrink-0" size={20} />
                    <div className="text-sm">
                      <span className="font-bold text-gray-900 block">Group Rates</span>
                      <span className="text-gray-600">Special discounts for groups</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <DollarSign className="text-blue-600 flex-shrink-0" size={20} />
                    <div className="text-sm">
                      <span className="font-bold text-gray-900 block">Best Price Guarantee</span>
                      <span className="text-gray-600">Lowest rates guaranteed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 text-center mb-16">Why Stay With Us?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Wifi, title: 'High-Speed WiFi', desc: 'Stay connected everywhere' },
              { icon: Wind, title: 'Climate Control', desc: 'Perfect temperature control' },
              { icon: Coffee, title: 'Continental Breakfast', desc: 'Complimentary morning meals' },
              { icon: Camera, title: 'Scenic Views', desc: 'Beautiful property views' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AccommodationOverviewPage;
