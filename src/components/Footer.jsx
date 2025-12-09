import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="relative text-white mt-24 flex flex-col items-center w-full bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('/gallery/ninearch.png')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col lg:flex-row w-11/12 lg:w-10/12 py-12 justify-between gap-12">
        {/* Column 1: Logo + Info */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Logo" className="h-12 w-auto" />
            <p className="text-lg font-medium">SDK Travel</p>
          </div>

          {/* Address */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
              <img src="/src/assets/contact/icon_1.svg" alt="Address Icon" className="w-3 h-3" />
            </div>
            <p>123 Anywhere St., Any City</p>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
              <img src="/src/assets/contact/icon_2.svg" alt="Phone Icon" className="w-3 h-3" />
            </div>
            <p>123-456-7890</p>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
              <img src="/src/assets/contact/icon_2.svg" alt="Email Icon" className="w-3 h-3" />
            </div>
            <p>hellocallcenter@gmail.com</p>
          </div>
        </div>

        {/* Column 2: Pages */}
        <div className="flex-1 flex flex-col gap-2">
          <h3 className="font-semibold text-lg mb-2">Pages</h3>
          <Link to="/">Home</Link>
          <Link to="/tc">Trip Catalogue</Link>
          <Link to="/countries">Countries</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
        </div>

        {/* Column 3: Resources */}
        <div className="flex-1 flex flex-col gap-2">
          <h3 className="font-semibold text-lg mb-2">Resources</h3>
          <Link to="#">Testimonials</Link>
          <Link to="#">Blog</Link>
          <Link to="#">Contact Us</Link>
          <Link to="#">FAQ</Link>
        </div>

        {/* Column 4: Policies + Social */}
        <div className="flex-1 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-lg">Policies</h3>
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms & Conditions</Link>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-lg">Follow Us</h3>
            <div className="flex gap-3">
              <a href="#"><svg className="w-5 h-5" fill="currentColor"></svg></a>
              <a href="#"><svg className="w-5 h-5" fill="currentColor"></svg></a>
              <a href="#"><svg className="w-5 h-5" fill="currentColor"></svg></a>
              <a href="#"><svg className="w-5 h-5" fill="currentColor"></svg></a>
              <a href="#"><svg className="w-5 h-5" fill="currentColor"></svg></a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="relative z-10 border-t border-white/30 w-11/12 lg:w-10/12 py-4 text-center text-white/70">
        © 2025 SDK travels. All rights reserved.
      </div>
    </footer>
  );
}
