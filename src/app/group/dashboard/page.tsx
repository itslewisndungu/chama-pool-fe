import { GroupFinancialSummary } from "@/components/dashboard/GroupFinancialSummary";
import { GroupLoansSummary } from "@/components/dashboard/LoanSummary";
import { ScheduledMeetings } from "@/components/dashboard/ScheduledMeetings";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

const getAccountSummary = async (token: string) => {
  type AccountSummary = {
    accountBalance: number;
    totalIncome: number;
    totalExpenses: number;
  };

  const req = new Request("http://localhost:8080/chama/account-summary", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as AccountSummary;
};

const getLoansSummary = async (token: string) => {
  type LoanSummary = {
    issuedLoans: number;
    totalAmountBorrowed: number;
    totalAmountRepaid: number;
    activeLoans: number;
    overdueLoans: number;
    repaidLoans: number;
    pendingLoans: number;
    loanApplications: number;
  };

  const req = new Request("http://localhost:8080/chama/loans-summary", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as LoanSummary;
};

const getMeetingsSummary = async (token: string) => {
  type MeetingsSummary = {
    meetings: number;
    scheduledMeetings: number;
    totalContributions: number;
  };

  const req = new Request("http://localhost:8080/chama/meetings-summary", {
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
