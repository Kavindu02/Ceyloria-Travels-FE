import React, { useState } from 'react';
import { MapPin, Star, ArrowRight, ImageOff, Heart, Wifi, UtensilsCrossed, Bed } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const BUCKET_NAME = "images";

const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  let targetImage = Array.isArray(imagePath) ? imagePath.find(Boolean) : imagePath;
  if (typeof targetImage === 'object' && targetImage !== null) {
    targetImage = targetImage.url || targetImage.src || targetImage.path || targetImage.name || targetImage.key || targetImage.filename || targetImage.fileName || null;
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

const AccommodationsCard = ({ 
  image, 
  name, 
  location, 
  type,
  description, 
  pricePerNight, 
  rating,
  amenities,
  onDetailsClick,
  id
}) => {
  
  const images = Array.isArray(image) ? image : [image];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const finalImageSrc = getImageUrl(images[currentIdx]);
  const navigate = useNavigate();

  const handleExplore = () => {
    if (onDetailsClick) {
      onDetailsClick();
    } else if (id) {
      navigate(`/accommodation-overview/${id}`);
    }
  };

  React.useEffect(() => {
    setCurrentIdx(0);
    setImgError(false);
  }, [image]);

  React.useEffect(() => {
    if (Array.isArray(images) && currentIdx < images.length && !getImageUrl(images[currentIdx])) {
      if (currentIdx < images.length - 1) {
        setCurrentIdx((i) => i + 1);
      } else {
        setImgError(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx, image]);

  return (
    <div className="group relative bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 flex flex-col h-full">
      
      {/* --- Image Container --- */}
      <div className="relative h-72 overflow-hidden bg-gray-100">
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Image Tag */}
        {finalImageSrc && !imgError ? (
          <img 
            src={finalImageSrc} 
            alt={name} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
            onError={() => {
              if (currentIdx < images.length - 1) {
                setCurrentIdx((i) => i + 1);
                setImgError(false);
              } else {
                setImgError(true);
              }
            }}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-50">
            <ImageOff size={48} className="mb-2 opacity-50" />
            <span className="text-xs font-bold uppercase tracking-widest opacity-50">Image Unavailable</span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
          <div className="bg-white/90 backdrop-blur-md text-gray-800 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-sm border border-white/50">
            <MapPin size={14} className="text-blue-600" />
            <span className="uppercase tracking-wide line-clamp-1 max-w-[120px]">{location}</span>
          </div>

          {/* Star Rating */}
          {rating && (
            <div className="bg-white/90 backdrop-blur-md text-gray-800 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1 shadow-sm border border-white/50">
              <Star size={14} className="text-yellow-400" fill="currentColor" />
              <span>{rating}</span>
            </div>
          )}
        </div>

        {/* Type Badge (Floating Bottom Left) */}
        <div className="absolute bottom-4 left-4 z-20">
          <div className="bg-gray-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold shadow-lg border border-white/10">
            <Bed size={14} className="text-cyan-400" />
            {type}
          </div>
        </div>

        {/* Favorite Button */}
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className={`absolute top-4 right-4 z-20 p-2 rounded-full backdrop-blur-md transition-all ${
            isFavorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white/20 text-white hover:bg-white/40'
          } border border-white/30`}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* --- Content Section --- */}
      <div className="p-8 flex flex-col flex-grow relative">
        {/* Title */}
        <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight line-clamp-1">
          {name}
        </h3>

        {/* Type Badge */}
        <span className="text-xs font-bold text-blue-600 mb-3 uppercase tracking-wider">
          {type}
        </span>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
          {description}
        </p>

        {/* Amenities */}
        {amenities && amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                {amenity}
              </span>
            ))}
            {amenities.length > 3 && (
              <span className="text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                +{amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* --- Footer Section --- */}
        <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
          
          {/* Price Block */}
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">Per Night</span>
            <span className="text-2xl font-black text-gray-900 tracking-tight">
              ${pricePerNight}
            </span>
          </div>

          {/* Premium Button */}
          <button 
            onClick={handleExplore}
            className="relative overflow-hidden group/btn bg-gray-900 text-white pl-6 pr-5 py-3 rounded-full font-bold text-sm shadow-lg shadow-gray-900/20 transition-all hover:shadow-gray-900/40 hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore
              <div className="bg-white/20 p-1 rounded-full group-hover/btn:translate-x-1 transition-transform">
                <ArrowRight size={14} />
              </div>
            </span>
            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default AccommodationsCard;
