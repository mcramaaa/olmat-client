interface IActionPayment {
  id: string;
  qrString: string;
}

export interface IPayment {
  id?: number;
  invoice: string;
  code: string;
  amount: number;
  totalAmount: number;
  fee: number;
  participantAmount: number;
  status: string;
  expiredAt: string;
  createdAt: string;
  action?: IActionPayment;
}
