import { MeetingAttendance } from "@/types/meetings";
import { Attendance } from "@/app/group/meetings/[meetingId]/attendance/Attendance";

const mockData = [
  {
    memberId: 1,
    memberName: "Robert Wolfkisser",
    isPresent: false,
    apology: "I'm sick",
  },
  {
    memberId: 2,
    memberName: "Jill Jailbreaker",
    isPresent: false,
    apology: "No apology",
  },
  {
    memberId: 3,
    memberName: "Henry Silkeater",
    isPresent: true,
  },
  {
    memberId: 4,
    memberName: "Bill Horsefighter",
    isPresent: true,
  },
  {
    memberId: 5,
    memberName: "Jeremy Footviewer",
    isPresent: true,
  },
] satisfies MeetingAttendance[];

const getMeetingAttendance = async (
  meetingId: number
): Promise<MeetingAttendance[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockData), 1000));
};

type Props = {
  params: {
    meetingId: number;
  };
};

export default async function Page({ params: { meetingId } }: Props) {
  const attendance = await getMeetingAttendance(meetingId);

  return <Attendance attendances={attendance} />;
}
