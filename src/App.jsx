import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

import Home from "./Pages/Homepage";
import Blog from "./Pages/blog";
import BlogDetail from "./Pages/blogDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnuradhapuraPage from "./Pages/gallerysection/anuradhapura";
import AdminPage from "./Pages/adminpage";
import ColomboPage from "./Pages/gallerysection/colombo";
import EllaPage from "./Pages/gallerysection/ella";
import GallePage from "./Pages/gallerysection/galle";
import SigiriyaPage from "./Pages/gallerysection/sigiriyafortress";
import LoginPage from "./Pages/loginPage";
import RegisterPage from "./Pages/registerPage";
import Contact from "./Pages/Contact";
import PlanMyTrip from "./Pages/PlanMyTrip";
import PackagesPage from "./Pages/customer/PackagesPage";
import PackageOverviewPage from "./Pages/customer/packageOverviewPage";
import AccommodationsPage from "./Pages/customer/accommodationsPage";
import AccommodationOverviewPage from "./Pages/customer/accommodationsOverviewPage";
import About from "./Pages/about";
import Destinations from "./Pages/Destinations";
import Loader from "./components/loader";
import ScrollToTop from "./components/ScrollToTop";
import SearchResults from "./Pages/SearchResults";
import LanguageSwitcher from "./components/LanguageSwitcher";
import WhatsAppButton from "./components/WhatsAppButton";

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Check if current route is admin panel
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col">

      {/* Toast Notifications */}
      <Toaster />

      {/* Navbar only after loader and not in admin panel */}
      {!loading && !isAdminRoute && <Navbar />}

      {/* Language Switcher */}
      {!loading && !isAdminRoute && <LanguageSwitcher />}

      {/* WhatsApp Button */}
      {!loading && !isAdminRoute && <WhatsAppButton />}

      {/* Loader */}
      {loading && <Loader />}

      {/* Scroll to top instantly on route change */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anuradhapura" element={<AnuradhapuraPage />} />
        <Route path="/colombo" element={<ColomboPage />} />
        <Route path="/ella" element={<EllaPage />} />
        <Route path="/galle" element={<GallePage />} />
        <Route path="/sigiriyafortress" element={<SigiriyaPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/plan-my-trip" element={<PlanMyTrip />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/package-overview/:id" element={<PackageOverviewPage />} />
        <Route path="/accommodations" element={<AccommodationsPage />} />
        <Route path="/accommodation-overview/:id" element={<AccommodationOverviewPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:category" element={<Destinations />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>

      {/* Footer only after loader and not in admin panel */}
      {!loading && !isAdminRoute && <Footer />}

    </div>
  );
}