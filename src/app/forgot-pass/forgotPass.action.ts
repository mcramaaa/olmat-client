"use server";

import api from "@/config/axiosServer";
import { AxiosError } from "axios";

export async function forgotPassAction(email: string) {
  try {
    const res = await api.post("/auth/user/forgot/password", {
      email: email,
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

export async function postNewPassAction(payload: object) {
  try {
    const res = await api.post("/auth/user/forgot/password/update", payload);
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
