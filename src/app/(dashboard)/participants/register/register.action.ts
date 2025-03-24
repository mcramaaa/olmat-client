"use server";

import { z } from "zod";
import api from "@/config/axiosServer";
import { participantSchema } from "../_components/ParticipantFormV3";
import { AxiosError } from "axios";

export async function postParticipantAction(
  payload: z.infer<typeof participantSchema>[],
  schoolId: number
) {
  const dataPost = payload.map((data) => ({
    name: data.name.toUpperCase(),
    gender: data.gender,
    birth: new Date(data.birth).toISOString(),
    email: data.email,
    phone: data.phone,
  }));
  const filePost = payload.map((data) => ({
    imgs: data.img,
    attachments: data.attachment,
  }));
  try {
    const payloadForm = new FormData();
    payloadForm.append("participants", JSON.stringify(dataPost));
    payloadForm.append("school_id", String(schoolId));
    payloadForm.append("payment_code", "QRIS");
    filePost.forEach((file) => {
      payloadForm.append("imgs", file.imgs);
      payloadForm.append("attachments", file.attachments);
    });

    const res = await api.post("/participant", payloadForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
