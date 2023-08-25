import { AvatarCard } from "@/components/members/AvatarCard";
import { ContributionsCard } from "@/components/members/ContributionsCard";
import { MemberLoanSummary, MemberMeetingSummary } from "@/types/dashboard";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProfileLoansCard } from "@/components/members/ProfileLoansCard";
import { UserProfile } from "@/types/user";

const getMemberProfile = async (username: string, token: string) => {
  const req = new Request(`http://localhost:8080/members/${username}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as UserProfile;
};

const getMemberLoansSummary = async (username: string, token: string) => {
  const req = new Request(
    `http://localhost:8080/members/${username}/loans-summary`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await fetch(req).then(res => res.json())) as MemberLoanSummary;
};

const getMeetingsSummary = async (username: string, token: string) => {
  const req = new Request(
    `http://localhost:8080/members/${username}/meetings-summary`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await fetch(req).then(res => res.json())) as MemberMeetingSummary;
};

type Props = {
  params: {
    username: string;
  };
};

export default async function MemberProfilePage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }

  const [loansSummary, meetingsSummary, profile] = await Promise.all([
    getMemberLoansSummary(params.username, session.accessToken),
    getMeetingsSummary(params.username, session.accessToken),
    getMemberProfile(params.username, session.accessToken),
  ]);

  return (
    <>
      <h1 className="m-0">Member Profile</h1>
      <section className={"flex"}>
        <AvatarCard profile={profile} />
        <div className="flex-1 m-4 space-y-4">
          <ContributionsCard summary={meetingsSummary} />
          <ProfileLoansCard summary={loansSummary} />
        </div>
      </section>
    </>
  );
}
