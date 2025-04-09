// src/Pages/Signup.js
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#2c2c5b] flex items-center justify-center px-4">
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-[#2c2c5b] mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#fec723]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#fec723]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#fec723] text-black font-semibold py-3 rounded hover:bg-yellow-400 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-[#a3a3b2]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#fec723] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
