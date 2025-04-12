"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { useLayout } from "@/hooks/zustand/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LockKeyholeIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { postNewPassAction } from "../../forgotPass.action";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes/router";
import ErrMessageBox from "@/components/ui/ErrMessageBox";
import Link from "next/link";

interface IProps {
  slug: string;
  email: string;
}

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"],
  });

type ForgotPassValues = z.infer<typeof passwordSchema>;

export default function ForgotPassForm({ slug, email }: IProps) {
  const router = useRouter();
  const { isLoading, setIsLoading, setIsSuccess } = useLayout();
  const [errMsg, setErrMsg] = useState<{ code?: number; message?: string }>();

  const form = useForm<ForgotPassValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit() {
    setIsLoading(true);
    const isPass = form.watch("password");
    const payload = {
      hash: slug,
      email: email,
      newPassword: isPass,
    };

    const res = await postNewPassAction(payload);
    if (res.success) {
      setIsLoading(false);
      setIsSuccess(true, "Yay, password kamu berhasil diperbarui");
      router.push(ROUTES.LOGIN);
    } else {
      setErrMsg({
        code: 400,
        message:
          "Yah, sepertinya permintaan kamu telah kadaluwarsa. Kamu bisa buat permintaan baru atau kembali ke halaman login.",
      });
      setIsLoading(false);
    }
  }

  return (
    <div className="container flex items-center justify-center px-4 py-16 md:py-24">
      <Card className="w-full max-w-sm bg-white rounded-lg shadow-md">
        <CardHeader className="gap-y-4 items-center">
          <div className="bg-slate-800 p-4 rounded-full text-white">
            <LockKeyholeIcon className="h-10 w-10" />
          </div>
          <h1 className="text-2xl text-center font-bold text-slate-800">
            Buat Password Baru
          </h1>
          <p className="text-sm text-center">
            Silakan masukkan Password baru untuk akun kamu
          </p>
          {errMsg && <ErrMessageBox message={errMsg.message} />}
        </CardHeader>
        <CardContent>
          <div>
            {errMsg?.code === 400 ? null : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-y-4"
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            {...field}
                            disabled={isLoading}
                            placeholder="Masukkan Password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            {...field}
                            disabled={isLoading}
                            placeholder="Masukkan konfirmasi Password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full mt-5 bg-slate-800 text-white py-3 rounded-md font-medium hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed mb-4 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Simpan Password"
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </CardContent>
        <CardFooter>
          {errMsg?.code === 400 && (
            <div className="flex w-full justify-around text-sm">
              <Link href={ROUTES.LOGIN}>Masuk akun aja</Link>
              <Link href={ROUTES.FORGOTPASS}>Reset password lagi</Link>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
