import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

// Icons
import { RiAdminFill } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { FaUsers, FaHotel, FaMapMarkedAlt } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";

// Pages
import AdminAdminPage from "./admin/adminAdminPage";

// Placeholder pages
const UsersPage = () => <div className="p-10 text-white">Users Page (Coming Soon)</div>;
const PackagesPage = () => <div className="p-10 text-white">Packages Page (Coming Soon)</div>;
const HotelsPage = () => <div className="p-10 text-white">Hotels Page (Coming Soon)</div>;

// SidebarLink component
function SidebarLink({ to, icon: IconComp, label, onClick }) {
  return (
    <NavLink
      to={to}
      end
      onClick={onClick}
      className={({ isActive }) =>
        [
          "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all",
          "text-slate-400 hover:text-white hover:bg-teal-500/10",
          isActive ? "text-white bg-teal-600/20 border border-teal-500/20 shadow" : "",
        ].join(" ")
      }
    >
      {IconComp && <IconComp className="text-xl" />}
      <span>{label}</span>
    </NavLink>
  );
}

// Dashboard Hero section
function DashboardHero() {
  const cards = [
    { label: "Manage Admins", to: "/admin/admins", icon: RiAdminFill, color: "text-purple-400" },
    { label: "Users", to: "/admin/users", icon: FaUsers, color: "text-blue-400" },
    { label: "Packages", to: "/admin/packages", icon: FaMapMarkedAlt, color: "text-teal-400" },
    { label: "Hotels", to: "/admin/hotels", icon: FaHotel, color: "text-orange-400" },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-600 p-[1px] shadow-xl">
        <div className="rounded-2xl bg-slate-900/90 p-8 backdrop-blur text-white">
          <h1 className="text-3xl font-bold">Travel Admin Dashboard</h1>
          <p className="text-teal-100 mt-2 text-lg">
            Manage destinations, bookings and users in one dashboard.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((c) => (
          <NavLink
            key={c.label}
            to={c.to}
            className="group rounded-2xl border border-white/5 bg-slate-800/50 hover:bg-slate-800 p-6 flex gap-4 items-center transition transform hover:-translate-y-1 hover:shadow-lg shadow-teal-900/20"
          >
            <div className={`p-3 rounded-full bg-slate-900/50 ${c.color} text-2xl`}>
              <c.icon />
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase">Go to</p>
              <p className="text-lg font-bold text-slate-100">{c.label}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

// Main AdminPage
export default function AdminPage() {
  const [status, setStatus] = useState("loading");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Admin Auth Check (safe)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (!token) {
      // Safe way to avoid cascading render
      setTimeout(() => setStatus("not-admin"), 0);
      return;
    }

    // if the client already knows the role (saved at login), trust it first
    if (storedRole === "admin") {
      setStatus("admin");
      return;
    }

    // fallback to server-side verification
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStatus(res.data.role === "admin" ? "admin" : "not-admin"))
      .catch(() => setStatus("not-admin"));
  }, []);

  // Redirect if not admin
  useEffect(() => {
    if (status === "not-admin") {
      toast.error("You must be an Admin");
      navigate("/");
    }
  }, [status, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out");
    navigate("/");
  };

  if (status === "loading") return <div className="p-10 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-900/70 backdrop-blur">
        <div className="max-w-[1700px] mx-auto h-16 flex items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-lg bg-slate-800"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <HiX /> : <HiMenu />}
            </button>
            <h2 className="text-xl font-bold">Admin Panel</h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="px-3 py-1.5 bg-slate-800 rounded-lg flex items-center gap-2"
            >
              <IoMdHome /> Home
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-600 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="max-w-[1700px] mx-auto grid grid-cols-1 md:grid-cols-[250px_1fr] gap-5 px-6 py-6">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "block" : "hidden"} md:block`}>
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-5 space-y-3">
            <SidebarLink to="/admin" icon={MdDashboard} label="Dashboard" />
            <SidebarLink to="/admin/admins" icon={RiAdminFill} label="Admins" />
            <SidebarLink to="/admin/users" icon={FaUsers} label="Users" />
            <SidebarLink to="/admin/packages" icon={FaMapMarkedAlt} label="Packages" />
            <SidebarLink to="/admin/hotels" icon={FaHotel} label="Hotels" />
            <button
              onClick={handleLogout}
              className={
                "w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-slate-400 hover:text-white hover:bg-red-600/10"
              }
            >
              <FiLogOut className="text-xl" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main>
          <Routes>
            <Route index element={<DashboardHero />} />
            <Route path="admins" element={<AdminAdminPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="packages" element={<PackagesPage />} />
            <Route path="hotels" element={<HotelsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
