import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaSearch } from 'react-icons/fa';

const ContactInfoPanel = () => (
  <div className="bg-orange-900 text-white p-10 rounded-xl shadow-2xl h-full flex flex-col justify-center">
    <h2 className="text-3xl font-serif font-bold mb-6 border-b border-orange-400 pb-3">
      Start Your Journey
    </h2>
    <p className="mb-8 text-orange-100">
      We're here to help you plan every detail of your Sri Lankan adventure. Reach out to us, and let's craft your perfect itinerary.
    </p>

    <div className="space-y-6">
      <div className="flex items-start">
        <FaMapMarkerAlt className="text-xl mr-4 mt-1 flex-shrink-0 text-orange-400" />
        <p>Sri Mahinda Dharma MW,Colombo 09.</p>
      </div>
      <div className="flex items-start">
        <FaEnvelope className="text-xl mr-4 mt-1 flex-shrink-0 text-orange-400" />
        <p>sdksolutions01@gmail.com</p>
      </div>
      <div className="flex items-start">
        <FaPhoneAlt className="text-xl mr-4 mt-1 flex-shrink-0 text-orange-400" />
        <p>+94 742216579</p>
      </div>
    </div>
  </div>
);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    phone: "",
    adults: "1", 
    kids: "0",
    infants: "0",
    arrivalDate: "",
    departureDate: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.arrivalDate || !formData.departureDate) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      alert("Message sent successfully! We will get back to you shortly.");

      setFormData({
        name: "",
        email: "",
        country: "",
        phone: "",
        adults: "1",
        kids: "0",
        infants: "0",
        arrivalDate: "",
        departureDate: "",
        message: "",
      });
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Failed to send message. Please try again or contact us directly.");
    }
  };

  const ModernInput = ({ type, name, placeholder, value, onChange, required = false, min }) => (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      min={min}
      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300 outline-none date-input-padding"
      style={name === 'arrivalDate' || name === 'departureDate' ? { color: value ? '#1f2937' : '#9ca3af' } : {}}
    />
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative h-96 bg-cover bg-center" style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('contactpagehero.png')"
      }}>
        {/* Navigation */}
        <nav className="flex items-center justify-between px-8 py-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-orange-700 font-bold text-xl">S</span>
            </div>
          </div>
          
          <div className="flex items-center gap-8 text-white">
            <a href="#" className="hover:text-orange-300 transition-colors">Home</a>
            <a href="#" className="hover:text-orange-300 transition-colors">Packages</a>
            <a href="#" className="hover:text-orange-300 transition-colors">Accommodations</a>
            <a href="#" className="hover:text-orange-300 transition-colors">About</a>
            <button className="bg-white text-gray-800 px-6 py-2 rounded-full font-semibold hover:bg-orange-100 transition-colors">
              Contact Us
            </button>
          </div>

          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded-full pl-12 pr-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:bg-opacity-30 transition-all w-48"
            />
          </div>
        </nav>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
          <span className="text-cyan-400 font-bold tracking-[0.2em] mb-4 uppercase text-sm animate-fade-in-up">Discover Sri Lanka</span>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight drop-shadow-2xl mb-6">
            Contact Us
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Contact Info Panel */}
          <div className="lg:col-span-1 hidden lg:block">
            <ContactInfoPanel />
          </div>

          {/* Form Section */}
          <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-xl shadow-2xl">
            <div className="space-y-6">

<form className="space-y-6">

  {/* Name & Email */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        Full Name
      </label>
      <ModernInput
        type="text"
        name="name"
        
        value={formData.name}
        onChange={handleChange}
        required
      />
    </div>

    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        Email
      </label>
      <ModernInput
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
    </div>
  </div>

  {/* Country & Phone */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        Country of Residence
      </label>
      <ModernInput
        type="text"
        name="Country of residence"
        value={formData.country}
        onChange={handleChange}
        required
      />
    </div>

    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        Phone Number
      </label>
      <ModernInput
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
    </div>
  </div>

  {/* Arrival & Departure Dates */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        Arrival Date
      </label>
      <ModernInput
        type="date"
        name="arrivalDate"
        value={formData.arrivalDate}
        onChange={handleChange}
        required
      />
    </div>

    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        Departure Date
      </label>
      <ModernInput
        type="date"
        name="departureDate"
        value={formData.departureDate}
        onChange={handleChange}
        required
      />
    </div>
  </div>

  {/* Adults / Kids / Infants */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        Adults
      </label>
      <ModernInput
        type="number"
        name="adults"
        placeholder="e.g. 2"
        value={formData.adults}
        onChange={handleChange}
        min="1"
        required
      />
    </div>

    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        Kids
      </label>
      <ModernInput
        type="number"
        name="kids"
        placeholder="e.g. 1"
        value={formData.kids}
        onChange={handleChange}
        min="0"
      />
    </div>

    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        Infants
      </label>
      <ModernInput
        type="number"
        name="infants"
        placeholder="e.g. 0"
        value={formData.infants}
        onChange={handleChange}
        min="0"
      />
    </div>
  </div>

  {/* Message */}
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">
      Message
    </label>
    <textarea
      name="message"
      placeholder="Tell us more about your travel plans..."
      rows="5"
      value={formData.message}
      onChange={handleChange}
      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-300 outline-none resize-none"
    />
  </div>

</form>


              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={submitForm}
                  className="flex items-center bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-orange-800 transition duration-300 transform hover:scale-105"
                >
                  Send Inquiry <FaPaperPlane className="ml-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}