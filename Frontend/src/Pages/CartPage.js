import React from "react";
import { Link } from "react-router-dom";

// Dummy menu items data (replace with your actual data or context/state)
const menuItems = [
  { id: 1, name: "Veg Sandwich", price: 90 },
  { id: 2, name: "Cheese Frankie", price: 90 },
  { id: 3, name: "Cold Coffee", price: 90 },
];

// Sample cart items with only IDs and quantity
const cartData = [
  { id: 1, quantity: 1 },
  { id: 2, quantity: 2 },
];

const CartPage = () => {
  const cartItems = cartData.map((cartItem) => {
    const menuItem = menuItems.find((item) => item.id === cartItem.id);
    return {
      ...menuItem,
      quantity: cartItem.quantity,
      total: menuItem.price * cartItem.quantity,
    };
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const walletBalance = 1190;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="mb-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b py-2"
              >
                <span>{item.name} (x{item.quantity})</span>
                <span>₹ {item.total.toFixed(2)}</span>
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
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Clear Cart
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Checkout
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
