import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 🔥 import navigate hook
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { motion } from "framer-motion";
import LoginBanner from "../Components/LoginBanner";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // 🔥 initialize navigate

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login successful!");
            navigate("/"); // 🔥 redirect to homepage
        } catch (err) {
            alert(err.message);
        }
    };

    return (
<div className="min-h-screen bg-gradient-to-br from-[#2c2c5b] to-[#3f3f73] flex flex-col items-center justify-center p-0 m-0 relative overflow-hidden">

            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-xl shadow-2xl w-[90%] max-w-[600px] p-10 z-30 mt-4"
            >
                <h2 className="text-xl font-semibold text-center text-[#2c2c5b] mb-4">
                    USER LOGIN
                </h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-[#2c2c5b] mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 rounded-full bg-[#a3a3b2]/20 placeholder-white text-[#2c2c5b] outline-none"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#2c2c5b] mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 rounded-full bg-[#a3a3b2]/20 placeholder-white text-[#2c2c5b] outline-none"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-between items-center text-sm mb-6">
                        <label className="flex items-center text-[#2c2c5b]">
                            <input type="checkbox" className="mr-2" /> Remember me
                        </label>
                        <a href="/forgot-password" className="text-[#2c2c5b] hover:text-[#fec723]">
                            Forgot password?
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#2c2c5b] text-white font-semibold py-2 rounded-full hover:bg-[#fec723] hover:text-[#2c2c5b] transition"
                    >
                        LOGIN
                    </button>
                </form>
                <p className="text-center text-[#2c2c5b] mt-4">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-[#fec723] font-semibold">
                        Sign Up
                    </a>
                </p>
            </motion.div>
        </div>
    );
    
}
