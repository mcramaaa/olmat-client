// account.action.ts
"use server";

import api from "@/config/axiosServer";
import { AxiosError } from "axios";
import { z } from "zod";

// Schema definition remains the same as your original code
const accountSchema = z
  .object({
    province: z.string().min(1, { message: "Province is required" }),
    city: z.string().min(1, { message: "City is required" }),
    subdistrict: z.string().min(1, { message: "Subdistrict is required" }),
    school: z.string().min(1, { message: "School name is required" }),
    fullName: z.string().min(1, { message: "Full name is required" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    whatsapp: z.string().min(1, { message: "WhatsApp number is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Your existing API call functions
export async function getProvinceAction(): Promise<{
  data: any;
  error: AxiosError | null;
}> {
  // const api = apiServer();
  try {
    const res = await api.get("/location-api/province");
    return { data: res.data, error: null };
  } catch (error) {
    return { data: [], error: error as AxiosError };
  }
}

export async function getCityAction(provinceId: string): Promise<{
  data: any;
  error: AxiosError | null;
}> {
  try {
    const res = await api.get(`/location-api/city/${provinceId}`);
    return { data: res.data, error: null };
  } catch (error) {
    return { data: [], error: error as AxiosError };
  }
}

export async function getSubdistrictAction(cityId: string): Promise<{
  data: any;
  error: AxiosError | null;
}> {
  try {
    const res = await api.get(`/location-api/subdistrict/${cityId}`);
    return { data: res.data, error: null };
  } catch (error) {
    return { data: [], error: error as AxiosError };
  }
}

export async function getSchoolAction(subId: string): Promise<{
  data: any;
  error: AxiosError | null;
}> {
  try {
    const res = await api.get(`/location-api/school/${subId}`);
    return { data: res.data, error: null };
  } catch (error) {
    return { data: [], error: error as AxiosError };
  }
}

export async function submitRegistrationAction(
  data: z.infer<typeof accountSchema>
) {
  // Server-side validation
  const validationResult = accountSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const payload = {
    name: validationResult.data.fullName,
    email: validationResult.data.email,
    phone: validationResult.data.whatsapp,
    password: validationResult.data.password,
    school_id: +validationResult.data.school,
  };
  try {
    const response = await api.post("/auth/user/register", payload);

    // If successful, return success
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<any>;
    const errorMessage =
      axiosError.response?.data?.message || "Registration failed";

    return {
      success: false,
      message: errorMessage,
      payload: payload,
      errCause: axiosError.response?.data.errors || {},
    };
  }
}
