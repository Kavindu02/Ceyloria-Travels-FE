import React from 'react';
import {
  MapPin,
  ShieldCheck,
  Heart,
  Globe,
  Clock,
  Smile,
  ChevronRight,
  Target,
  Award
} from 'lucide-react';
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="font-sans text-gray-800 bg-white selection:bg-blue-600 selection:text-white overflow-x-hidden">

      {/* --- HERO SECTION (Matches Contact Page) --- */}
      <div className="relative h-[60vh] md:h-[80vh] w-full bg-gray-900 overflow-hidden rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-2xl z-10">

        {/* Parallax Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="abouthero.png"
            alt="Sri Lanka Landscape"
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
              Our Story, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Your Adventure
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed border-l-4 border-cyan-400 pl-6">
              Ceyloria is dedicated to unveiling the true beauty of Sri Lanka, creating unforgettable journeys one traveler at a time.
            </p>
          </div>
        </div>
      </div>

      {/* --- INTRO SECTION --- */}
      <section className="relative mt-12 md:mt-20 container mx-auto px-6 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Image Grid with Premium Styling */}
          <div className="lg:w-1/2 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-[2.5rem] blur-xl opacity-20"></div>
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <img
                src="/gallery/ninearch.png"
                alt="Nine Arch Bridge"
                className="rounded-[2rem] shadow-2xl w-full h-64 md:h-80 object-cover transform translate-y-8 hover:scale-105 transition-transform duration-700"
              />
              <img
                src="elephant.png"
                alt="Sri Lankan Elephant"
                className="rounded-[2rem] shadow-2xl w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-10 -right-6 md:-right-10 bg-white p-6 md:p-8 rounded-[2rem] shadow-2xl border border-gray-100 z-20 hidden md:block animate-float">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-4 rounded-full text-blue-600">
                  <Award size={32} />
                </div>
                <div>
                  <p className="text-4xl font-black text-gray-900">100%</p>
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">Local Expertise</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2 space-y-8">
            <div>
              <h4 className="text-sm font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-blue-600"></span> Who We Are
              </h4>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
                Crafting Memories <br />
                <span className="text-blue-600">Since Day One</span>
              </h2>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              Ceyloria is a trusted travel company based in Sri Lanka, dedicated to providing unforgettable travel experiences for both local and international travelers. We specialize in delivering well-planned, comfortable, and personalized travel solutions that allow our clients to explore the true beauty of Sri Lanka with ease and confidence.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              From carefully curated tour packages to reliable accommodation, transportation, and guided services, we ensure every journey is smooth, safe, and memorable.
            </p>

            <Link to="/packages">
              <div className="pt-4">
                <button className="group flex items-center bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-gray-900/20 hover:bg-blue-900 transition-all duration-300 transform hover:-translate-y-1">
                  Plan Your Trip
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* --- MISSION & VISION (Premium Cards) --- */}
      <section className="bg-gray-50 py-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 left-0 w-96 h-96 bg-cyan-400 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">

            {/* Mission Card */}
            <div className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                <Target size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Our mission is to provide high-quality, reliable, and customized travel services that exceed customer expectations while showcasing the rich culture, natural beauty, and unique experiences Sri Lanka has to offer.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100 hover:border-teal-200 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                <Globe size={32} />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Our vision is to become a leading travel brand in Sri Lanka, recognized for excellence, affordability, and outstanding customer service, while building long-lasting relationships with travelers around the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (Dark Theme like Contact Page) --- */}
      <section className="py-24 bg-[#0f172a] relative overflow-hidden">
        {/* Abstract Background Shapes (Matches Contact Page Left Column) */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Why Choose <span className="text-cyan-400">Ceyloria?</span></h2>
            <p className="text-gray-400 text-lg">We don't just plan trips; we curate experiences that linger in your memory long after you return home.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Feature 1 */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 group">
              <div className="bg-pink-500/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-pink-400 group-hover:scale-110 transition-transform">
                <Heart size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Customized Packages</h3>
              <p className="text-gray-400 leading-relaxed">Tailored tour packages designed specifically to match your needs and travel style.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 hover:border-green-500/50 transition-all duration-300 group">
              <div className="bg-green-500/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-green-400 group-hover:scale-110 transition-transform">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Transparent Pricing</h3>
              <p className="text-gray-400 leading-relaxed">Affordable rates with zero hidden costs. We value honesty and integrity above all.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 hover:border-yellow-500/50 transition-all duration-300 group">
              <div className="bg-yellow-500/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-yellow-400 group-hover:scale-110 transition-transform">
                <Smile size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Friendly Service</h3>
              <p className="text-gray-400 leading-relaxed">Professional, warm, and welcoming service that makes you feel at home.</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300 group md:col-span-1">
              <div className="bg-cyan-500/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform">
                <Globe size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Local Expertise</h3>
              <p className="text-gray-400 leading-relaxed">Strong local knowledge combined with international service standards.</p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white/10 hover:border-blue-400/50 transition-all duration-300 group md:col-span-2 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="bg-purple-500/20 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-purple-400 group-hover:scale-110 transition-transform">
                <Clock size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-white">24/7 Support</h3>
                <p className="text-blue-100 leading-relaxed">We are with you every step of the way, providing round-the-clock customer support throughout your journey to ensure peace of mind.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRAVEL WITH CONFIDENCE CTA --- */}
      <section className="py-20 container mx-auto px-6">
        <div className="bg-gray-100 rounded-[3rem] p-10 md:p-20 relative overflow-hidden">
          {/* Decorative BG */}
          <div className="absolute top-0 right-0 w-full h-full bg-grid-slate-200/[0.2] opacity-50" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-2/3">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
                Travel with <span className="text-blue-600">Confidence</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl">
                Whether you’re planning a relaxing holiday, a honeymoon, an adventure tour, or a cultural journey, Ceyloria is your reliable travel partner from start to finish.
              </p>

              <Link to="/contact">
                <button className="relative overflow-hidden group bg-blue-600 text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl shadow-blue-600/30 transition-all hover:shadow-blue-600/50 hover:-translate-y-1">
                  <span className="relative z-10 flex items-center gap-3">
                    Contact Us Today
                    <ChevronRight size={20} />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </button>
              </Link>
            </div>

            <div className="lg:w-1/3 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-[2.5rem] rotate-6 opacity-20 transform scale-105"></div>
                <img
                  src="sltrain.png"
                  alt="Sri Lankan Train"
                  className="rounded-[2.5rem] shadow-2xl relative z-10 rotate-3 hover:rotate-0 transition-transform duration-500 w-72 h-72 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;