import React, { useState } from 'react';
import { MapPin, Clock, ArrowRight, ImageOff } from 'lucide-react';

// 1. Get Supabase URL from your Environment Variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

// 2. ⚠️ CONFIG: Ensure this matches your Supabase Storage Bucket name exactly
const BUCKET_NAME = "images"; 

// --- Helper Function to Generate URL ---
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;

  // Pick first useful value if an array was passed
  let targetImage = Array.isArray(imagePath) ? imagePath.find(Boolean) : imagePath;

  // If it's an object, try a set of common properties
  if (typeof targetImage === 'object' && targetImage !== null) {
    targetImage = targetImage.url || targetImage.src || targetImage.path || targetImage.name || targetImage.key || targetImage.filename || targetImage.fileName || null;
  }

  if (!targetImage || typeof targetImage !== 'string') return null;

  // Normalize Windows backslashes to forward slashes
  targetImage = targetImage.replace(/\\/g, '/');

  // External absolute URLs (including data: and blob:)
  if (/^(https?:|data:|blob:)/i.test(targetImage)) return targetImage;

  // If the path is already absolute (starts with /) or contains storage path, return as-is
  if (targetImage.startsWith('/') || targetImage.includes('/storage/')) return targetImage;

  // If SUPABASE_URL is missing, return the filename as-is (may resolve from public folder)
  if (!SUPABASE_URL) {
    if (import.meta.env.DEV) console.warn('[TravelCard] VITE_SUPABASE_URL not set; using image value as-is:', targetImage);
    return targetImage;
  }

  // Normalize slashes and construct Supabase public storage URL
  const base = SUPABASE_URL.replace(/\/$/, '');
  const imgPath = String(targetImage).replace(/^\//, '');
  return `${base}/storage/v1/object/public/${BUCKET_NAME}/${imgPath}`;
};

const TravelCard = ({ 
  image, 
  title, 
  location, 
  duration, 
  description, 
  price, 
  oldPrice, 
  isSale,
  onDetailsClick 
}) => {
  
  // Support multiple candidate images: try each until one loads
  const images = Array.isArray(image) ? image : [image];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [imgError, setImgError] = useState(false);
  const finalImageSrc = getImageUrl(images[currentIdx]);

  // Reset index when `image` prop changes
  React.useEffect(() => {
    setCurrentIdx(0);
    setImgError(false);
  }, [image]);

  // If current candidate yields no URL, advance to next available
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
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col h-full">
      
      {/* --- Image Container --- */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        
        {/* 1. The Image Tag */}
        {finalImageSrc && !imgError ? (
          <img 
            src={finalImageSrc} 
            alt={title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              if (import.meta.env.DEV) console.warn('[TravelCard] image failed to load:', { image, finalImageSrc, currentIdx, errorEvent: e });
              // Try the next candidate if available
              if (currentIdx < images.length - 1) {
                setCurrentIdx((i) => i + 1);
                setImgError(false);
              } else {
                setImgError(true);
              }
            }}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-200">
            <ImageOff size={48} />
            <span className="text-xs mt-2 font-medium">No Image Available</span>
          </div>
        )}

       
        
        {/* Sale Badge */}
        {isSale && (
          <div className="absolute top-4 right-4 bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg animate-pulse z-10">
            Sale
          </div>
        )}

        {/* Location Badge */}
        <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1 z-10">
          <MapPin size={12} className="text-cyan-400" />
          {location}
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-0 left-0 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-tr-xl flex items-center gap-2 text-sm font-bold text-gray-700 shadow-sm z-10">
          <Clock size={16} className="text-cyan-600" />
          {duration}
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors line-clamp-1">
          {title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
          {description}
        </p>

        {/* --- Footer Section --- */}
        <div className="mt-auto flex items-end justify-between border-t border-gray-100 pt-5">
          <button 
            onClick={onDetailsClick}
            className="bg-gray-50 hover:bg-cyan-500 hover:text-white text-gray-700 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 group/btn"
          >
            Details
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
          
          <div className="text-right">
            <span className="text-xs text-gray-400 font-medium block mb-1">Total Price</span>
            <div className="flex items-center gap-2 justify-end">
              {oldPrice && (
                <span className="text-sm text-gray-400 line-through decoration-red-400 decoration-2">
                  ${oldPrice}
                </span>
              )}
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
                ${price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;