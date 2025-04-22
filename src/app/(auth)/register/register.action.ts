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
    whatsapp: z
      .string()
      .min(1, { message: "WhatsApp number is required" })
      .regex(/^08\d+$/, "Nomor WhatsApp harus dimulai dengan 08"),
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

const schoolSchema = z.object({
  province_id: z.string().min(1, { message: "Province is required" }),
  city_id: z.string().min(1, { message: "City is required" }),
  subdistrict_id: z.string().min(1, { message: "Subdistrict is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  degree_id: z.string().min(1, { message: "School level is required" }),
  name: z.string().min(1, { message: "School name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .min(1, { message: "WhatsApp number is required" })
    .regex(/^08\d+$/, "Nomor WhatsApp harus dimulai dengan 08"),
  whatsapp: z
    .string()
    .min(1, { message: "WhatsApp number is required" })
    .regex(/^08\d+$/, "Nomor WhatsApp harus dimulai dengan 08"),
});

// Your existing API call functions
export async function getProvinceAction(): Promise<{
  data: any;
  error: AxiosError | null;
}> {
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

export async function getRegionByCityAction(cityId: string): Promise<{
  success: boolean;
  data: any;
  error: AxiosError | null;
}> {
  try {
    const res = await api.get(`/location-api/region/${cityId}`);
    return { success: true, data: res.data, error: null };
  } catch (error) {
    return { success: false, data: [], error: error as AxiosError };
  }
}

export async function submitSchoolRegistrationAction(
  data: z.infer<typeof schoolSchema>
): Promise<{
  success: boolean;
  data: any;
  error: AxiosError | null | any;
}> {
  const validationResult = schoolSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      data: null,
      error: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await api.post("/school", data);
    return { success: true, data: res.data, error: null };
  } catch (error) {
    const err = error as AxiosError;
    return { success: false, data: null, error: err };
  }
}

export async function submitAccountRegistrationAction(
  data: z.infer<typeof accountSchema>
) {
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

export async function getDegreeAction(): Promise<{
  data: any;
  error: AxiosError | null;
}> {
  try {
    const res = await api.get(`/location-api/degree`);
    return { data: res.data, error: null };
  } catch (error) {
    return { data: [], error: error as AxiosError };
  }
}
export async function getAllCityAction(): Promise<{
  data: any;
  error: AxiosError | null;
}> {
  try {
    const res = await api.get(`/location-api/cities`);
    const cities = res.data.map((item: any) => ({
      label: item.name,
      value: item.id,
    }));
    return { data: cities, error: null };
  } catch (error) {
    return { data: [], error: error as AxiosError };
  }
}

export async function getAllRegionAction(): Promise<{
  success: boolean;
  data: any;
  error: AxiosError | null;
}> {
  try {
    const res = await api.get(`/location-api/regions`);
    const updatedRegions = res.data.map((region: any) => {
      const targetedRayons = [
        "Rayon Kalimantan",
        "Rayon Papua Bali",
        "Rayon Sulawesi",
        "Rayon Sumatra",
      ];

      if (targetedRayons.includes(region.name)) {
        const wilayah = region.name.replace("Rayon ", "");
        return {
          ...region,
          cities: [{ name: `Seluruh Wilayah ${wilayah}` }],
        };
      }

      return region;
    });

    return { success: true, data: updatedRegions, error: null };
  } catch (error) {
    const err = error as AxiosError;
    return { success: false, data: [], error: err };
  }
}
