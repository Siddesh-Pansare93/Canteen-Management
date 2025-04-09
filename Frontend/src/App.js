import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Page imports
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import ChangePassword from "./Pages/ChangePassword";
import Dashboard from "./Pages/Dashboard";

import Home from "./Pages/Home";
//import Menu from "./Pages/Menu"; // Add this
//import Cart from "./Pages/Cart"; // Add this
//import Wallet from "./Pages/Wallet"; // Add this
//import SeatAvailability from "./Pages/SeatAvailability"; // Add this
//import Profile from "./Pages/Profile"; // Add this
//import Orders from "./Pages/Orders"; // Add this
//import Settings from "./Pages/Settings"; // Add this

// Component imports
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Pages/ProtectedRoute"; // Import from file
import { AuthProvider } from "./Pages/AuthContext";
import Footer from "./Components/Footer";
import Menu from "./Pages/Menu";
import Seats from "./Pages/Seats";
import CartPage from "./Pages/CartPage";
import AdminDashboard from "./Pages/AdminDashboard";
import Wallet from "./Pages/Wallet";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Navbar />
        <div className="pt-16"> {/* Add padding to account for fixed navbar */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/seat" element={<Seats />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/wallet" element={<AdminDashboard />} />


            
            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            
            
            
            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer/>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;