import { ApplicationsList } from "@/app/group/loans/applications/applications-list";
import {
  LoanApplication,
  LoanApplicationStatus,
  LoanApprovalStatus,
} from "@/types/loans";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { signIn } from "next-auth/react";
import { getEndpointPath } from "@/lib/utils";

const getApplications = async (token: string): Promise<LoanApplication[]> => {
  const req = new Request(getEndpointPath("/loans/applications"), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await fetch(req);
  return (await res.json()) as LoanApplication[];
};

export default async function ApplicationsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return signIn();
  }

  const applications = await getApplications(session.accessToken);

  return (
    <>
      <h1 className={"mt-0 mb-4"}>Loan applications</h1>
      <ApplicationsList applications={applications} />
    </>
  );
}
