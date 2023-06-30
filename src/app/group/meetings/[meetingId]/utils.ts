import { Meeting } from "@/types/meetings";

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
