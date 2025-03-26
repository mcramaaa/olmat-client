"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Shield, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { forgotPassAction } from "./forgotPass.action";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLayout } from "@/hooks/zustand/layout";
import ErrMessageBox from "@/components/ui/ErrMessageBox";

const Form = FormProvider;

// Form validation schema
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be a valid email address" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isDone, setIsDone] = useState(false);
  const { isLoading, setIsLoading, setIsSuccess } = useLayout();
  const [error, setError] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string>();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async () => {
    setError(null);
    setIsLoading(true);

    const res = await forgotPassAction(form.watch("email"));
    if (res.success) {
      setIsSuccess(true, "Email sudah dikirim coba kamu cek");
      setIsDone(true);
    } else {
      setErrMsg(
        "Kami tidak menemukan email yang kamu berikan, coba pastikan ulang emailnya ya!"
      );
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="flex flex-col items-center w-full max-w-sm">
        <CardHeader className="flex flex-col items-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-800">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-slate-800">
            Lupa Password
          </h1>
        </CardHeader>

        <CardContent>
          {!isDone ? (
            <>
              <p className="mb-6 text-sm text-center text-slate-600">
                Tenang, itu hal yang wajar kok! Masukkan alamat email kamu, dan
                kami akan kirimkan link untuk mengatur ulang kata sandi.
              </p>

              {errMsg && <ErrMessageBox message={errMsg} />}

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full "
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            {...field}
                            disabled={isLoading}
                            placeholder="Masukkan Email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {error && (
                    <div className="p-3 mb-4 text-sm text-red-700 rounded-md bg-red-50">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center justify-center w-full py-3 mt-5 mb-4 font-medium text-white rounded-md bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Kirim"
                    )}
                  </Button>
                </form>
              </Form>
            </>
          ) : (
            <div className="mb-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="mb-2 text-xl font-semibold text-slate-800">
                Cek Email Kamu
              </h2>
              <p className="text-slate-600">
                Tautan reset kata sandi sudah kami kirim ke email kamu. Yuk, cek
                kotak masuk dan ikuti langkah-langkahnya!
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Link
            href="/login"
            className="flex items-center text-sm font-medium text-slate-600 hover:text-slate-800"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Kembali ke Halaman Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
