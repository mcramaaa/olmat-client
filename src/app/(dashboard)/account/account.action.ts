"use server";

import api from "@/config/axiosServer";
import { AxiosError } from "axios";
import { z } from "zod";

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(1, { message: "WhatsApp number is required." }),
});

export async function updateProfilAction(
  data: z.infer<typeof accountFormSchema>
): Promise<{
  success: boolean;
  data: any;
  error: AxiosError | any | null;
}> {
  const validation = accountFormSchema.safeParse(data);
  if (!validation.success) {
    return {
      success: false,
      data: null,
      error: validation.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await api.patch("/auth/user/update-me", data);
    return { success: true, data: res.data, error: null };
  } catch (error) {
    const err = error as AxiosError;
    return { success: false, data: null, error: err };
  }
}

export async function updatePasswordAction(data: {
  password: string;
  currentPassword: string;
}): Promise<{
  success: boolean;
  data: any;
  error: any | null;
}> {
  try {
    const res = await api.patch("/auth/user/update-me", {
      password: data.password,
      currentPassword: data.currentPassword,
    });
    return { success: true, data: res.data, error: null };
  } catch (error) {
    const err = error as AxiosError;

    return { success: false, data: null, error: err.response?.data };
  }
}
