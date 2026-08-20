import { useState, useEffect } from "react";

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [discountAlerts, setDiscountAlerts] = useState({});
  const [selectedAlert, setSelectedAlert] = useState({});

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);

    const storedAlerts =
      JSON.parse(localStorage.getItem("discountAlerts")) || {};
    setDiscountAlerts(storedAlerts);
    setSelectedAlert(storedAlerts);
  }, []);

  const handleRemove = (productId) => {
    const updatedWishlist = wishlist.filter((p) => p._id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    const updatedAlerts = { ...discountAlerts };
    delete updatedAlerts[productId];
    setDiscountAlerts(updatedAlerts);
    localStorage.setItem("discountAlerts", JSON.stringify(updatedAlerts));

    const updatedSelected = { ...selectedAlert };
    delete updatedSelected[productId];
    setSelectedAlert(updatedSelected);
  };

  const handleAlertChange = (productId, value) => {
    const updatedAlerts = {
      ...discountAlerts,
      [productId]: Number(value),
    };

    setDiscountAlerts(updatedAlerts);
    localStorage.setItem("discountAlerts", JSON.stringify(updatedAlerts));

    const notifications =
      JSON.parse(localStorage.getItem("notifications")) || [];

    const filtered = notifications.filter(
      (n) => !(n.type === "WISHLIST_DISCOUNT" && n.productId === productId)
    );

    localStorage.setItem("notifications", JSON.stringify(filtered));
  };

  return {
    wishlist,
    selectedAlert,
    setSelectedAlert,
    handleRemove,
    handleAlertChange,
  };
};
