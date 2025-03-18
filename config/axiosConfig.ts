// utils/axiosConfig.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST_API, // Set your base URL
});

// Function to set the authorization header
export const setAuthHeader = (token: string) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
