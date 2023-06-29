export type Meeting = {
  id: number;
  title: string;
  date: Date;
  agenda?: string;
  attendees?: number;
  category: MeetingCategory;
};

export enum MeetingCategory {
  WELFARE = "WELFARE",
  EMERGENCY = "EMERGENCY",
  MONTHLY_MEETING = "MONTHLY_MEETING",
}

export type MeetingAttendance = {
  memberId: number;
  memberName: string;
  isPresent: boolean;
  apology?: string;
};

export type MeetingContribution = {
  memberId: number;
  memberName: string;
  amount: number;
};
