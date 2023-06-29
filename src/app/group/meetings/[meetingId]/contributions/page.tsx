import { MeetingAttendance, MeetingContribution } from "@/types/meetings";
import ContributionsList from "@/app/group/meetings/[meetingId]/contributions/ContributionsList";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

type Props = {
  params: {
    meetingId: number;
  };
};

const getContributions = async (id: number, token: string) => {
  const req = new Request(
    `http://localhost:8080/meetings/${id}/contributions`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await fetch(req).then(res => res.json())) as MeetingContribution[];
};

export default async function Page({ params: { meetingId } }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }

  const contributions = await getContributions(meetingId, session.accessToken);

  return (
    <ContributionsList contributions={contributions} meetingId={meetingId} />
  );
}
