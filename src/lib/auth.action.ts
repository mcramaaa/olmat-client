"use server";

import api from "@/config/axiosServer";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function getMeAction() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("CBO_Token")?.value;

    if (!token) {
      return { success: false, user: null, error: "No token found" };
    }

    const response = await api.get("/auth/user/me");

    return { success: true, user: response.data, error: null };
  } catch (error) {
    console.error("Error in getMeAction:", error);
    return { success: false, user: null, error: error };
  }
}

export async function loginAction(email: string, password: string) {
  try {
    const res = await api.post("/auth/user/login", { email, password });
    return { success: true, data: res.data, error: null };
  } catch (error) {
    const err = error as AxiosError;
    return { success: false, data: null, error: err.response?.data };
  }
}

export async function eventSettingAction() {
  try {
    const res = await api.get("/event-setting");
    return { success: true, data: res.data, err: null };
  } catch (error) {
    return { success: true, data: null, err: error as AxiosError };
  }
}
