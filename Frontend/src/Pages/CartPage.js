import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../Pages/AuthContext";
import { toast } from "react-toastify";
import { processWalletPayment } from "../services/api";

const CartPage = () => {
  const { cart, clearCart } = useCart();
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const walletBalance = user?.walletBalance || 0;

  const handleCheckout = async () => {
    if (!user?.uid) {
      toast.error("Please log in to complete your purchase");
      navigate("/login");
      return;
    }

    if (subtotal > walletBalance) {
      toast.error("Insufficient wallet balance! Please add funds to your wallet.");
      navigate("/wallet");
      return;
    }

    setLoading(true);
    try {
      // Process payment through the API
      const response = await processWalletPayment(user.uid, subtotal);
      
      // Update local user state with new wallet balance
      login({
        ...user,
        walletBalance: response.walletBalance
      });
      
      toast.success("Order placed successfully!");
      clearCart();
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Failed to process payment");
    } finally {
      setLoading(false);
    }
  };

  const handleClearCart = () => {
    clearCart();
    toast.info("Cart cleared");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link 
            to="/menu" 
            className="bg-[#2c2c5b] text-white px-4 py-2 rounded hover:bg-[#fec723] hover:text-[#2c2c5b] transition"
          >
            Browse Menu
          </Link>
        </div>
      ) : (
        <div>
          <ul className="mb-4">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b py-2"
              >
                <span>{item.name} (x{item.quantity})</span>
                <span>₹ {(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div className="bg-gray-100 p-4 rounded shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total:</span>
              <span>₹ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-600 mt-2">
              <span>Wallet Balance:</span>
              <span>₹ {walletBalance.toFixed(2)}</span>
            </div>
            <div className="mt-4 flex gap-2">
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleClearCart}
                disabled={loading}
              >
                Clear Cart
              </button>
              <button 
                className={`${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded`}
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? "Processing..." : "Checkout"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <Link to="/menu" className="text-blue-600 hover:underline">
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
