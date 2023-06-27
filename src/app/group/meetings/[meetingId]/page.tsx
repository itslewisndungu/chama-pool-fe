import { AttendanceTable } from "@/app/group/meetings/[meetingId]/AttendanceTable";
import { MeetingAttendance } from "@/types/meetings";

type Params = {
  params: {
    meetingId: number;
  };
};

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
export default async function MeetingInfoPage({ params }: Params) {
  return (
    <>
      <h1 className={"m-0"}>Meeting {params.meetingId} details</h1>
      <AttendanceTable attendances={mockData} />
    </>
  );
}
