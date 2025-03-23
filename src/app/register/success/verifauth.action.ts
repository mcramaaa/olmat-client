"use server";

import api from "@/config/axiosServer";
import { AxiosError } from "axios";

export async function resendOtpAction(hash: string) {
  try {
    const res = await api.post("/auth/user/resend/otp", { hash: hash });
    return {
      success: true,
      data: res.data,
      error: null,
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      success: false,
      data: "",
      error: err.response?.data,
    };
  }
}

export async function confirmAction(hash: string, otp: string) {
  try {
    const res = await api.post("/auth/user/confirm", {
      hash: hash,
      otp: otp,
    });

    return {
      success: true,
      data: res.data,
      error: null,
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      success: false,
      data: null,
      error: err.response?.data,
    };
  }
}
