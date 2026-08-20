import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";

const CartBadge = () => {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, p) => sum + p.quantity, 0);
    setCount(total);
  };

  useEffect(() => {
    updateCount();
    window.addEventListener("storage", updateCount);
    return () => window.removeEventListener("storage", updateCount);
  }, []);

  return (
    <div className="relative cursor-pointer">
      <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-orange-500 transition" />

      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  );
};

export default CartBadge;
