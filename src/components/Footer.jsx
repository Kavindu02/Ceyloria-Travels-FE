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
      className="relative mt-24 w-full bg-cover bg-center bg-fixed text-gray-200"
      style={{
        backgroundImage: "url('/gallery/ninearch.png')",
      }}
    >
      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10 mx-auto w-11/12 max-w-7xl pt-16 pb-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Brand & Contact */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              {/* Added a white glow effect to logo for contrast */}
              <div className="rounded-lg bg-white/10 p-2 backdrop-blur-md">
                <img src="/logo.jpg" alt="SDK Travel Logo" className="h-10 w-auto rounded-md" />
              </div>
              <span className="text-2xl font-bold tracking-wide text-white">SDK Travel</span>
            </div>
            
            <p className="text-sm leading-relaxed text-gray-400">
              Discover the beauty of Sri Lanka with curated tours and unforgettable experiences.
            </p>

            <div className="space-y-4 pt-2">
              <ContactItem icon={MapPin} text="123 Anywhere St., Any City" />
              <ContactItem icon={Phone} text="123-456-7890" />
              <ContactItem icon={Mail} text="hellocallcenter@gmail.com" />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Explore</h3>
            <ul className="space-y-3">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/tc" label="Trip Catalogue" />
              <FooterLink to="/countries" label="Destinations" />
              <FooterLink to="/about" label="About Us" />
              <FooterLink to="/gallery" label="Gallery" />
            </ul>
          </div>

          {/* Column 3: Resources & Policy */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Support</h3>
            <ul className="space-y-3">
              <FooterLink to="/contact" label="Contact Us" />
              <FooterLink to="/faq" label="FAQ" />
              <FooterLink to="/privacy" label="Privacy Policy" />
              <FooterLink to="/terms" label="Terms & Conditions" />
              <FooterLink to="/blog" label="Travel Blog" />
            </ul>
          </div>

          {/* Column 4: Newsletter & Social */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Newsletter</h3>
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
                <SocialIcon Icon={Facebook} href="#" />
                <SocialIcon Icon={Twitter} href="#" />
                <SocialIcon Icon={Instagram} href="#" />
                <SocialIcon Icon={Youtube} href="#" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col items-center justify-between gap-4 md:flex-row text-sm text-gray-500">
          <p>© {currentYear} SDK Travels. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
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