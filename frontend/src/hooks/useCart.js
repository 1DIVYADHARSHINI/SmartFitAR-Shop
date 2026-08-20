import { useState, useEffect } from "react";

export const useCart = (addedProduct) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Add product from "Add to Cart" button
  useEffect(() => {
    if (!addedProduct) return;

    setCart((prevCart) => {
      const existing = prevCart.find((p) => p._id === addedProduct._id);
      let updatedCart;

      if (existing) {
        updatedCart = prevCart.map((p) =>
          p._id === addedProduct._id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      } else {
        updatedCart = [...prevCart, { ...addedProduct, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Trigger cart badge update
      window.dispatchEvent(new Event("storage"));

      return updatedCart;
    });
  }, [addedProduct]);

  // Remove product
  const handleRemove = (productId) => {
    const updatedCart = cart.filter((p) => p._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Trigger cart badge update
    window.dispatchEvent(new Event("storage"));
  };

  // Subtotal calculation
  const subtotal = cart.reduce((sum, p) => {
    const discountedPrice =
      p.discount > 0 ? p.price - (p.price * p.discount) / 100 : p.price;
    return sum + discountedPrice * p.quantity;
  }, 0);

  return { cart, handleRemove, subtotal };
};
