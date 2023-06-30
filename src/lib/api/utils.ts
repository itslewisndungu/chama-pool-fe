import { Meeting, MeetingAttendance } from "@/types/meetings";

export const getMeetings = async (token: string) => {
  const req = new Request(`http://localhost:8080/meetings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as Meeting[];
};

export const getMeetingAttendance = async (id: number, token: string) => {
  const req = new Request(`http://localhost:8080/meetings/${id}/attendance`, {
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
  const req = new Request(`http://localhost:8080/meetings/${meetingId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as Meeting;
};
