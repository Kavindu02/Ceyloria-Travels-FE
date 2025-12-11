import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { RiAdminFill, RiLockPasswordLine } from "react-icons/ri";
import { IoMdArrowBack } from "react-icons/io";

export default function AddAdminPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent page reload

    if (!email) {
      toast.error("Email is required");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in");
      window.location.href = "/login";
      return;
    }

    try {
      setIsLoading(true);
      
      // Based on your controller: createAdmin only uses req.body.email
      // It sets defaults: firstName="Admin", lastName="User", password="admin123"
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users/create-admin",
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Admin created successfully!");
      navigate("/admin/admins"); // Redirect back to the list
    } catch (err) {
      console.error("Error adding admin:", err);
      // specific error handling if backend sends error message
      const message = err.response?.data?.message || "Failed to add admin";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-start min-h-[80vh] pt-10 px-4">
      <div className="w-full max-w-lg bg-slate-900/50 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-xl bg-teal-500/20 text-teal-400">
            <RiAdminFill className="text-2xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">New Administrator</h2>
            <p className="text-slate-400 text-sm">Grant system access to a new user.</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 ml-1">
              Admin Email Address <span className="text-teal-400">*</span>
            </label>
            <input
              type="email"
              placeholder="admin@travelsite.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 rounded-xl bg-slate-800 border border-white/10 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
              required
            />
          </div>

          {/* Info Box regarding your Backend Logic */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-200 text-sm">
            <RiLockPasswordLine className="text-lg shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Default Credentials</p>
              <p className="text-blue-200/70">
                The system will automatically set the password to <span className="font-mono bg-blue-500/20 px-1 rounded">admin123</span> and name to "Admin User". Please ask the new admin to change this after their first login.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
            <Link
              to="/admin/admins"
              className="flex-1 h-12 flex justify-center items-center rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 hover:text-white transition-colors font-medium"
            >
              Cancel
            </Link>
            
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 h-12 flex justify-center items-center rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white font-bold shadow-lg shadow-teal-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Create Admin"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}