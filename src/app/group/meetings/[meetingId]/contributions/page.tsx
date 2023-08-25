import { MeetingContribution } from "@/types/meetings";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { MemberRole } from "@/types/MemberRole";
import { MeetingNotInitiated } from "@/components/meetings/MeetingNotInitiated";
import ContributionsList from "@/components/meetings/ContributionsList";
import { getEndpointPath } from "@/lib/utils";

type Props = {
  params: {
    meetingId: number;
  };
};

const getContributions = async (id: number, token: string) => {
  const req = new Request(getEndpointPath(`/meetings/${id}/contributions`), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as MeetingContribution[];
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
  const contributions = await getContributions(meetingId, session.accessToken);

  return (
    <>
      {contributions.length !== 0 ? (
        <ContributionsList
          contributions={contributions}
          meetingId={meetingId}
          isAdmin={isAdmin}
        />
      ) : (
        <MeetingNotInitiated meetingId={meetingId} isChairman={isChairman} />
      )}
    </>
  );
}
