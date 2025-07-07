// components/auth/Login/index.tsx
import React, { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Replace this with real auth call
    console.log("Logging in with:", { email, password });

    // Reset fields
    setEmail("");
    setPassword("");
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Admin Login
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-1">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Log In
      </button>
    </form>
  );
};

export default Login;
