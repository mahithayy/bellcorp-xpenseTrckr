import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React,{ useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Explorer from "./pages/Explorer";
import Navbar from "./components/Navbar";
function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/explorer"
          element={
            <ProtectedRoute>
              <Explorer />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
