import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../Pages/AuthContext";
import { toast } from "react-toastify";
import { processWalletPayment, createOrder } from "../services/api";
import { motion } from "framer-motion";
import { 
  FiMinus, FiPlus, FiTrash2, FiArrowLeft, 
  FiShoppingBag, FiCreditCard, FiTag, FiInfo 
} from "react-icons/fi";

// Suggested items for "You might also like" section
import MenuItems from "../Components/MenuItems";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [suggestedItems, setSuggestedItems] = useState([]);
  const [appliedPromo, setAppliedPromo] = useState(null);
  
  // Cart calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  // Removed GST and service fee
  const totalAmount = subtotal - promoDiscount;
  const walletBalance = user?.walletBalance || 0;
  const isBalanceSufficient = walletBalance >= totalAmount;
  
  // Prepare suggested items
  useEffect(() => {
    if (MenuItems.length > 0) {
      // Get categories from cart items
      const cartCategories = new Set(cart.map(item => {
        const menuItem = MenuItems.find(mi => mi.id === item.id);
        return menuItem ? menuItem.category : null;
      }).filter(Boolean));
      
      // Find items that match those categories but aren't in cart
      let recommendations = MenuItems.filter(item => 
        cartCategories.has(item.category) && 
        !cart.some(cartItem => cartItem.id === item.id)
      );
      
      // If no matches or too few, add some popular items
      if (recommendations.length < 4) {
        const popularItems = MenuItems.filter(item => 
          !cart.some(cartItem => cartItem.id === item.id) &&
          !recommendations.some(rec => rec.id === item.id)
        ).slice(0, 4 - recommendations.length);
        
        recommendations = [...recommendations, ...popularItems];
      }
      
      // Shuffle and take only 4
      setSuggestedItems(recommendations.sort(() => 0.5 - Math.random()).slice(0, 4));
    }
  }, [cart]);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  const handleApplyPromoCode = () => {
    if (!promoCode.trim()) return;
    
    // Simulate promo code validation
    if (promoCode.toUpperCase() === "FIRST10") {
      const discount = Math.min(subtotal * 0.1, 50); // 10% off, max ₹50
      setPromoDiscount(discount);
      setAppliedPromo({
        code: promoCode.toUpperCase(),
        discount: discount,
        description: "10% off, up to ₹50"
      });
      toast.success("Promo code applied successfully!");
    } 
    else if (promoCode.toUpperCase() === "WELCOME20") {
      const discount = Math.min(subtotal * 0.2, 100); // 20% off, max ₹100
      setPromoDiscount(discount);
      setAppliedPromo({
        code: promoCode.toUpperCase(),
        discount: discount,
        description: "20% off, up to ₹100"
      });
      toast.success("Promo code applied successfully!");
    }
    else {
      toast.error("Invalid promo code");
    }
    
    setPromoCode("");
  };

  const handleRemovePromo = () => {
    setPromoDiscount(0);
    setAppliedPromo(null);
    toast.info("Promo code removed");
  };

  const handleCheckout = async () => {
    if (!user?.uid) {
      toast.error("Please log in to complete your purchase");
      navigate("/login");
      return;
    }

    if (!isBalanceSufficient) {
      toast.error("Insufficient wallet balance! Please add funds to your wallet.");
      navigate("/wallet");
      return;
    }

    setLoading(true);
    try {
      // Create an order in the database
      const orderData = {
        userId: user.uid,
        items: cart.map(item => ({
          itemId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: totalAmount
      };
      
      const response = await createOrder(orderData);
      
      // Update local user state with new wallet balance
      login({
        ...user,
        walletBalance: response.walletBalance
      });
      
      toast.success("Order placed successfully!");
      clearCart();
      
      // Redirect to order confirmation
      navigate(`/orders`);
    } catch (error) {
      toast.error(error.message || "Failed to process payment");
    } finally {
      setLoading(false);
    }
  };

  const addSuggestedItemToCart = (item) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image
    };
    
    // Use the addToCart function from context
    updateQuantity(item.id, 1);
    toast.success(`Added ${item.name} to cart!`);
    
    // Update suggestions
    setSuggestedItems(suggestedItems.filter(i => i.id !== item.id));
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Shopping Cart</h1>
        <Link to="/menu" className="flex items-center text-[#2c2c5b] hover:text-[#fec723] transition">
          <FiArrowLeft className="mr-2" /> Continue Shopping
        </Link>
      </div>

      {cart.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-8 text-center"
        >
          <div className="rounded-full bg-gray-100 p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <FiShoppingBag className="text-4xl text-gray-400" />
          </div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link 
            to="/menu" 
            className="bg-[#2c2c5b] text-white px-6 py-3 rounded-lg hover:bg-[#fec723] hover:text-[#2c2c5b] transition"
          >
            Browse Menu
          </Link>
        </motion.div>
      ) : (
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items - Left Side */}
          <div className="lg:col-span-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="font-medium text-[#2c2c5b]">Cart Items ({cart.length})</h2>
              </div>

              {/* Cart Item List */}
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <motion.li 
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 py-4 flex items-center"
                  >
                    {/* Item Image */}
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">₹{item.price} each</p>

                      {/* Quantity Controls */}
                      <div className="mt-2 flex items-center">
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-1 rounded-md border border-gray-300 hover:bg-gray-100"
                        >
                          <FiMinus size={14} className="text-gray-600" />
                        </button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-1 rounded-md border border-gray-300 hover:bg-gray-100"
                        >
                          <FiPlus size={14} className="text-gray-600" />
                        </button>
                        
                        {/* Remove Item Button */}
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="ml-4 text-sm text-red-600 hover:text-red-800 flex items-center"
                        >
                          <FiTrash2 size={14} className="mr-1" /> Remove
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>

              <div className="px-6 py-4 flex justify-between border-t border-gray-200">
                <button 
                  className="text-sm text-red-600 hover:text-red-800"
                  onClick={clearCart}
                >
                  Clear cart
                </button>
                <Link to="/menu" className="text-[#2c2c5b] hover:text-[#fec723]">
                  Add more items
                </Link>
              </div>
            </div>

            {/* Suggested items */}
            {suggestedItems.length > 0 && (
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="font-medium text-[#2c2c5b]">You Might Also Like</h2>
                </div>
                
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {suggestedItems.map((item) => (
                    <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-md transition">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-24 object-cover"
                      />
                      <div className="p-3">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <div className="mt-1 flex justify-between items-center">
                          <p className="text-sm font-medium text-[#2c2c5b]">₹{item.price}</p>
                          <button 
                            onClick={() => addSuggestedItemToCart(item)}
                            className="text-xs bg-[#2c2c5b] text-white px-2 py-1 rounded hover:bg-[#fec723] hover:text-[#2c2c5b]"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Order Summary - Right Side */}
          <div className="lg:col-span-4 mt-6 lg:mt-0">
            <div className="bg-white shadow-md rounded-lg overflow-hidden sticky top-4">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="font-medium text-[#2c2c5b]">Order Summary</h2>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                
                {/* Promo Code */}
                {appliedPromo ? (
                  <div className="bg-green-50 p-3 rounded-md flex justify-between items-center">
                    <div>
                      <span className="text-green-700 font-medium">{appliedPromo.code}</span>
                      <p className="text-xs text-green-600">{appliedPromo.description}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-700 font-medium">-₹{promoDiscount.toFixed(2)}</span>
                      <button 
                        className="ml-2 text-gray-500 hover:text-red-500"
                        onClick={handleRemovePromo}
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#2c2c5b]"
                    />
                    <button
                      onClick={handleApplyPromoCode}
                      className="bg-[#2c2c5b] hover:bg-[#3a3a77] text-white px-4 py-2 rounded-r-md"
                    >
                      Apply
                    </button>
                  </div>
                )}
                
                {/* Total */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between text-lg font-medium">
                    <span className="text-[#2c2c5b]">Total</span>
                    <span className="text-[#2c2c5b]">₹{totalAmount.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Wallet Balance */}
                <div className={`flex justify-between ${isBalanceSufficient ? 'text-green-600' : 'text-red-600'}`}>
                  <span>Wallet Balance</span>
                  <span className="font-medium">₹{walletBalance.toFixed(2)}</span>
                </div>
                
                {!isBalanceSufficient && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-600 flex items-start">
                    <FiInfo className="mr-2 mt-0.5 flex-shrink-0" />
                    <p>
                      Insufficient wallet balance. You need ₹{(totalAmount - walletBalance).toFixed(2)} more.
                      <Link to="/wallet" className="ml-1 font-medium underline">Add funds</Link>
                    </p>
                  </div>
                )}
                
                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={loading || cart.length === 0}
                  className={`w-full py-3 px-4 rounded-md text-white font-medium flex items-center justify-center ${
                    loading || cart.length === 0 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#fec723] hover:bg-[#fdd04b] text-[#2c2c5b]'
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiCreditCard className="mr-2" /> Place Order
                    </>
                  )}
                </button>
                
                {/* Order Notes */}
                <div className="text-sm text-gray-500 mt-4">
                  <ul className="space-y-1">
                    <li className="flex items-center">
                      <FiTag className="mr-2 text-[#2c2c5b]" /> Free delivery within campus
                    </li>
                    <li className="flex items-center">
                      <FiShoppingBag className="mr-2 text-[#2c2c5b]" /> Self pickup from canteen
                    </li>
                    <li className="flex items-center">
                      <FiInfo className="mr-2 text-[#2c2c5b]" /> Approximate time: 15-20 minutes
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
