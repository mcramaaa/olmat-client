import { IEventSetting } from "./IEventSetting";

export interface IDashboard {
  eventSetting: IEventSetting;
  successPayment: number;
  allPayment: number;
  successParticipant: number;
  pendingParticipant: number;
}
