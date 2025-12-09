import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Homepage"   
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import AnuradhapuraPage from "./Pages/gallerysection/anuradhapura"
export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
       <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anuradhapura" element={<AnuradhapuraPage />} />

      </Routes>
      <Footer/>
    </div>
  )
}
