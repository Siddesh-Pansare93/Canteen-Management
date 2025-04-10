import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUtensils, FaHistory, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../Pages/AuthContext';

const MobileNav = () => {
  const location = useLocation();
  const { cart } = useCart();
  const { isLoggedIn } = useAuth();
  
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Don't show mobile nav if not logged in
  if (!isLoggedIn) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40">
      <div className="flex justify-around items-center h-16">
        <NavItem to="/" icon={<FaHome />} label="Home" active={location.pathname === '/'} />
        <NavItem to="/menu" icon={<FaUtensils />} label="Menu" active={location.pathname === '/menu'} />
        <NavItem 
          to="/orders" 
          icon={<FaHistory />} 
          label="Orders" 
          active={location.pathname === '/orders'} 
        />
        <NavItem 
          to="/cart" 
          icon={<FaShoppingCart />} 
          label="Cart" 
          active={location.pathname === '/cart'} 
          badge={cartItemsCount > 0 ? cartItemsCount : null}
        />
        <NavItem to="/profile" icon={<FaUser />} label="Profile" active={location.pathname === '/profile'} />
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label, active, badge = null }) => {
  return (
    <Link 
      to={to} 
      className={`flex flex-col items-center justify-center w-full h-full ${active ? 'text-[#fec723]' : 'text-gray-500'}`}
    >
      <div className="relative">
        {icon}
        {badge && (
          <span className="absolute -top-2 -right-2 bg-[#fec723] text-[#2c2c5b] text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
            {badge}
          </span>
        )}
      </div>
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

export default MobileNav;
