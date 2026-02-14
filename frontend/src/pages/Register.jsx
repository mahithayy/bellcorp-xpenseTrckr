import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Registered successfully");
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        className="border p-2 w-full mb-4"
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button className="bg-green-500 text-white px-4 py-2 w-full" onClick={submit}>
        Register
      </button>


      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 underline">
          Login here
        </Link>
      </p>
    </div>
  );
}
