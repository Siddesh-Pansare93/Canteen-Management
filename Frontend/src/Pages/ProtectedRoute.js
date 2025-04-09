import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Pages/AuthContext"; // Adjust import path as needed
import { toast } from "react-toastify";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isLoggedIn, isAdmin } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.warn("Please log in to continue!");
    } else if (adminOnly && !isAdmin) {
      toast.error("Access denied: Admins only!");
    }
  }, [isLoggedIn, isAdmin, adminOnly]);

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
