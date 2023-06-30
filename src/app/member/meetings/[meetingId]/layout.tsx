import { ReactNode } from "react";
import { getFormattedDate } from "@/lib/utils";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MeetingInfoTabs } from "@/components/meetings/meeting-info-tabs";
import { getMeeting } from "@/lib/api/utils";

type Props = {
  children: ReactNode;
  params: {
    meetingId: number;
  };
};

export default async function MeetingDetailsLayout({
  children,
  params,
}: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

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
      </div>

      <section className={"m-4"}>
        <MeetingInfoTabs meetingId={params.meetingId} />
        {children}
      </section>
    </section>
  );
}
