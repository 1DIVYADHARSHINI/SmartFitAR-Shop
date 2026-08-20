import { useState, useEffect } from "react";

export const useCustomerDetails = () => {
  const [orders, setOrders] = useState([]);
  const [followers, setFollowers] = useState([]);

  // Load data from localStorage
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("allOrders")) || [];
    const storedFollowers =
      JSON.parse(localStorage.getItem("followedSellers")) || [];

    setOrders(storedOrders);
    setFollowers(storedFollowers);
  }, []);

  // Remove an order
  const handleRemoveOrder = (index) => {
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);
    localStorage.setItem("allOrders", JSON.stringify(updatedOrders));
  };

  // Remove a follower
  const handleRemoveFollower = (sellerId) => {
    // 1️⃣ Update React state
    const updatedFollowers = followers.filter((f) => f.sellerId !== sellerId);
    setFollowers(updatedFollowers);

    // 2️⃣ Update followedSellers in localStorage
    localStorage.setItem("followedSellers", JSON.stringify(updatedFollowers));

    // 3️⃣ Update globalFollowed (VERY IMPORTANT)
    const user = JSON.parse(localStorage.getItem("user"));
    const globalFollowed =
      JSON.parse(localStorage.getItem("globalFollowed")) || {};

    if (globalFollowed[sellerId]) {
      globalFollowed[sellerId] = globalFollowed[sellerId].filter(
        (email) => email !== user.email
      );

      // clean empty seller entry
      if (globalFollowed[sellerId].length === 0) {
        delete globalFollowed[sellerId];
      }
    }

    localStorage.setItem("globalFollowed", JSON.stringify(globalFollowed));
  };

  return {
    orders,
    followers,
    handleRemoveOrder,
    handleRemoveFollower,
  };
};
