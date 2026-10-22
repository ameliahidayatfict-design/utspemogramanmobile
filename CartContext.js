
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    if (!product || product.id == null) {
      console.warn('Produk tidak memiliki ID');
      return;
    }

    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => String(item.id) === String(product.id)
      );

      if (existing) {
        return previousCart.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, jumlah: (item.jumlah || 1) + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, jumlah: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((previousCart) =>
      previousCart.filter(
        (item) => String(item.id) !== String(id)
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      'useCart harus digunakan di dalam CartProvider'
    );
  }

  return context;
}
