import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function login(e) {
    e?.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/users/login`, { email, password })
      .then((res) => {
        // save token if present (support couple of possible response shapes)
        const token = res.data?.token ?? res.data?.data?.token;
        if (token) localStorage.setItem("token", token);

        // determine role from response or from token payload
        let role = res.data?.role ?? res.data?.user?.role ?? res.data?.data?.role;
        if (!role && token) {
          try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            role = payload?.role ?? payload?.user?.role ?? (payload?.isAdmin ? "admin" : undefined);
          } catch (err) {
            // ignore decode errors and fall back to default route
          }
        }

        // persist role for quick client-side checks
        if (role) localStorage.setItem("role", role);
        toast.success("Login Successful");
        navigate(role === "admin" ? "/admin" : "/");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Login Failed");
      });
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-[url(./travelbg.jpg)] bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0 bg-black/50 md:bg-black/30" />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-md rounded-[30px] border border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl text-white p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">Login</h1>
          <form onSubmit={login} className="space-y-4">
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full rounded-md px-3 bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Password</label>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-md px-3 bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-2 h-11 w-full rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 active:scale-[0.99] transition-all duration-300"
            >
              Login
            </button>
          </form>

          <div className="mt-5 space-y-2 text-center text-sm">
            <p>
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-red-300 underline hover:text-red-200">
                Sign Up
              </Link>
            </p>
            <p>
              <Link to="/forget" className="text-red-300 underline hover:text-red-200">
                Forgot Password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
