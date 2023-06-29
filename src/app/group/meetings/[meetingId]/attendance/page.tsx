import { MeetingAttendance } from "@/types/meetings";
import { Attendance } from "@/app/group/meetings/[meetingId]/attendance/Attendance";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const getMeetingAttendance = async (
  id: number,
  token: string
): Promise<MeetingAttendance[]> => {
  const req = new Request(`http://localhost:8080/meetings/${id}/attendance`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as MeetingAttendance[];
};

type Props = {
  params: {
    meetingId: number;
  };
};

export default async function Page({ params: { meetingId } }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }

  const attendance = await getMeetingAttendance(meetingId, session.accessToken);

  return <Attendance attendances={attendance} meetingId={meetingId} />;
}
