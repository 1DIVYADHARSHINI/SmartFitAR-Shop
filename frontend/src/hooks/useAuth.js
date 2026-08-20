import { loginUser, signupUser } from "../api/auth.api";

export const useAuth = () => {
  const signup = async (name, email, password) => {
    return await signupUser({ name, email, password });
  };

  const login = async (email, password) => {
    const res = await loginUser({ email, password });

    // 🔥 STORE USER HERE (THIS WAS MISSING)
    if (res.user) {
      localStorage.setItem("user", JSON.stringify(res.user));
    }

    return res;
  };

  return { signup, login };
};
