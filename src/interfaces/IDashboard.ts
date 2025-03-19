import { IEventSetting } from "./IEventSetting";

export interface IDashboard {
  eventSetting: IEventSetting;
  successPayment: number;
  pendingPayment: number;
  successParticipant: number;
  pendingParticipant: number;
}
