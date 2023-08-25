import { MeetingAttendance } from "@/types/meetings";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MeetingNotInitiated } from "@/components/meetings/MeetingNotInitiated";
import { Attendance } from "@/components/meetings/Attendance";

const getMeetingAttendance = async (id: number, token: string) => {
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

  return (
    <>
      {attendance.length !== 0 ? (
        <Attendance
          attendances={attendance}
          meetingId={meetingId}
          isAdmin={false}
        />
      ) : (
        <MeetingNotInitiated meetingId={meetingId} isChairman={false} />
      )}
    </>
  );
}
