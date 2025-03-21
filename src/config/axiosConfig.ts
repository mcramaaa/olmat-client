import axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";

const isServer = typeof window === "undefined";

/**
 * Creates an axios instance that works in both client and server environments
 */
export function createAxiosInstance(): AxiosInstance {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST_API,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add request interceptor to add auth token
  instance.interceptors.request.use(
    async (config) => {
      // Get token based on environment
      let token: string | undefined;

      if (isServer) {
        // Server-side: Use next/headers
        try {
          // Need to await cookies() as it returns a Promise
          const cookieStore = await cookies();
          token = cookieStore.get("CBO_Token")?.value;
        } catch (error) {
          // Handle error when cookies() is called in an environment where it's not available
          console.error("Error accessing cookies on server:", error);
        }
      } else {
        // Client-side: Use document.cookie
        const cookieValue = document.cookie
          .split("; ")
          .find((row) => row.startsWith("CBO_Token="))
          ?.split("=")[1];

        token = cookieValue;
      }

      // Add auth header if token exists
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Add response interceptor for error handling
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle 401 errors on client side
      if (!isServer && error.response?.status === 401) {
        // Redirect to login page
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

// Create a singleton instance
let axiosInstance: AxiosInstance;

/**
 * Get the axios instance (creates it if it doesn't exist)
 */
export function getAxios(): AxiosInstance {
  if (!axiosInstance) {
    axiosInstance = createAxiosInstance();
  }
  return axiosInstance;
}
