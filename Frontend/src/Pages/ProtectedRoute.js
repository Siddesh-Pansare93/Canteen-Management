import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Pages/AuthContext";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isLoggedIn, isAdmin, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn && !loading) {
      toast.warn(`Please log in to access ${location.pathname}`);
    } else if (adminOnly && !isAdmin && !loading) {
      toast.error("Access denied: Admins only!");
    }
  }, [isLoggedIn, isAdmin, adminOnly, loading, location.pathname]);

  // Show loading state while auth state is being determined
  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>;
  }

  if (!isLoggedIn) {
    // Save the location they tried to access for redirecting after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
