import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Login - Math Olympiad 2025",
  description: "Login to your Math Olympiad 2025 account",
};

export default function LoginPage() {
  return (
    <div className="container flex flex-col items-center justify-center w-screen h-screen px-4">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            🎓 Halo, Pejuang Matematika!
          </h1>
          <p className="text-sm text-muted-foreground">
            Masuk ke akunmu dan lanjutkan perjalanan seru menuju Olimpiade
            Matematika UINSA 2025!
          </p>
        </div>
        <LoginForm />
        <p className="px-8 text-sm text-center text-muted-foreground">
          Belum punya akun ?{" "}
          <Link
            href="/register"
            className="underline underline-offset-4 hover:text-primary"
          >
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}
