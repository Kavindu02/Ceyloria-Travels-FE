import { NavLink, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Icons
import { RiAdminFill } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { FaUsers, FaHotel, FaMapMarkedAlt } from "react-icons/fa"; // Travel icons
import { IoMdHome } from "react-icons/io";

// --- PAGES IMPORT ---
import AdminAdminPage from "./admin/adminAdminPage"; 

// --- PLACEHOLDER COMPONENTS (Replace these with your real files later) ---
const UsersPage = () => <div className="p-10 text-slate-100"><h2>User Management Page (Coming Soon)</h2></div>;
const PackagesPage = () => <div className="p-10 text-slate-100"><h2>Travel Packages Management (Coming Soon)</h2></div>;
const HotelsPage = () => <div className="p-10 text-slate-100"><h2>Hotels Management (Coming Soon)</h2></div>;

// --- COMPONENT: Sidebar Link ---
// FIX: Added 'icon: Icon' to props so the Icon component renders correctly
function SidebarLink({ to, icon: Icon, label, onClick }) {
  return (
    <NavLink
      to={to}
      end={to === "/admin"} // Only exact match for dashboard
      onClick={onClick}
      className={({ isActive }) =>
        [
          "group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-all",
          "text-slate-400 hover:text-white",
          "hover:bg-teal-500/10", // Travel Theme: Teal hover
          isActive ? "text-white bg-gradient-to-r from-teal-600/20 to-blue-600/20 shadow-inner border border-teal-500/20" : "",
        ].join(" ")
      }
    >
      <Icon className="text-xl shrink-0 group-hover:text-teal-400" />
      <span className="truncate">{label}</span>
    </NavLink>
  );
}

// --- COMPONENT: Dashboard Hero (Home) ---
function DashboardHero() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-teal-500 via-cyan-600 to-blue-600 p-[1px] shadow-lg">
        <div className="rounded-2xl bg-slate-900/90 p-8 backdrop-blur text-white">
          <h1 className="text-3xl font-bold">Travel Admin Dashboard</h1>
          <p className="text-teal-100 mt-2 text-lg">
            Manage your destinations, bookings, and users from one place.
          </p>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Manage Admins", to: "/admin/admins", icon: RiAdminFill, color: "text-purple-400" },
          { label: "Users", to: "/admin/users", icon: FaUsers, color: "text-blue-400" },
          { label: "Packages", to: "/admin/packages", icon: FaMapMarkedAlt, color: "text-teal-400" },
          { label: "Hotels", to: "/admin/hotels", icon: FaHotel, color: "text-orange-400" },
        ].map((c) => (
          <NavLink
            key={c.label}
            to={c.to}
            className="group relative overflow-hidden rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-white/5 p-6 flex items-center gap-4 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-900/20"
          >
            <div className={`p-3 rounded-full bg-slate-900/50 ${c.color} text-2xl group-hover:scale-110 transition-transform`}>
              <c.icon />
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Go to</p>
              <p className="font-bold text-slate-100 text-lg">{c.label}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function AdminPage() {
  // FIX: Uncommented this line. 'status' must be a state variable for useEffect to work correctly.
  const [status, setStatus] = useState("admin"); // Options: "loading" | "admin" | "not-admin"
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  /* // Uncomment this block to enable Real Authentication later
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setStatus("not-admin");
      return;
    }
    // Mock axios call - replace with real one
    // axios.get(...) .then(...)
  }, []);
  */

  useEffect(() => {
    if (status === "not-admin") {
      toast.error("Access Denied: Admins Only");
      navigate("/"); // Redirect to home if not admin
    }
  }, [status, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (status === "loading") return <div className="h-screen w-full flex items-center justify-center bg-slate-950 text-teal-500">Loading...</div>;
  if (status === "not-admin") return null;

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-200 font-sans selection:bg-teal-500/30">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-900/80 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"
            >
              {sidebarOpen ? <HiX className="text-xl" /> : <HiMenu className="text-xl" />}
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                Travel<span className="text-white">Admin</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="hidden sm:flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium hover:bg-slate-700 transition-colors"
            >
              <IoMdHome className="text-teal-400" /> Visit Site
            </button>
            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500 hover:text-white transition-colors border border-red-500/20"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-30 w-64 transform bg-slate-900 border-r border-white/5 transition-transform duration-300 ease-in-out md:static md:translate-x-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="flex h-full flex-col p-4">
            <div className="mb-6 flex items-center gap-3 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-4 border border-white/5 shadow-inner">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500/20 text-teal-400">
                <RiAdminFill className="text-xl" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase">Logged in as</p>
                <p className="font-bold text-white">Administrator</p>
              </div>
            </div>

            <nav className="space-y-1 flex-1">
              <SidebarLink to="/admin" icon={MdDashboard} label="Dashboard" onClick={() => setSidebarOpen(false)} />
              
              <div className="my-4 border-t border-white/5 mx-2"></div>
              <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Management</p>
              
              <SidebarLink to="/admin/admins" icon={RiAdminFill} label="Admins" onClick={() => setSidebarOpen(false)} />
              <SidebarLink to="/admin/users" icon={FaUsers} label="Users" onClick={() => setSidebarOpen(false)} />
              <SidebarLink to="/admin/packages" icon={FaMapMarkedAlt} label="Packages" onClick={() => setSidebarOpen(false)} />
              <SidebarLink to="/admin/hotels" icon={FaHotel} label="Hotels" onClick={() => setSidebarOpen(false)} />
            </nav>

            <div className="mt-auto pt-4 text-center">
               <p className="text-xs text-slate-600">Travel Panel v1.0</p>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-20 bg-slate-950/80 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)] overflow-x-hidden">
            <Routes>
              {/* Dashboard */}
              <Route index element={<DashboardHero />} />
              
              {/* 1. Admins Section */}
              <Route path="admins/*" element={<AdminAdminPage />} />
              
              {/* 2. Users Section */}
              <Route path="users/*" element={<UsersPage />} />

              {/* 3. Packages Section */}
              <Route path="packages/*" element={<PackagesPage />} />

              {/* 4. Hotels Section */}
              <Route path="hotels/*" element={<HotelsPage />} />
            </Routes>
        </main>
      </div>
    </div>
  );
}