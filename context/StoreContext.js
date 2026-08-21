"use client";
import React, { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  
  const addToCart = (product, size, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => item === existing ? { ...item, qty: item.qty + qty } : item);
      }
      return [...prev, { ...product, size, qty }];
    });
  };

  const removeFromCart = (product, size) => {
    setCart(prev => prev.filter(item => !(item.id === product.id && item.size === size)));
  };

  const updateQty = (product, size, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === product.id && item.size === size) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.qty), 0);
  const cartCount = cart.reduce((count, item) => count + item.qty, 0);

  return (
    <StoreContext.Provider value={{
      cart, addToCart, removeFromCart, updateQty, cartTotal, cartCount,
      user, setUser
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
