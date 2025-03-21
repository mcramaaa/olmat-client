import axios, { AxiosInstance } from "axios";
import { CookieValueTypes, getCookie } from "cookies-next";
import { cookies } from "next/headers";

export function apiServer(): AxiosInstance {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_HOST_API,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add request interceptor to add auth token
  api.interceptors.request.use(
    async (config) => {
      let token: string | undefined;

      // Check if running on server or client
      if (typeof window === "undefined") {
        // Server-side
        try {
          const cookieStore = await cookies();
          token = cookieStore.get("CBO_Token")?.value;
        } catch (error) {
          console.error("Error accessing cookies on server:", error);
        }
      } else {
        // Client-side
        const cookie = getCookie("CBO_Token") as CookieValueTypes;
        token = cookie;
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

// // Create a singleton instance
// let axiosInstance: AxiosInstance;

// /**
//  * Get the axios instance (creates it if it doesn't exist)
//  */
// export function getAxios(): AxiosInstance {
//   if (!axiosInstance) {
//     axiosInstance = createAxiosInstance();
//   }
//   return axiosInstance;
// }

/**
 * API wrapper functions for common HTTP methods
 */
// export const api = {
//   get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
//     const axios = getAxios();
//     const response = await axios.get(url, config);
//     return response.data;
//   },

//   post: async <T>(
//     url: string,
//     data?: any,
//     config?: AxiosRequestConfig
//   ): Promise<T> => {
//     const axios = getAxios();
//     const response = await axios.post(url, data, config);
//     return response.data;
//   },

//   put: async <T>(
//     url: string,
//     data?: any,
//     config?: AxiosRequestConfig
//   ): Promise<T> => {
//     const axios = getAxios();
//     const response = await axios.put(url, data, config);
//     return response.data;
//   },

//   delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
//     const axios = getAxios();
//     const response = await axios.delete(url, config);
//     return response.data;
//   },

//   // Add custom error handling wrapper
//   request: async <T>(
//     method: "get" | "post" | "put" | "delete",
//     url: string,
//     options?: { data?: any; config?: AxiosRequestConfig }
//   ): Promise<{ data: T | null; error: string | null }> => {
//     try {
//       let response;
//       const axios = getAxios();

//       switch (method) {
//         case "get":
//           response = await axios.get<T>(url, options?.config);
//           break;
//         case "post":
//           response = await axios.post<T>(url, options?.data, options?.config);
//           break;
//         case "put":
//           response = await axios.put<T>(url, options?.data, options?.config);
//           break;
//         case "delete":
//           response = await axios.delete<T>(url, options?.config);
//           break;
//       }

//       return { data: response.data, error: null };
//     } catch (error: unknown) {
//       console.error(`API ${method.toUpperCase()} error for ${url}:`, error);

//       // Type guard for axios error
//       if (axios.isAxiosError(error) && error.response?.data?.message) {
//         return {
//           data: null,
//           error: error.response.data.message,
//         };
//       }

//       return {
//         data: null,
//         error: `Failed to ${method} data`,
//       };
//     }
//   },
// };
