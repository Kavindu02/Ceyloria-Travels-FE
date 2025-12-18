import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  Heart,
  Share2,
  Check,
  ChevronRight,
  ShieldCheck,
  Home,
  Calendar,
  Info,
  ArrowRight,
  Users,
  Bed,
  Wifi,
  Wind,
  Coffee,
  Minus,
  Plus
} from 'lucide-react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const BUCKET_NAME = "images";

// --- Helper for images ---
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
  
  // State
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Booking Calculation State
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
        console.error(err);
        setLoading(false);
      }
    };
    if (id) fetchAccommodation();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!accommodation) return <div className="p-8 text-center">Accommodation not found</div>;

  // Image Logic
  const images = Array.isArray(accommodation.images) ? accommodation.images : [accommodation.images].filter(Boolean);
  const mainImage = getImageUrl(images[selectedImageIndex]);

  // Price Calculation
  const pricePerNight = accommodation.pricePerNight || 0;
  const totalPrice = pricePerNight * selectedDays * selectedRooms;

  return (
    <div className="bg-white min-h-screen font-sans text-gray-800 pb-16">
      
      {/* --- BREADCRUMBS --- */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
          <span className="cursor-pointer hover:text-blue-600" onClick={() => navigate('/')}>Home</span>
          <ChevronRight size={14} />
          <span className="cursor-pointer hover:text-blue-600" onClick={() => navigate('/accommodations')}>Accommodations</span>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium truncate">{accommodation.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* --- LEFT COLUMN: IMAGE GALLERY --- */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Image */}
            <div className="aspect-[4/3] w-full bg-gray-100 rounded-2xl overflow-hidden border border-gray-100 relative group">
              {mainImage ? (
                <img 
                  src={mainImage} 
                  alt={accommodation.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
              )}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-gray-800 shadow-sm">
                Top Rated
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${selectedImageIndex === idx ? 'border-blue-600 ring-2 ring-blue-100' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <img src={getImageUrl(img)} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- RIGHT COLUMN: PRODUCT DETAILS (BUY BOX) --- */}
          <div className="lg:col-span-5">
            <div className="sticky top-8">
              
              {/* Header Info */}
              <div className="mb-6 border-b border-gray-100 pb-6">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold">
                    <MapPin size={16} />
                    {accommodation.location || "Sri Lanka"}
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors">
                      <Heart size={20} />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                  {accommodation.name}
                </h1>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-yellow-500 font-bold">
                    <Star size={16} fill="currentColor" />
                    <span>{accommodation.rating || "4.8"}</span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500">Very Popular</span>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="space-y-6">
                
                {/* Price Display */}
                <div>
                   <p className="text-gray-500 text-sm mb-1">Price per night</p>
                   <div className="flex items-baseline gap-2">
                     <span className="text-4xl font-black text-gray-900">
                       ${pricePerNight.toLocaleString()}
                     </span>
                     <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                       Available
                     </span>
                   </div>
                </div>

                {/* Quick Specs Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-3">
                    <Home className="text-blue-600" size={20} />
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Type</p>
                      <p className="font-semibold text-gray-900 capitalize">{accommodation.type}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-3">
                    <Users className="text-blue-600" size={20} />
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Max Guests</p>
                      <p className="font-semibold text-gray-900">{accommodation.maxGuests || 2}</p>
                    </div>
                  </div>
                </div>

                {/* Selection Controls (Days & Rooms) */}
                <div className="grid grid-cols-2 gap-3">
                    {/* Days Selector */}
                    <div className="bg-white border border-gray-200 p-3 rounded-xl flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-400 uppercase">Nights</label>
                        <div className="flex items-center justify-between">
                            <button onClick={() => setSelectedDays(Math.max(1, selectedDays - 1))} className="p-1 hover:bg-gray-100 rounded">
                                <Minus size={16} />
                            </button>
                            <span className="font-bold text-lg">{selectedDays}</span>
                            <button onClick={() => setSelectedDays(selectedDays + 1)} className="p-1 hover:bg-gray-100 rounded">
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>
                    {/* Rooms Selector */}
                    <div className="bg-white border border-gray-200 p-3 rounded-xl flex flex-col gap-1">
                        <label className="text-xs font-bold text-gray-400 uppercase">Rooms</label>
                        <div className="flex items-center justify-between">
                            <button onClick={() => setSelectedRooms(Math.max(1, selectedRooms - 1))} className="p-1 hover:bg-gray-100 rounded">
                                <Minus size={16} />
                            </button>
                            <span className="font-bold text-lg">{selectedRooms}</span>
                            <button onClick={() => setSelectedRooms(selectedRooms + 1)} className="p-1 hover:bg-gray-100 rounded">
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Total Price Calculation */}
                <div className="flex justify-between items-center py-2 px-1">
                    <span className="font-medium text-gray-500">Total ({selectedDays} nights, {selectedRooms} rooms)</span>
                    <span className="text-xl font-bold text-blue-600">${totalPrice.toLocaleString()}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-transform active:scale-95 flex items-center justify-center gap-2">
                    Book Now <ArrowRight size={20}/>
                  </button>
                  <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-xl transition-colors">
                    Contact Host
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <ShieldCheck size={14} className="text-green-600" />
                  <span>Secure booking confirmation</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION: TABS --- */}
        <div className="mt-16 md:mt-24 border-t border-gray-100 pt-8">
          
          {/* Tabs Header */}
          <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
            {['Overview', 'Amenities', 'Details', 'Reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-6 py-4 font-bold text-sm uppercase tracking-wide border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.toLowerCase()
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl">
            
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="text-2xl font-bold text-gray-900">About this Property</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {accommodation.description || "Experience comfort and luxury at its finest."}
                </p>
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                    <Info size={18} /> Highlight Features
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-blue-900/80">
                    <div className="flex items-center gap-2"><Wifi size={16}/> High-Speed Wifi</div>
                    <div className="flex items-center gap-2"><Wind size={16}/> Air Conditioning</div>
                    <div className="flex items-center gap-2"><Coffee size={16}/> Breakfast Included</div>
                    <div className="flex items-center gap-2"><ShieldCheck size={16}/> 24/7 Security</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'amenities' && (
              <div className="animate-fadeIn">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Property Amenities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {accommodation.amenities?.length > 0 ? (
                      accommodation.amenities.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                          <Check className="text-green-500 shrink-0" size={20} />
                          <span className="text-gray-700 font-medium">{item}</span>
                        </div>
                      ))
                  ) : (
                      <p className="text-gray-500">No specific amenities listed.</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="animate-fadeIn space-y-8">
                 <h3 className="text-2xl font-bold text-gray-900 mb-4">Room Information</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-xl">
                        <p className="text-sm text-gray-500 uppercase font-bold mb-1">Room Type</p>
                        <p className="text-xl font-bold text-gray-900">{accommodation.roomType || "Standard Deluxe"}</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl">
                        <p className="text-sm text-gray-500 uppercase font-bold mb-1">Rooms Available</p>
                        <p className="text-xl font-bold text-gray-900">{accommodation.roomsAvailable || 5}</p>
                    </div>
                 </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="animate-fadeIn text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                <Star size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No reviews yet</h3>
                <p className="text-gray-500">Be the first to stay and review this property!</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AccommodationOverviewPage;