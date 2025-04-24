"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updatePasswordAction } from "../account.action";
import { useLayout } from "@/hooks/zustand/layout";
import { Loader2 } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";

const passwordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: "Kata sandi minimal 8 karakter." }),
    password: z.string().min(8, { message: "Kata sandi minimal 8 karakter." }),
    confirmPassword: z
      .string()
      .min(8, { message: "Kata sandi minimal 8 karakter." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Kata sandi tidak sama",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export function PasswordForm() {
  const { setIsSuccess, setError, isLoading, setIsLoading } = useLayout();

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: PasswordFormValues) {
    setIsLoading(true);
    const res = await updatePasswordAction({
      password: data.password,
      currentPassword: data.currentPassword,
    });

    if (res.success) {
      setIsSuccess(true, "Kata Sandi kamu berhasil diperbarui");
      form.resetField("confirmPassword");
      form.resetField("password");
      form.resetField("currentPassword");
    } else {
      if (res.error.errors.currentPassword) {
        setError(true, "Sepertinya Kata sandi saat ini salah");
        form.setError("currentPassword", {
          message: "Kata sandi saat ini salah",
        });
      }
      if (res.error.errors.password) {
        setError(true, "Kata sandi lama sama dengan kata sandi baru");
        form.setError("password", {
          message: "Kata sandi baru harus berbeda dengan sandi sebelumnya",
        });
      }
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>kata sandi saat ini</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kata sandi baru</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                {/* <FormDescription>
                  Password must be at least 8 characters long.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konfirmasi kata sandi</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isLoading} className="flex gap-3">
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />
              Memperbarui kata sandi
            </>
          ) : (
            "Perbarui kata sandi"
          )}
          {/* update */}
        </Button>
      </form>
    </Form>
  );
}
