"use server";

import api from "@/config/axiosServer";
import { IParticipant } from "@/interfaces/IParticipant";
import { IPayment } from "@/interfaces/IPayments";
import { AxiosError } from "axios";

export async function getTransactionAction(page: number, limit: number) {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const res = await api.get(`/payment?page=${page}&limit=${limit}`);
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

export async function getInvAction(invoice: string) {
  try {
    const res = await api.get(`/payment/invoice/${invoice}`);
    const participantData = res.data.participants.map((data: IParticipant) => ({
      name: data.name,
      gender: data.gender,
      birth: data.birth,
    }));
    const paymentData: IPayment = {
      id: res.data.id,
      invoice: res.data.invoice,
      code: res.data.code,
      amount: res.data.amount,
      fee: res.data.fee,
      totalAmount: res.data.total_amount,
      participantAmount: res.data.participant_amounts,
      status: res.data.status,
      expiredAt: res.data.expired_at,
      createdAt: res.data.audit_trail.created_at,
      action: {
        id: res.data.action.id,
        qrString: res.data.action.qr_string,
      },
    };
    return {
      success: true,
      participants: participantData,
      data: paymentData,
      error: null,
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      success: true,
      data: null,
      error: err,
    };
  }
}
