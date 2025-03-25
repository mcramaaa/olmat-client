import api from "@/config/axiosServer";
import { AxiosError } from "axios";

export async function getParticipantAction() {
  try {
    const res = await api.get("/participant?page=1&limit=10");
    return { success: true, data: res.data, error: null };
  } catch (error) {
    const err = error as AxiosError;
    return { success: true, data: null, error: err };
  }
}

export async function getParticipantIdAction(id: string) {
  try {
    const res = await api.get(`/participant/${id}`);
    return { success: true, data: res.data, error: null };
  } catch (error) {
    const err = error as AxiosError;
    return { success: true, data: null, error: err };
  }
}
