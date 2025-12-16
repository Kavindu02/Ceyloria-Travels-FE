import React from 'react';
import { MapPin, ShieldCheck, Heart, Globe, Clock, Smile } from 'lucide-react';
import { Link } from "react-router-dom";


const About = () => {
  return (
    <div className="font-sans text-gray-800 bg-gray-50">
      
      {/* --- HERO SECTION --- */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        {/* Background Image (Sigiriya or similar iconic view) */}
        <img 
          src="/about/lessertraveled.png"
          alt="Sri Lanka Landscape" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
          <span className="text-cyan-400 font-bold tracking-[0.2em] mb-4 uppercase text-sm animate-fade-in-up">Discover Sri Lanka</span>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight drop-shadow-2xl mb-6">
            About Us
          </h1>
        </div>
      </div>

      {/* --- INTRO SECTION --- */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Grid */}
          <div className="lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1588258524675-55d656396b8a?q=80&w=800&auto=format&fit=crop" 
                alt="Nine Arch Bridge" 
                className="rounded-2xl shadow-xl w-full h-64 object-cover transform translate-y-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1534960680480-add9224c6536?q=80&w=800&auto=format&fit=crop" 
                alt="Sri Lankan Elephant" 
                className="rounded-2xl shadow-xl w-full h-64 object-cover"
              />
            </div>
            {/* Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-2xl border-l-4 border-blue-600 hidden md:block">
              <p className="text-4xl font-bold text-blue-600">100%</p>
              <p className="text-gray-600 text-sm font-semibold">Local Expertise</p>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2 space-y-6">
            <h4 className="text-blue-600 font-bold uppercase tracking-wider text-sm">Who We Are</h4>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              About SDK Travels
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              SDK Travels is a trusted travel company based in Sri Lanka, dedicated to providing unforgettable travel experiences for both local and international travelers. We specialize in delivering well-planned, comfortable, and personalized travel solutions that allow our clients to explore the true beauty of Sri Lanka with ease and confidence.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              From carefully curated tour packages to reliable accommodation, transportation, and guided services, we ensure every journey is smooth, safe, and memorable.
            </p>
            <div className="pt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg transform hover:-translate-y-1">
                Plan Your Trip
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- MISSION & VISION (Cards) --- */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Mission Card */}
            <div className="bg-gray-50 p-10 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <MapPin size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our mission is to provide high-quality, reliable, and customized travel services that exceed customer expectations while showcasing the rich culture, natural beauty, and unique experiences Sri Lanka has to offer.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-gray-50 p-10 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-100 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-teal-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Globe size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our vision is to become a leading travel brand in Sri Lanka, recognized for excellence, affordability, and outstanding customer service, while building long-lasting relationships with travelers around the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Why Choose SDK Travels?</h2>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {/* Feature 1 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
              <Heart className="text-pink-400 w-10 h-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Customized Packages</h3>
              <p className="text-blue-100">Tailored tour packages designed specifically to match your needs and travel style.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
              <ShieldCheck className="text-green-400 w-10 h-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Transparent Pricing</h3>
              <p className="text-blue-100">Affordable rates with zero hidden costs. We value honesty and integrity.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
              <Smile className="text-yellow-400 w-10 h-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Friendly Service</h3>
              <p className="text-blue-100">Professional, warm, and welcoming service that makes you feel at home.</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors md:col-span-1 md:col-start-1">
               <Globe className="text-cyan-400 w-10 h-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Local Expertise</h3>
              <p className="text-blue-100">Strong local knowledge combined with international service standards.</p>
            </div>

             {/* Feature 5 */}
             <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors md:col-span-2">
               <div className="flex items-start gap-4">
                  <Clock className="text-purple-400 w-10 h-10 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                    <p className="text-blue-100">We are with you every step of the way, providing round-the-clock customer support throughout your journey.</p>
                  </div>
               </div>
            </div>
          </div>
          
          <div className="mt-12">
            <p className="text-2xl font-serif italic text-blue-200">
              "With SDK Travels, you don’t just book a trip — you create memories that last a lifetime."
            </p>
          </div>
        </div>
      </section>

      {/* --- TRAVEL WITH CONFIDENCE CTA --- */}
      <section className="py-20 container mx-auto px-6">
        <div className="bg-gray-100 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Travel with Confidence
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Whether you’re planning a relaxing holiday, a honeymoon, an adventure tour, or a cultural journey, SDK Travels is your reliable travel partner from start to finish.
            </p>
            <Link to="/contact">
  <button className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors">
    Contact Us Today
  </button>
</Link>

          </div>
          <div className="md:w-1/3 flex justify-center">
             {/* Decorative image or illustration */}
             <img 
               src="https://images.unsplash.com/photo-1546708773-e57416a96432?q=80&w=600&auto=format&fit=crop" 
               alt="Sri Lankan Train" 
               className="rounded-3xl shadow-lg rotate-3 hover:rotate-0 transition-transform duration-500 w-64 h-64 object-cover"
             />
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;