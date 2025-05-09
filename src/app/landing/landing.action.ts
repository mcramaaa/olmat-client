"use server";

import api from "@/config/axiosServer";
import { AxiosError } from "axios";

export async function getParticipantCount(): Promise<{
  data: any;
  error: AxiosError | null;
}> {
  try {
    const res = await api.get("/landing");
    return { data: res.data, error: null };
  } catch (error) {
    return { data: {}, error: error as AxiosError };
  }
}
