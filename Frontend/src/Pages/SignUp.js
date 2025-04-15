// src/Pages/Signup.js
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import { toast } from "react-toastify";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("student"); // Default to student
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    let firebaseUser = null;
    
    try {
      // 1. Register with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      firebaseUser = userCredential.user;
      
      try {
        // 2. Register with our backend
        await registerUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: name || email.split('@')[0], // Use name or extract from email
          userType: userType // Include user type
        });
        
        toast.success("Registration successful!");
        navigate("/");
      } catch (dbError) {
        // If database registration fails, delete the Firebase user
        console.error("Database registration error:", dbError);
        await firebaseUser.delete();
        toast.error("Registration failed: " + (dbError.message || "Could not create account in database"));
      }
    } catch (firebaseError) {
      console.error("Firebase signup error:", firebaseError);
      toast.error(firebaseError.message || "Failed to register");
    } finally {
      setLoading(false);
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
            type="text"
            placeholder="Full Name (optional)"
            className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#fec723]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          
          {/* User Type Selection */}
          <div className="w-full">
            <label className="block text-gray-600 mb-1">I am a:</label>
            <div className="flex gap-4">
              <label className="flex items-center p-3 border rounded-lg flex-1 cursor-pointer transition-all hover:bg-gray-50">
                <input
                  type="radio"
                  name="userType"
                  value="student"
                  checked={userType === "student"}
                  onChange={() => setUserType("student")}
                  className="mr-2"
                />
                <span>Student</span>
              </label>
              <label className="flex items-center p-3 border rounded-lg flex-1 cursor-pointer transition-all hover:bg-gray-50">
                <input
                  type="radio"
                  name="userType"
                  value="teacher"
                  checked={userType === "teacher"}
                  onChange={() => setUserType("teacher")}
                  className="mr-2"
                />
                <span>Teacher</span>
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-[#fec723] text-black font-semibold py-3 rounded hover:bg-yellow-400 transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
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
