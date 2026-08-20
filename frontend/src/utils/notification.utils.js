// src/utils/notification.utils.js

// 🔔 MAIN NOTIFICATION CREATOR
export const createSellerNotifications = ({
  type,
  sellerStore,
  productName,
  discount,
  productId,
  userEmail, // ✅ ADD THIS
}) => {
  const notifications = JSON.parse(localStorage.getItem("notifications")) || [];

  let message = "";

  // 🆕 NEW PRODUCT
  if (type === "NEW_PRODUCT") {
    message = `${sellerStore} has launched a new product: ${productName}. Explore it now.`;
  }

  // 🔔 DISCOUNT (followers)
  if (type === "DISCOUNT") {
    message = `${sellerStore} has announced a ${discount}% discount on ${productName}. Check it out now.`;
  }

  // ❤️ WISHLIST DISCOUNT
  if (type === "WISHLIST_DISCOUNT") {
    message = `${productName} is now available with ${discount}% discount (Wishlist alert).`;
  }

  const notification = {
    id: Date.now(),
    type,
    sellerStore,
    productName,
    discount,
    productId,
    userEmail, // ✅ SAVE EMAIL
    message,
    read: false,
    createdAt: new Date().toISOString(),
  };

  notifications.unshift(notification);
  localStorage.setItem("notifications", JSON.stringify(notifications));

  // Dispatch custom event for same-tab updates
  window.dispatchEvent(new CustomEvent("notificationsUpdated"));
};

// ❤️ WISHLIST MATCH CHECKER
export const checkWishlistDiscountMatch = ({
  productId,
  productName,
  discount,
}) => {
  const discountAlerts =
    JSON.parse(localStorage.getItem("discountAlerts")) || {};

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  const alertValue = discountAlerts[productId];

  if (alertValue && discount >= alertValue) {
    createSellerNotifications({
      type: "WISHLIST_DISCOUNT",
      productName,
      discount,
      productId,
      userEmail: user.email,
    });
  }
};
