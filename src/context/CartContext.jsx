/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext();

const readStorage = (key, fallback) => {
  try {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : fallback;
  } catch {
    return fallback;
  }
};

export default function CartProvider({ children }) {
  const [favorites, setFavorites] = useState(() =>
    readStorage("favoritesItems", [])
  );
  const [cartItems, setCartItems] = useState(() => readStorage("cartItems", []));
  const [orders, setOrders] = useState(() => readStorage("orders", []));

  const addToFavorites = (item) => {
    setFavorites((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((i) => i.id !== id));
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      if (prevItems.some((i) => i.id === item.id)) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const moveFavoriteToCart = (item) => {
    addToCart(item);
    removeFromFavorites(item.id);
  };

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const updateQuantity = (id, quantity) => {
    const nextQuantity = Math.max(1, Number(quantity) || 1);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: nextQuantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const placeOrder = ({ user, shipping }) => {
    if (!cartItems.length) return null;

    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const nextOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      status: "Processing",
      total,
      userEmail: user?.email || "",
      shipping,
      items: cartItems,
    };

    setOrders((prevOrders) => [nextOrder, ...prevOrders]);
    clearCart();
    return nextOrder;
  };

  const getOrdersByUser = (email) =>
    orders.filter((order) => order.userEmail === email);

  const cartTotal = useMemo(
    () =>
      cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems]
  );

  useEffect(() => {
    localStorage.setItem("favoritesItems", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        orders,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        updateQuantity,
        removeFromCart,
        clearCart,
        placeOrder,
        getOrdersByUser,
        addToFavorites,
        favorites,
        removeFromFavorites,
        moveFavoriteToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
