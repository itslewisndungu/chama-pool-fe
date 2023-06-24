import { ApplicationsList } from "@/app/group/loans/applications/applications-list";
import {
  LoanApplication,
  LoanApplicationStatus,
  LoanApprovalStatus,
} from "@/types/loans";

const getApplications = async (): Promise<LoanApplication[]> => {
  const applications: LoanApplication[] = [
    {
      id: 1,
      applicationDate: new Date(),
      memberId: 1,
      memberName: "John Doe",
      memberPhoneNumber: "0700000000",
      amount: 10000,
      status: LoanApplicationStatus.AWAITING_APPROVAL,
      reasonForApplication: "Kujibamba",
      approvals: {
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
      reasonForApplication: "Kujibamba",
      approvals: {
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
      reasonForApplication: "Kujibamba",
      approvals: {
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

export default async function ApplicationsPage() {
  const applications = await getApplications();

  return (
    <>
      <h1 className={"mt-0 mb-4"}>Loan applications</h1>
      <ApplicationsList applications={applications} />
    </>
  );
}
