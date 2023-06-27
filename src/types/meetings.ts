export type Meeting = {
  id: number;
  title: string;
  date: string;
  agenda?: string;
  attendees?: number;
  kind: MeetingCategory;
};

export enum MeetingCategory {
  WELFARE = "WELFARE",
  EMERGENCY = "EMERGENCY",
  MONTHLY_MEETING = "MONTHLY_MEETING",
}
