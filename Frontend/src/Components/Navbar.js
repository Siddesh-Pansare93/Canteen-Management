import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaUser, FaShoppingCart, FaWallet, FaSignOutAlt,
  FaSignInAlt, FaUserCircle, FaHistory, FaEdit, FaBars, FaTimes
} from 'react-icons/fa';
import { useAuth } from '../Pages/AuthContext'; 
import { auth } from '../firebase'; 
import { signOut } from 'firebase/auth';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileDropdownRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn, isAdmin, logout } = useAuth();
  const { cart } = useCart(); 
  
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (mobileMenuOpen && event.target.closest('.mobile-menu') === null && 
          event.target.closest('.mobile-menu-button') === null) {
        setMobileMenuOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      logout();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#2c2c5b] shadow-lg py-2' : 'bg-gradient-to-r from-[#2c2c5b] to-[#2c2c5b]/90 py-2'
    }`}>
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="h-10 w-10 mr-3 bg-[#fec723] rounded-full flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <span className="text-[#2c2c5b] font-bold text-xl">A</span>
              </div>
              <span className="text-[#fec723] font-bold text-xl relative overflow-hidden">
                Agnel Eats
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#fec723] group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
          </div>

          {/* Desktop Links - Hidden on mobile */}
          {isLoggedIn && (
            <div className="hidden md:flex ml-10 items-center space-x-8">
              <NavLink to="/" label="Home" currentPath={location.pathname} />
              <NavLink to="/menu" label="Menu" currentPath={location.pathname} />
              <NavLink to="/orders" label="My Orders" currentPath={location.pathname} />
              <NavLink to="/seat" label="Seats" currentPath={location.pathname} />
              {isAdmin && <NavLink to="/admin" label="Admin" currentPath={location.pathname} />}
              {isAdmin && <NavLink to="/admin/menu" label="Update menu" currentPath={location.pathname} />}
            </div>
          )}

          {/* Right icons */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Cart - Hidden on mobile */}
                <Link to="/cart" className="text-[#a3a3b2] hover:text-[#fec723] p-2 rounded-full relative group transition-transform duration-200 hover:scale-110 hidden md:block">
                  <FaShoppingCart className="text-xl" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#fec723] text-[#2c2c5b] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>

                {/* Wallet - Hidden on mobile */}
                <Link to="/wallet" className="text-[#a3a3b2] hover:text-[#fec723] p-2 rounded-full transition-transform duration-200 hover:scale-110 hidden md:block">
                  <FaWallet className="text-xl" />
                </Link>

                {/* Profile Dropdown - Hidden on mobile */}
                <div className="relative hidden md:block" ref={profileDropdownRef}>
                  <button 
                    onClick={toggleProfileDropdown}
                    className="flex items-center text-[#a3a3b2] hover:text-[#fec723] p-2 rounded-full transition-transform duration-200 hover:scale-110 focus:outline-none"
                  >
                    <div className="h-8 w-8 rounded-full bg-[#fec723] flex items-center justify-center text-[#2c2c5b] font-bold">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  <div 
                    className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 transition-all duration-300 origin-top-right ${
                      showProfileDropdown 
                        ? 'transform opacity-100 scale-100' 
                        : 'transform opacity-0 scale-95 pointer-events-none'
                    }`}
                  >
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                      <p className="font-medium">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500">{user?.email || ''}</p>
                    </div>
                    <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FaUserCircle className="mr-2" /> My Profile
                    </Link>
                    <Link to="/orders" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FaHistory className="mr-2" /> Order History
                    </Link>
                    <Link to="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <FaEdit className="mr-2" /> Edit Profile
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Login/Register links - Hidden on mobile */}
                <div className="hidden md:flex items-center">
                  <Link to="/login" className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#fec723]/20 rounded-md transition-all">
                    <FaSignInAlt className="mr-2" /> Login
                  </Link>
                  <Link to="/signup" className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#fec723]/20 rounded-md transition-all">
                    <FaUserCircle className="mr-2" /> Register
                  </Link>
                </div>
              </>
            )}
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden mobile-menu-button p-2 rounded-md text-[#fec723] hover:bg-[#2c2c5b]/50 focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu, show/hide based on menu state */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} mobile-menu`}>
          <div className="px-2 pt-2 pb-4 space-y-1 bg-[#1e1e4b] mt-2 rounded-lg shadow-lg">
            {isLoggedIn ? (
              <>
                {/* User info */}
                <div className="px-4 py-3 border-b border-[#3d3d7a]">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-[#fec723] flex items-center justify-center text-[#2c2c5b] font-bold mr-3">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <p className="text-white font-medium">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-400">{user?.email || ''}</p>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-white">
                    Wallet: <span className="font-bold text-[#fec723]">₹{user?.walletBalance || 0}</span>
                  </div>
                </div>
                
                {/* Mobile navigation links */}
                <MobileNavLink to="/" icon={<FaUser className="mr-3" />} label="Home" currentPath={location.pathname} />
                <MobileNavLink to="/menu" icon={<FaUser className="mr-3" />} label="Menu" currentPath={location.pathname} />
                <MobileNavLink to="/orders" icon={<FaHistory className="mr-3" />} label="My Orders" currentPath={location.pathname} />
                <MobileNavLink to="/seat" icon={<FaUser className="mr-3" />} label="Seats" currentPath={location.pathname} />
                <MobileNavLink to="/cart" icon={<FaShoppingCart className="mr-3" />} label={`Cart (${cartItemsCount})`} currentPath={location.pathname} />
                <MobileNavLink to="/wallet" icon={<FaWallet className="mr-3" />} label="Wallet" currentPath={location.pathname} />
                {isAdmin && <MobileNavLink to="/admin" icon={<FaUser className="mr-3" />} label="Admin" currentPath={location.pathname} />}
                
                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center text-left px-4 py-2 text-white hover:bg-[#3d3d7a] rounded-md transition"
                >
                  <FaSignOutAlt className="mr-3" /> Logout
                </button>
              </>
            ) : (
              <>
                {/* Login/Register links for mobile */}
                <Link to="/login" className="flex items-center px-4 py-2 text-white hover:bg-[#3d3d7a] rounded-md transition">
                  <FaSignInAlt className="mr-3" /> Login
                </Link>
                <Link to="/signup" className="flex items-center px-4 py-2 text-white hover:bg-[#3d3d7a] rounded-md transition">
                  <FaUserCircle className="mr-3" /> Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Desktop nav link component
const NavLink = ({ to, label, currentPath }) => {
  const isActive = currentPath === to;
  return (
    <Link 
      to={to} 
      className={`relative px-4 py-2 text-md font-medium ${
        isActive ? 'text-[#fec723]' : 'text-[#a3a3b2] hover:text-[#fec723]'
      } group`}
    >
      {label}
      <span className={`absolute bottom-0 left-0 h-0.5 bg-[#fec723] transition-all duration-300 ${
        isActive ? 'w-full' : 'w-0 group-hover:w-full'
      }`}></span>
    </Link>
  );
};

// Mobile nav link component - NEW
const MobileNavLink = ({ to, icon, label, currentPath }) => {
  const isActive = currentPath === to;
  return (
    <Link 
      to={to} 
      className={`flex items-center px-4 py-2 rounded-md transition ${
        isActive 
          ? 'bg-[#fec723] text-[#2c2c5b] font-medium' 
          : 'text-white hover:bg-[#3d3d7a]'
      }`}
    >
      {icon} {label}
    </Link>
  );
};

export default Navbar;