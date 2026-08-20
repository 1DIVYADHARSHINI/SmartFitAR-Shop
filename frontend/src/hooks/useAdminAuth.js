import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLoginApi } from "@/api/admin.api";

const useAdminAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      setLoading(true);

      const res = await adminLoginApi({ email, password });

      if (res.data.success) {
        localStorage.setItem("admin", JSON.stringify(res.data.admin));
        navigate("/dashboard");
      }
    } catch {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useAdminAuth;
