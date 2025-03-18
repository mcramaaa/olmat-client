/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import api from "@/config/axiosConfig";
import { useLayout } from "@/hooks/zustand/layout";

type User = {
  id: string;
  name: string;
  phone: string;
  email: string;
  type: string;
  regionId: string;
  schoolId?: number;
  schoolName?: string;
  degreeId?: number;
  degreeName?: string;
  registerPrice?: number;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { setIsSuccess, setError } = useLayout();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const token = getCookie("_CToken");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  const getMe = async () => {
    const token = getCookie("CBO_Token");
    if (token) {
      try {
        const res = await api.get("/auth/user/me");
        console.log(res.data);
        if (res.data.data.type === "Admin") {
          setUser({
            id: res.data.data.id,
            name: res.data.data.name,
            email: res.data.data.email,
            phone: res.data.data.phone,
            type: res.data.data.type,
            regionId: res.data.data.region.id,
          });
        } else {
          setUser({
            id: res.data.data.id,
            name: res.data.data.name,
            email: res.data.data.email,
            phone: res.data.data.phone,
            type: res.data.data.type,
            regionId: res.data.data.region.id,
            schoolName: res.data.data.school.name,
            schoolId: res.data.data.school.id,
            degreeId: res.data.data.school.degree.id,
            degreeName: res.data.data.school.degree.name,
            registerPrice: res.data.data.school.degree.register_price,
          });
        }
      } catch (error) {
        console.log("errir", error);
      }
    }
    setIsLoading(false);
  };
  // Check if user is logged in on mount
  useEffect(() => {
    getMe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await api.post("/auth/user/login", {
        email,
        password,
      });
      setCookie("CBO_Token", res.data.data.token, { maxAge: 60 * 60 * 24 * 1 });
      setIsSuccess(true, "Login berhasil");

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error: any) {
      console.log("ini", error);

      if (error.response.data.status_code === 404) {
        setError(true, "Akun tidak ditemukan");
      }
      if (error.response.data.status_code === 422) {
        setError(true, "Akun tidak ditemukan");
        setError(true, "Password salah");
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Remove token from cookies
    deleteCookie("CBO_Token");
    console.log("first");

    // Clear user from state
    setUser(null);

    // Redirect to login
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
