import { GroupFinancialSummary } from "@/components/dashboard/GroupFinancialSummary";
import { GroupLoansSummary } from "@/components/dashboard/LoanSummary";
import { ScheduledMeetings } from "@/components/dashboard/ScheduledMeetings";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  GroupAccountSummary,
  LoanSummary,
  MeetingsSummary,
} from "@/types/dashboard";
import { getEndpointPath } from "@/lib/utils";

const getAccountSummary = async (token: string) => {
  const req = new Request(getEndpointPath(`/chama/account-summary`), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as GroupAccountSummary;
};

const getLoansSummary = async (token: string) => {
  const req = new Request(getEndpointPath(`/chama/loans-summary`), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as LoanSummary;
};

const getMeetingsSummary = async (token: string) => {
  const req = new Request(getEndpointPath(`/chama/meetings-summary`), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as MeetingsSummary;
};

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }

  const [accountSummary, loansSummary, meetingsSummary] = await Promise.all([
    getAccountSummary(session.accessToken),
    getLoansSummary(session.accessToken),
    getMeetingsSummary(session.accessToken),
  ]);

  return (
    <>
      <h2 className="text-xl font-bold m-0 text-gray-700">Financial Summary</h2>
      <GroupFinancialSummary summary={accountSummary} />
      <GroupLoansSummary summary={loansSummary} />
      <h2 className="text-xl font-bold m-0 text-gray-700">Meetings</h2>
      <ScheduledMeetings summary={meetingsSummary} />
    </>
  );
}
