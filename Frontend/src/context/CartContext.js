import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Try to load cart from localStorage on initial render
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity, itemData = null) => {
    setCart(prevCart => {
      // Check if item exists in cart
      const itemIndex = prevCart.findIndex(item => item.id === itemId);
      
      // If item exists, update its quantity
      if (itemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[itemIndex] = {
          ...updatedCart[itemIndex],
          quantity: quantity
        };
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      } 
      // If item doesn't exist but we have itemData, add it as new
      else if (itemData) {
        const newItem = {
          ...itemData,
          quantity: quantity
        };
        const updatedCart = [...prevCart, newItem];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      }
      
      // If neither condition is met, return cart unchanged
      return prevCart;
    });
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};
