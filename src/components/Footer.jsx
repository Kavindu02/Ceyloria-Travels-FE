import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
  Send
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative mt-0 w-full bg-cover bg-center bg-fixed text-gray-200"
      style={{
        backgroundImage: "url('/gallery/ninearch.png')",
      }}
    >
      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10 mx-auto w-11/12 max-w-7xl pt-12 pb-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 items-start">

          {/* Column 1: Brand & Contact */}
          <div className="space-y-6 px-3">
            <Link to="/" className="flex flex-col group">
              <div className="flex items-center">
                <span className="text-4xl font-serif font-bold tracking-tight" style={{ fontFamily: "'Alice', serif" }}>
                  <span style={{ color: "#FF8C00" }}>Cey</span>
                  <span style={{ color: "#001C57" }}>loria</span>
                </span>
              </div>
              <span className="text-[12px] font-medium tracking-[0.25em] text-gray-400 uppercase -mt-1 group-hover:text-blue-400 transition-colors">
                Your Travel Partner
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-gray-400">
              Discover the beauty of Sri Lanka with curated tours and unforgettable experiences.
            </p>

            <div className="space-y-4 pt-2">
              <ContactItem icon={MapPin} text="Sri Mahinda Dharma MW, Colombo 09." />
              <ContactItem icon={Phone} text="+94 742216579" />
              <ContactItem icon={Mail} text="sdksolutions01@gmail.com" />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="px-3 flex flex-col items-start md:items-center justify-center">
            <h3 className="mb-6 text-lg font-semibold text-white text-left md:text-center">Explore</h3>
            <ul className="space-y-3 text-left md:text-center">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/destinations" label="Destinations" />
              <FooterLink to="/activities" label="Activities" />
              <FooterLink to="/packages" label="Packages" />
              <FooterLink to="/accommodations" label="Accommodations" />
              <FooterLink to="/blogs" label="Blogs" />
              <FooterLink to="/about" label="About Us" />
            </ul>
          </div>


          {/* Column 4: Newsletter & Social */}
          <div className="space-y-6 px-3">
            <div className="space-y-6 px-3">
              <p className="mb-4 text-sm text-gray-400">Subscribe for latest tour updates.</p>
              <div className="flex w-full items-center rounded-lg bg-white/10 p-1 backdrop-blur-md ring-1 ring-white/20 focus-within:ring-blue-400 transition-all">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-gray-400 outline-none"
                />
                <button className="rounded-md bg-blue-600 p-2 text-white hover:bg-blue-500 transition-colors">
                  <Send size={18} />
                </button>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Follow Us</h3>
              <div className="flex gap-4">
                <SocialIcon Icon={Facebook} href="https://www.facebook.com/profile.php?id=61583355311542" />
                <SocialIcon Icon={Twitter} href="#" />
                <SocialIcon Icon={Instagram} href="#" />
                <SocialIcon Icon={Youtube} href="#" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 border-t border-white/10 pt-8 
flex flex-col md:flex-row 
items-center justify-center 
gap-4 text-sm text-gray-500 text-center">

          <p>© {currentYear} <b>Ceyloria.</b> All rights reserved.</p>

        </div>

      </div>
    </footer>
  );
}

/* --- Helper Components for Cleaner Code --- */

function ContactItem({ icon: Icon, text }) {
  return (
    <div className="flex items-start gap-3 group cursor-default">
      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
        <Icon size={16} />
      </div>
      <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{text}</p>
    </div>
  );
}

function FooterLink({ to, label }) {
  return (
    <li>
      <Link
        to={to}
        className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
      >
        <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-blue-400" />
        <span className="group-hover:translate-x-1 transition-transform duration-300">{label}</span>
      </Link>
    </li>
  );
}

function SocialIcon({ Icon, href }) {
  return (
    <a
      href={href}
      className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon size={20} />
    </a>
  );
}