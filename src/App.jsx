import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./Pages/Homepage";
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
import PackagesPage from "./Pages/customer/PackagesPage";
import About from "./Pages/about";
import Loader from "./components/loader";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">

      {/* Navbar only after loader */}
      {!loading && <Navbar />}

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
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/about" element={<About />} />
      </Routes>

      {/* Footer only after loader */}
      {!loading && <Footer />}

    </div>
  );
}
