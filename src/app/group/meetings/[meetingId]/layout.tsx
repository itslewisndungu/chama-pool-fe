import { ReactNode } from "react";
import { Meeting } from "@/types/meetings";
import { getEndpointPath, getFormattedDate } from "@/lib/utils";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MeetingInfoTabs } from "@/components/meetings/meeting-info-tabs";
import DownloadReportButton from "@/components/reports/DownloadReportButton";

type Props = {
  children: ReactNode;
  params: {
    meetingId: number;
  };
};

const getMeeting = async (
  meetingId: number,
  token: string
): Promise<Meeting> => {
  const req = new Request(getEndpointPath(`/meetings/${meetingId}`), {
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

  const meeting = await getMeeting(params.meetingId, session.accessToken);

  return (
    <section>
      <div className={"flex justify-between items-center"}>
        <h1 className={"mt-0"}>Meeting {params.meetingId} details</h1>
        <DownloadReportButton
          token={session.accessToken}
          link={getEndpointPath(`/meetings/${params.meetingId}/report`)}
        />
      </div>
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
