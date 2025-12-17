import React, { useState } from "react";
import toast from "react-hot-toast";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Users, 
  Globe, 
  Plane,
  ChevronRight
} from 'lucide-react';

// --- Components ---

// Styled Input Component
const PremiumInput = ({ type, name, placeholder, value, onChange, required = false, label, icon: Icon, min }) => (
  <div className="group relative">
    <label className="absolute -top-3 left-4 bg-white px-2 text-xs font-bold text-blue-600 tracking-wider uppercase z-10 transition-all group-focus-within:text-blue-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/50 transition-all duration-300 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 hover:border-blue-300">
      <div className="flex items-center">
        {Icon && (
          <div className="pl-5 text-gray-400 group-focus-within:text-blue-600 transition-colors">
            <Icon size={20} />
          </div>
        )}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          min={min}
          className={`w-full bg-transparent px-5 py-4 md:py-5 text-gray-900 placeholder-gray-400 outline-none transition-all ${Icon ? 'pl-3' : ''} font-medium text-sm md:text-base`}
        />
      </div>
      {/* Animated bottom border */}
      <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-blue-600 to-cyan-400 transform -translate-x-full transition-transform duration-500 group-focus-within:translate-x-0" />
    </div>
  </div>
);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "", email: "", country: "", phone: "",
    adults: "2", kids: "0", infants: "0",
    arrivalDate: "", departureDate: "", message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Success toast
        toast.success("✅ Inquiry Sent Successfully!", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#10b981",
            color: "#fff",
            fontWeight: "600",
            borderRadius: "0.75rem",
            padding: "16px 24px",
          },
        });

        setSubmitStatus({
          type: "success",
          message: "Inquiry Sent Successfully! We will contact you shortly.",
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          country: "",
          phone: "",
          adults: "2",
          kids: "0",
          infants: "0",
          arrivalDate: "",
          departureDate: "",
          message: "",
        });
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Failed to send inquiry. Please try again.";
        
        // Error toast
        toast.error(`❌ ${errorMessage}`, {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#ef4444",
            color: "#fff",
            fontWeight: "600",
            borderRadius: "0.75rem",
            padding: "16px 24px",
          },
        });

        setSubmitStatus({
          type: "error",
          message: errorMessage,
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      
      // Connection error toast
      toast.error("❌ Connection Error. Please try again.", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#ef4444",
          color: "#fff",
          fontWeight: "600",
          borderRadius: "0.75rem",
          padding: "16px 24px",
        },
      });

      setSubmitStatus({
        type: "error",
        message: "Error sending inquiry. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans text-gray-800 bg-white selection:bg-blue-600 selection:text-white overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <div className="relative h-[60vh] md:h-[80vh] w-full bg-gray-900 overflow-hidden rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-2xl z-10">
        
        {/* Parallax Background Image */}
        <div className="absolute inset-0 w-full h-full">
           <img 
             src="contactpagehero.png" 
             alt="Sri Lanka Travel"
             className="w-full h-full object-cover scale-105 animate-subtle-zoom opacity-60"
           />
           {/* Complex Gradients */}
           <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-blue-900/40 to-transparent mix-blend-multiply" />
           <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-transparent to-gray-900/30" />
        </div>

        {/* Hero Content */}
        <div className="relative h-full container mx-auto px-6 flex flex-col justify-center pb-10">
          <div className="max-w-4xl space-y-6 md:space-y-8">
          
            
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-tight md:leading-[0.9] drop-shadow-2xl">
              Let's Plan Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Dream Getaway
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed border-l-4 border-cyan-400 pl-6">
              Experience the untamed beauty of Sri Lanka with bespoke itineraries crafted just for you.
            </p>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT SECTION --- */}
      {/* Moved down using mt-12 (approx 48px) instead of overlapping */}
      <div className="relative mt-12 z-20 container mx-auto px-4 md:px-6 pb-20">
        
        {/* Main Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* --- LEFT COLUMN: Contact Details & Visuals --- */}
          <div className="w-full lg:w-1/3 space-y-8 lg:sticky lg:top-10">
            
            {/* Dark Card */}
            <div className="bg-[#0f172a] text-white p-8 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden group border border-gray-800">
              {/* Abstract Background Shapes */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] group-hover:bg-blue-500/30 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-[60px]" />
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Get in Touch</h3>
                <p className="text-gray-400 mb-8 md:mb-10 text-sm leading-relaxed">
                  Have questions? We are available 24/7 to assist you with your travel plans.
                </p>

                <div className="space-y-6 md:space-y-8">
                  <div className="flex items-start gap-5 group/item cursor-pointer">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover/item:bg-blue-600 group-hover/item:border-blue-500 transition-all duration-300">
                      <MapPin className="text-cyan-400 group-hover/item:text-white transition-colors" size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Headquarters</p>
                      <p className="font-medium text-base md:text-lg text-gray-200 group-hover/item:text-white transition-colors">
                        Sri Mahinda Dharma MW,<br/> Colombo 09.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group/item cursor-pointer">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover/item:bg-blue-600 group-hover/item:border-blue-500 transition-all duration-300">
                      <Mail className="text-cyan-400 group-hover/item:text-white transition-colors" size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Email Inquiry</p>
                      <p className="font-medium text-base md:text-lg text-gray-200 group-hover/item:text-white transition-colors break-all">sdksolutions01@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 group/item cursor-pointer">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover/item:bg-blue-600 group-hover/item:border-blue-500 transition-all duration-300">
                      <Phone className="text-cyan-400 group-hover/item:text-white transition-colors" size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Hotline</p>
                      <p className="font-medium text-base md:text-lg text-gray-200 group-hover/item:text-white transition-colors">+94 742216579</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
                   <div>
                     <p className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">24/7</p>
                     <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest">Support</p>
                   </div>
                   <div className="h-10 w-[1px] bg-white/10"></div>
                   <div className="text-right">
                     <p className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">100%</p>
                     <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest">Tailormade</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Mini Map Visual */}
            <div className="hidden md:block h-64 rounded-[2.5rem] bg-blue-50 border-4 border-white shadow-xl overflow-hidden relative group">
  
  {/* Google Map Embed */}
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.63297228478!2d79.786164!3d6.921838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593c8b6a5e7b%3A0x2b9e3c9a1b6a8d6c!2sColombo!5e0!3m2!1sen!2slk!4v1734320000000"
    className="w-full h-full border-0 transition-all duration-700 scale-100 group-hover:scale-110"
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Google Map"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />

  {/* Center Pin */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="bg-white p-3 rounded-full shadow-lg animate-bounce">
      <MapPin className="text-red-500" fill="currentColor" />
    </div>
  </div>

</div>

          </div>

          {/* --- RIGHT COLUMN: Complex Form --- */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-14 shadow-xl border border-gray-100 relative">
              
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                 <Plane size={200} />
              </div>

              <div className="mb-8 md:mb-12">
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
                  Craft Your <span className="text-blue-600">Journey</span>
                </h2>
                <p className="text-gray-500 text-base md:text-lg">
                  Fill in the details below and let our travel specialists design an exclusive itinerary tailored to your preferences.
                </p>
              </div>

              {submitStatus && (
                <div className={`mb-6 p-4 rounded-xl border-2 ${
                  submitStatus.type === 'success'
                    ? 'bg-green-50 border-green-300 text-green-800'
                    : 'bg-red-50 border-red-300 text-red-800'
                }`}>
                  <p className="font-semibold text-sm md:text-base">{submitStatus.message}</p>
                </div>
              )}

              <form className="space-y-8 relative z-10">
                
                {/* Section 1: Personal Info */}
                <div className="space-y-6">
                  <h4 className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-gray-300"></span> 01. Personal Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <PremiumInput type="text" name="name" label="Full Name" placeholder="e.g. Alexander Hamilton" value={formData.name} onChange={handleChange} required />
                    <PremiumInput type="email" name="email" label="Email Address" placeholder="alex@example.com" value={formData.email} onChange={handleChange} icon={Mail} required />
                    <PremiumInput type="text" name="country" label="Country of Residence" placeholder="e.g. United Kingdom" value={formData.country} onChange={handleChange} icon={Globe} required />
                    <PremiumInput type="text" name="phone" label="Phone Number" placeholder="+44 7700 900077" value={formData.phone} onChange={handleChange} icon={Phone} required />
                  </div>
                </div>

                {/* Section 2: Trip Details */}
                <div className="space-y-6 pt-4">
                  <h4 className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-gray-300"></span> 02. Trip Details
                  </h4>
                  
                  {/* Date Pickers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="bg-blue-50/50 p-1 rounded-2xl">
                      <PremiumInput type="date" name="arrivalDate" label="Arrival Date" value={formData.arrivalDate} onChange={handleChange} required />
                    </div>
                    <div className="bg-blue-50/50 p-1 rounded-2xl">
                       <PremiumInput type="date" name="departureDate" label="Departure Date" value={formData.departureDate} onChange={handleChange} required />
                    </div>
                  </div>

                  {/* Guest Counter Complex UI */}
                  <div className="bg-gray-50 rounded-3xl p-6 md:p-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                       <Users className="text-blue-600" />
                       <h5 className="font-bold text-gray-900">Who is traveling?</h5>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {['Adults', 'Kids', 'Infants'].map((type, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center hover:border-blue-400 transition-colors">
                           <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">{type}</span>
                           <input 
                             type="number" 
                             name={type.toLowerCase()}
                             value={formData[type.toLowerCase()]}
                             onChange={handleChange}
                             min="0"
                             className="w-full text-center text-3xl font-black text-gray-800 outline-none bg-transparent"
                           />
                           <span className="text-[10px] text-gray-400 mt-1">
                             {type === 'Adults' ? 'Age 12+' : type === 'Kids' ? 'Age 2-11' : 'Age <2'}
                           </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section 3: Preferences */}
                <div className="space-y-6 pt-4">
                   <h4 className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-gray-300"></span> 03. Your Vision
                  </h4>
                  
                  <div className="group relative">
                    <label className="absolute -top-3 left-4 bg-white px-2 text-xs font-bold text-blue-600 tracking-wider uppercase z-10">
                      Message / Special Requests
                    </label>
                    <textarea
                      name="message"
                      placeholder="Tell us about your dream trip. Do you prefer luxury hotels or boutique villas? Are you interested in wildlife, culture, or beaches?"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-gray-50 rounded-2xl border border-gray-200 p-6 text-gray-900 placeholder-gray-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Action Area */}
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between border-t border-gray-100 gap-6">
                  <p className="text-sm text-gray-500 text-center md:text-left">
                    We respect your privacy. No spam ever.
                  </p>
                  
                  <button
                    onClick={submitForm}
                    disabled={isSubmitting}
                    className="relative overflow-hidden group bg-gray-900 text-white pl-10 pr-12 py-4 md:py-5 rounded-full font-bold text-lg shadow-2xl shadow-gray-900/30 transition-all hover:shadow-gray-900/50 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? 'Processing...' : 'Send My Inquiry'}
                      <div className="bg-white/20 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                        <ChevronRight size={20} />
                      </div>
                    </span>
                    {/* Hover Gradient Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}