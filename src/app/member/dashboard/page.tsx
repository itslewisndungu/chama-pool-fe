import { GroupFinancialSummary } from "@/components/dashboard/GroupFinancialSummary";
import {
  GroupAccountSummary,
  MemberLoanSummary,
  MemberMeetingSummary,
} from "@/types/dashboard";
import { MemberMeetingsSummary } from "@/components/dashboard/MemberMeetingsSummary";
import { MemberLoansSummary } from "@/components/dashboard/MemberLoansSummary";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getEndpointPath } from "@/lib/utils";

const getGroupFinancialSummary = async (token: string) => {
  const req = new Request(getEndpointPath(`/chama/account-summary`), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as GroupAccountSummary;
};

const getMeetingsSummary = async (token: string) => {
  const req = new Request(getEndpointPath(`/member/meetings-summary`), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as MemberMeetingSummary;
};

const getMemberLoansSummary = async (token: string) => {
  const req = new Request(getEndpointPath(`/member/loans-summary`), {
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
