import { Meeting, MeetingAttendance } from "@/types/meetings";
import { Loan } from "@/types/loans";
import { getEndpointPath } from "@/lib/utils";

export const getMeetings = async (token: string) => {
  const req = new Request(getEndpointPath(`/meetings`), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as Meeting[];
};

export const getMeetingAttendance = async (id: number, token: string) => {
  const req = new Request(getEndpointPath(`/meetings/${id}/attendance`), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as MeetingAttendance[];
};

export const getMeeting = async (
  meetingId: number,
  token: string
): Promise<Meeting> => {
  const req = new Request(getEndpointPath(`/meetings/${meetingId}`), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as Meeting;
};

export const getLoan = async (token: string, loanId: number) => {
  const req = new Request(getEndpointPath(`/loans/${loanId}`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as Loan;
};
