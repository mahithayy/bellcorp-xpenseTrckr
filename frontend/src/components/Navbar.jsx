import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { logout, token } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">

      {/* Left side: Links */}
      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:underline">Dashboard</Link>
        <Link to="/explorer" className="hover:underline">Explorer</Link>

        {token && (
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        )}
      </div>

      {/* Right side: Assignment text */}
      <div className="text-sm text-gray-300">
        Bellcorp assignment by Mahitha
      </div>

    </nav>
  );
}
