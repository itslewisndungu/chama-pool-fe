import { ApplicationsList } from "@/app/group/loans/applications/applications-list";
import {
  LoanApplication,
  LoanApplicationStatus,
  LoanApprovalStatus,
} from "@/types/loans";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { signIn } from "next-auth/react";

const mockGetApplications = async (): Promise<LoanApplication[]> => {
  const applications: LoanApplication[] = [
    {
      id: 1,
      applicationDate: new Date(),
      memberId: 1,
      memberName: "John Doe",
      memberPhoneNumber: "0700000000",
      amount: 10000,
      status: LoanApplicationStatus.AWAITING_APPROVAL,
      reasonForLoan: "Kujibamba",
      approval: {
        chairman: {
          status: LoanApprovalStatus.AWAITING_APPROVAL,
          message: "",
        },
        treasurer: {
          status: LoanApprovalStatus.AWAITING_APPROVAL,
          message: "",
        },
        secretary: {
          status: LoanApprovalStatus.AWAITING_APPROVAL,
          message: "",
        },
      },
    },
    {
      id: 2,
      applicationDate: new Date(),
      memberId: 2,
      memberName: "Jane Doe",
      memberPhoneNumber: "0700000000",
      amount: 10000,
      status: LoanApplicationStatus.APPROVED,
      reasonForLoan: "Kujibamba",
      approval: {
        chairman: {
          status: LoanApprovalStatus.APPROVED,
          message: "",
        },
        treasurer: {
          status: LoanApprovalStatus.APPROVED,
          message: "",
        },
        secretary: {
          status: LoanApprovalStatus.APPROVED,
          message: "",
        },
      },
    },
    {
      id: 3,
      applicationDate: new Date(),
      memberId: 3,
      memberName: "John Doe",
      memberPhoneNumber: "0700000000",
      amount: 10000,
      status: LoanApplicationStatus.REJECTED,
      reasonForLoan: "Kujibamba",
      approval: {
        chairman: {
          status: LoanApprovalStatus.REJECTED,
          message: "",
        },
        treasurer: {
          status: LoanApprovalStatus.REJECTED,
          message: "",
        },
        secretary: {
          status: LoanApprovalStatus.REJECTED,
          message: "",
        },
      },
    },
  ];

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(applications);
    }, 1000);
  });
};

const getApplications = async (token: string): Promise<LoanApplication[]> => {
  const req = new Request("http://localhost:8080/loans/applications", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await fetch(req);
  return (await res.json()) as LoanApplication[];
};

export default async function ApplicationsPage() {
  // const applications = await mockGetApplications();
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
