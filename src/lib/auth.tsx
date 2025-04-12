/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import type React from "react";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { setCookie, deleteCookie } from "cookies-next";
import { useLayout } from "@/hooks/zustand/layout";
import { getMeAction, loginAction } from "./auth.action";

type User = {
  id: string;
  name: string;
  phone: string;
  email: string;
  type: string;
  region?: { id: string; name: string };
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
  getMe: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { setIsSuccess, setError } = useLayout();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const getMe = useCallback(async () => {
    const res = await getMeAction();
    if (res.user) {
      if (res.user.data.type === "Admin") {
        setUser({
          id: res.user.data.id,
          name: res.user.data.name,
          email: res.user.data.email,
          phone: res.user.data.phone,
          type: res.user.data.type,
          region: res.user.data.region,
        });
      } else {
        setUser({
          id: res.user.data.id,
          name: res.user.data.name,
          email: res.user.data.email,
          phone: res.user.data.phone,
          type: res.user.data.type,
          region: res.user.data.region.id,
          schoolName: res.user.data.school.name,
          schoolId: res.user.data.school.id,
          degreeId: res.user.data.school.degree.id,
          degreeName: res.user.data.school.degree.name,
          registerPrice: res.user.data.school.degree.register_price,
        });
      }
    }
  }, []);
  useEffect(() => {
    getMe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const res = await loginAction(email, password);
    if (res.success) {
      setCookie("CBO_Token", res.data.data.token, {
        maxAge: 60 * 60 * 24 * 1,
      });
      setIsSuccess(true, "Selamat Kamu Berhasil Masuk");
      router.push("/dashboard");
      getMe();
    } else {
      const err = res.error as { status_code: number };
      if (err.status_code === 404) {
        setError(true, "Maaf Akun kamu tidak ditemukan");
      }
      if ((res.error as { status_code: number }).status_code === 422) {
        setError(true, "Sepertinya Password kamu salah");
      }
    }
  };

  const logout = () => {
    // Remove token from cookies
    deleteCookie("CBO_Token");

    // Clear user from state
    setUser(null);

    // Redirect to login
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, getMe, setUser }}
    >
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
