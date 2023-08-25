import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MemberRole } from "@/types/MemberRole";
import { getMeetingAttendance } from "@/lib/api/utils";
import { Attendance } from "@/components/meetings/Attendance";
import { MeetingNotInitiated } from "@/components/meetings/MeetingNotInitiated";

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

  const isAdmin = session.user.roles.some(
    role =>
      role === MemberRole.TREASURER ||
      role === MemberRole.SECRETARY ||
      isChairman
  );

  const attendance = await getMeetingAttendance(meetingId, session.accessToken);

  return (
    <>
      {attendance.length !== 0 ? (
        <Attendance
          attendances={attendance}
          meetingId={meetingId}
          isAdmin={isAdmin}
        />
      ) : (
        <MeetingNotInitiated meetingId={meetingId} isChairman={isChairman} />
      )}
    </>
  );
}
