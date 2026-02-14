import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { logout, token } = useContext(AuthContext);

  return (
  <nav className="bg-slate-900 px-6 py-4 text-white flex justify-between items-center shadow-md">
    {/* Left side: Logo/Links */}
    <div className="flex gap-6 items-center">
      <Link to="/" className="text-xl font-bold tracking-tight text-indigo-400 hover:text-indigo-300">
        XPense<span className="text-white">Trckr</span>
      </Link>

      <div className="flex gap-4 text-sm font-medium text-slate-300">
        <Link to="/" className="hover:text-white transition">Dashboard</Link>
        <Link to="/explorer" className="hover:text-white transition">Explorer</Link>
      </div>

      {token && (
        <button
          onClick={logout}
          className="bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500 hover:text-white px-4 py-1.5 rounded-full text-xs transition-all"
        >
          Logout
        </button>
      )}
    </div>

    {/* Right side: Credits */}
    <div className="text-xs text-slate-500 hidden sm:block">
      Bellcorp assignment by Mahitha
    </div>
  </nav>
);
}
