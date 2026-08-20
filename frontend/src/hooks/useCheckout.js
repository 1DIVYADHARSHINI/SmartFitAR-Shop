import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useCheckout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [products, setProducts] = useState([]);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [quantities, setQuantities] = useState({});

  // ================= LOAD PRODUCTS =================
  useEffect(() => {
    const sourceProducts =
      state?.products ||
      JSON.parse(localStorage.getItem("checkoutProducts")) ||
      [];

    setProducts(sourceProducts);
    localStorage.setItem("checkoutProducts", JSON.stringify(sourceProducts));

    // initialize quantities
    const qty = {};
    sourceProducts.forEach((p) => (qty[p._id] = 1));
    setQuantities(qty);
  }, [state]);

  // ================= HANDLE QUANTITY CHANGE =================
  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, Number(value)),
    }));
  };

  // ================= PLACE ORDER =================
  const handlePlaceOrder = () => {
    if (products.length === 0) {
      alert("No products to order!");
      return;
    }

    const ordersData = products.map((product) => {
      const quantity = quantities[product._id];
      const price =
        product.discount > 0
          ? product.price - (product.price * product.discount) / 100
          : product.price;

      return {
        customer,
        product: {
          name: product.name,
          image: product.images?.[0],
          price,
          quantity,
          total: price * quantity,
        },
        paymentMethod,
        orderDate: new Date().toLocaleString(),
      };
    });

    const existingOrders = JSON.parse(localStorage.getItem("allOrders")) || [];
    localStorage.setItem(
      "allOrders",
      JSON.stringify([...existingOrders, ...ordersData])
    );

    toast.success("Order placed successfully!");
    navigate("/"); // ✅ redirect to Home page
  };

  return {
    products,
    customer,
    setCustomer,
    paymentMethod,
    setPaymentMethod,
    quantities,
    handleQuantityChange,
    handlePlaceOrder,
  };
};
