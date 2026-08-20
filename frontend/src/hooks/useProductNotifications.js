import {
  createSellerNotifications,
  checkWishlistDiscountMatch,
} from "@/utils/notification.utils";

export const useProductNotifications = ({ state, sellers, handleSubmit }) => {
  const handleSubmitWithNotification = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const isNewProduct = !state.productId;
    const productId = state.productId;
    const productName = state.name;
    const discount = Number(state.discount);
    const sellerId = state.sellerId;

    const globalFollowed =
      JSON.parse(localStorage.getItem("globalFollowed")) || {};
    const followers = globalFollowed[sellerId] || [];

    await handleSubmit(e);

    const sellerStore = sellers.find((s) => s._id === sellerId)?.storeName;
    if (!sellerStore) return;

    // 🆕 NEW PRODUCT → followers only
    if (isNewProduct && followers.length > 0) {
      followers.forEach((email) => {
        createSellerNotifications({
          type: "NEW_PRODUCT",
          sellerStore,
          productName,
          productId,
          userEmail: email,
        });
      });
    }

    // 🔔 DISCOUNT → followers only
    if (!isNewProduct && discount > 0 && followers.length > 0) {
      followers.forEach((email) => {
        createSellerNotifications({
          type: "DISCOUNT",
          sellerStore,
          productName,
          discount,
          productId,
          userEmail: email,
        });
      });
    }

    // ❤️ WISHLIST → independent
    checkWishlistDiscountMatch({
      productId,
      productName,
      discount,
    });
  };

  return { handleSubmitWithNotification };
};
