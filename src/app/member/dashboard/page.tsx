import { GroupFinancialSummary } from "@/components/dashboard/GroupFinancialSummary";
import {
  GroupAccountSummary,
  MemberLoanSummary,
  MemberMeetingSummary,
} from "@/types/dashboard";
import { MemberMeetingsSummary } from "@/app/member/dashboard/MemberMeetingsSummary";
import { MemberLoansSummary } from "@/app/member/dashboard/MemberLoansSummary";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const getGroupFinancialSummary = async (token: string) => {
  const req = new Request("http://localhost:8080/chama/account-summary", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as GroupAccountSummary;
};

const getMeetingsSummary = async (token: string) => {
  const req = new Request("http://localhost:8080/member/meetings-summary", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as MemberMeetingSummary;
};

const getMemberLoansSummary = async (token: string) => {
  const req = new Request("http://localhost:8080/member/loans-summary", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as MemberLoanSummary;
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }
  const [financialSummary, meetingsSummary, loansSummary] = await Promise.all([
    getGroupFinancialSummary(session.accessToken),
    getMeetingsSummary(session.accessToken),
    getMemberLoansSummary(session.accessToken),
  ]);

  return (
    <>
      <h2 className="text-xl font-bold m-0 text-gray-700">Financial Summary</h2>
      <GroupFinancialSummary summary={financialSummary} />
      <MemberLoansSummary summary={loansSummary} />
      <h2 className="text-xl font-bold m-0 text-gray-700">Meetings</h2>
      <MemberMeetingsSummary summary={meetingsSummary} />
    </>
  );
}
