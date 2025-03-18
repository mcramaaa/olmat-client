"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import api from "@/config/axiosConfig";

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
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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
        console.log(error);
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
      if (res.data.data.user.type === "Admin") {
        setUser({
          id: res.data.data.user.id,
          name: res.data.data.user.name,
          email: res.data.data.user.email,
          phone: res.data.data.user.phone,
          type: res.data.data.user.type,
          regionId: res.data.data.user.region.id,
        });
      } else {
        setUser({
          id: res.data.data.id,
          name: res.data.data.name,
          email: res.data.data.email,
          phone: res.data.data.phone,
          type: res.data.data.type,
          regionId: res.data.data.user.region.id,
          schoolName: res.data.data.user.school.name,
          schoolId: res.data.data.user.school.id,
          degreeId: res.data.data.user.school.degree.id,
          degreeName: res.data.data.user.school.degree.name,
          registerPrice: res.data.data.user.school.degree.register_price,
        });
      }

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
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
