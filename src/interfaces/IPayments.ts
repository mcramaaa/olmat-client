export interface IPayment {
  id?: number;
  invoice: string;
  code: string;
  amount: number;
  totalAmount: number;
  participantAmount: number;
  status: string;
}
