import { MeetingAttendance } from "@/types/meetings";
import { Attendance } from "@/app/group/meetings/[meetingId]/attendance/Attendance";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MemberRole } from "@/types/MemberRole";
import { MeetingNotInitiated } from "@/app/group/meetings/[meetingId]/MeetingNotInitiated";

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

  const isChairman = session.user.roles.some(
    role => role === MemberRole.CHAIRMAN
  );

  const attendance = await getMeetingAttendance(meetingId, session.accessToken);

  return (
    <>
      {attendance.length !== 0 ? (
        <Attendance attendances={attendance} meetingId={meetingId} />
      ) : (
        <MeetingNotInitiated meetingId={meetingId} isChairman={isChairman} />
      )}
    </>
  );
}
