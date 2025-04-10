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
import Settings from "./Pages/Settings"; // Add this import
import Home from "./Pages/Home";
import Orders from "./Pages/Orders"; // Add this import

// Component imports
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Pages/ProtectedRoute";
import { AuthProvider } from "./Pages/AuthContext";
import Footer from "./Components/Footer";
import Menu from "./Pages/Menu";
import Seats from "./Pages/Seats";
import CartPage from "./Pages/CartPage";
import AdminDashboard from "./Pages/AdminDashboard";
import Wallet from "./Pages/Wallet";
import { CartProvider } from "./context/CartContext"; // Import CartProvider

function App() {
  return (
    <AuthProvider>
      <CartProvider> {/* Wrap the Router with CartProvider */}
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
              <Route path="/wallet" element={<Wallet />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              
              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly={false}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer/>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;