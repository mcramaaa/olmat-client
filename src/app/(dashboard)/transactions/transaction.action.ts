"use server";

import api from "@/config/axiosServer";
import { IPayment } from "@/interfaces/IPayments";
import { AxiosError } from "axios";

export async function getTransactionAction() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const res = await api.get(`/payment?page=1&limit=10`);
    const rawData: IPayment[] = res.data.data.map((item: any) => ({
      id: item.id,
      invoice: item.invoice,
      code: item.code,
      amount: item.amount,
      totalAmount: item.total_amount,
      participantAmount: item.participant_amounts,
      status: item.status,
      expiredAt: item.expired_at,
      fee: item.fee,
    }));
    console.log("reaaww", rawData);

    return {
      success: true,
      data: rawData,
      metaData: res.data.metadata,
      error: null,
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      success: false,
      data: null,
      error: err,
    };
  }
}
