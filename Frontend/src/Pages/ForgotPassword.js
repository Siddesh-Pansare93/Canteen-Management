import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2c2c5b] to-[#3f3f73]">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-2xl w-[400px] p-8"
      >
        <h2 className="text-xl font-semibold text-center text-[#2c2c5b] mb-6">
          Forgot Password
        </h2>
        <form onSubmit={handlePasswordReset}>
          <div className="mb-4">
            <label className="block text-[#2c2c5b] mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-full bg-[#a3a3b2]/20 placeholder-white text-[#2c2c5b] outline-none"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#2c2c5b] text-white font-semibold py-2 rounded-full hover:bg-[#fec723] hover:text-[#2c2c5b] transition"
          >
            Send Reset Link
          </button>
        </form>
        {message && (
          <p className="text-center mt-4 text-sm text-[#2c2c5b]">{message}</p>
        )}
        <p className="text-center text-[#2c2c5b] mt-6">
          Back to{" "}
          <a href="/login" className="text-[#fec723] font-semibold">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}
