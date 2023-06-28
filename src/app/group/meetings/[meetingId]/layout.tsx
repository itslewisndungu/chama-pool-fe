import { ReactNode } from "react";
import { Meeting, MeetingCategory } from "@/types/meetings";
import { getFormattedDate } from "@/lib/utils";
import { MeetingInfoTabs } from "@/app/group/meetings/[meetingId]/meeting-info-tabs";

type Props = {
  children: ReactNode;
  params: {
    meetingId: number;
  };
};

const getMeeting = async (meetingId: number): Promise<Meeting> => {
  const meeting = {
    agenda: "Monthly meeting",
    title: "Monthly meeting",
    date: new Date("12-10-2021"),
    id: meetingId,
    kind: MeetingCategory.MONTHLY_MEETING,
  };

  return new Promise(resolve => setTimeout(() => resolve(meeting), 1000));
};
export default async function MeetingDetailsLayout({
  children,
  params,
}: Props) {
  const meeting = await getMeeting(params.meetingId);

  return (
    <section>
      <h1 className={"mt-0"}>Meeting {params.meetingId} details</h1>
      <div className={"space-y-2 mb-4"}>
        <p className={"m-0"}>
          <span className="text-sm text-gray-700 font-bold">
            Meeting title:
          </span>{" "}
          {meeting.title}
        </p>
        <p className={"m-0"}>
          <span className="text-sm text-gray-700 font-bold">Meeting date:</span>{" "}
          {getFormattedDate(meeting.date)}
        </p>
        <p className={"m-0"}>
          <span className="text-sm text-gray-700 font-bold">Meeting kind:</span>{" "}
          {meeting.kind}
        </p>
        {meeting.agenda ? (
          <p className={"m-0"}>
            <span className="text-sm text-gray-700 font-bold">
              Meeting agenda:
            </span>{" "}
            {meeting.agenda}
          </p>
        ) : null}
      </div>{" "}
      <section className={"m-4"}>
        <MeetingInfoTabs meetingId={params.meetingId} />
        {children}
      </section>
    </section>
  );
}
