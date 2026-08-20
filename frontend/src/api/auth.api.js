{
  /*This test for mobile device Api login 
const BASE_URL = "http://10.243.79.232:5000/api/auth";*/
}
import API_URL from "@/config/api";
{
  /*const BASE_URL = "http://localhost:5000/api/auth";*/
}
const BASE_URL = `${API_URL}/api/auth`;

export const signupUser = async (data) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
