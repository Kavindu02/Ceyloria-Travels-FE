import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Homepage"   
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import AnuradhapuraPage from "./Pages/gallerysection/anuradhapura"
import AdminPage from "./Pages/adminpage"
import ColomboPage from "./Pages/gallerysection/colombo"
import EllaPage from "./Pages/gallerysection/ella"
import GallePage from "./Pages/gallerysection/galle"
import SigiriyaPage from "./Pages/gallerysection/sigiriyafortress"
import LoginPage from "./Pages/loginPage"
import RegisterPage from "./Pages/registerPage"

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
       <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anuradhapura" element={<AnuradhapuraPage />} />
        <Route path="/colombo" element={<ColomboPage />} />
        <Route path="/ella" element={<EllaPage />} />
        <Route path="/galle" element={<GallePage />} />
        <Route path="/sigiriyafortress" element={<SigiriyaPage/>} /> 
        <Route path="/admin/*" element={<AdminPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>


      </Routes>
      <Footer/>
    </div>
  )
}
