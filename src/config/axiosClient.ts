import axios, { AxiosInstance } from "axios";
import { CookieValueTypes, getCookie } from "cookies-next";

export function apiClient(): AxiosInstance {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST_API,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add request interceptor to add auth token
  api.interceptors.request.use(
    async (config) => {
      const cookie = getCookie("CBO_Token") as CookieValueTypes;
      // Add auth header if token exists
      if (cookie && config.headers) {
        config.headers.Authorization = `Bearer ${cookie}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Add response interceptor for error handling
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle 401 errors on client side
      if (typeof window !== "undefined" && error.response?.status === 401) {
        // Redirect to login page
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  return api;
}
