"use client";

import type React from "react";
import NextTopLoader from "nextjs-toploader";
import toast, { Toaster } from "react-hot-toast";
import { createContext, useContext, useEffect, useState } from "react";
import { useLayout } from "../hooks/zustand/layout";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { usePathname } from "next/navigation";
import { protectedPaths } from "@/constant/protectPath.constant";

type Theme = "light";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const pathname = usePathname();
  const isProtected =
    pathname !== "/" &&
    protectedPaths.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    );

  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const { isSuccess, isError, isLoading, isMessage, setIsSuccess, setError } =
    useLayout();

  useEffect(() => {
    if (isSuccess && isMessage) {
      toast.success(isMessage);
      setIsSuccess(false, "");
    }
    if (isError && isMessage) {
      toast.error(isMessage);
      setError(false, "");
    }
  }, [isSuccess, isError, isLoading, isMessage, setIsSuccess, setError]);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "light");

    root.classList.add("light");
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      <NextTopLoader
        color="#7FC7D9"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        zIndex={100000}
        showSpinner={true}
        easing="ease"
      />
      <Toaster toastOptions={{ duration: 4000 }} />
      <div
        className={`relative flex flex-col ${
          isLoading && "overflow-hidden h-screen w-screen"
        }`}
      >
        {/* <LoadingBlock /> */}
        {!isProtected && pathname !== "/" && <SiteHeader />}
        <main className="flex-1">{children}</main>
        {!isProtected && <SiteFooter />}
      </div>
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
