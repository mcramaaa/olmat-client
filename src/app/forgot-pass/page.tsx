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
      console.log("error", res.error);
      setErrMsg(
        "Kami tidak menemukan email yang kamu berikan, coba pastikan ulang emailnya ya!"
      );
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="flex flex-col items-center w-full max-w-sm">
        <CardHeader className="flex flex-col items-center">
          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Lupa Password
          </h1>
        </CardHeader>

        <CardContent>
          {!isDone ? (
            <>
              <p className="text-center text-sm text-slate-600 mb-6">
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
                    <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-5 bg-slate-800 text-white py-3 rounded-md font-medium hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed mb-4 flex items-center justify-center"
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
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
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
              <h2 className="text-xl font-semibold text-slate-800 mb-2">
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
            className="flex items-center text-slate-600 hover:text-slate-800 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
