import { ReactNode } from "react";
import { Meeting, MeetingCategory } from "@/types/meetings";
import { getFormattedDate } from "@/lib/utils";
import { MeetingInfoTabs } from "@/app/group/meetings/[meetingId]/meeting-info-tabs";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Badge } from "@mantine/core";

type Props = {
  children: ReactNode;
  params: {
    meetingId: number;
  };
};

const getMockMeeting = async (meetingId: number): Promise<Meeting> => {
  const meeting = {
    agenda: "Monthly meeting",
    title: "Monthly meeting",
    date: new Date("12-10-2021"),
    id: meetingId,
    category: MeetingCategory.MONTHLY_MEETING,
  };

  return new Promise(resolve => setTimeout(() => resolve(meeting), 1000));
};

const getMeeting = async (
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

export default async function MeetingDetailsLayout({
  children,
  params,
}: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

  // const meeting = await getMockMeeting(params.meetingId);
  const meeting = await getMeeting(params.meetingId, session.accessToken);

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
        <p className={"m-0 capitalize"}>
          <span className="text-sm text-gray-700 font-bold">Meeting kind:</span>{" "}
          {meeting.category.split("_").join(" ").toLowerCase()}
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
