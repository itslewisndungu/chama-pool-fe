import { NoActiveApplication } from "@/app/group/loans/applications/[applicationId]/no-active-application";
import { ActiveApplicationSummary } from "@/app/group/loans/applications/[applicationId]/application-summary";
import {
  LoanApplication,
  LoanApplicationStatus,
  LoanApprovalStatus,
} from "@/types/loans";

const getLoanApplication = async (
  applicationId: string
): Promise<LoanApplication | undefined> => {
  return new Promise(resolve =>
    setTimeout(
      () =>
        resolve({
          id: 1,
          applicationDate: new Date(),
          memberId: 1,
          memberName: "John Doe",
          memberPhoneNumber: "0700000000",
          amount: 10000,
          reasonForApplication: "To buy a car",
          status: LoanApplicationStatus.AWAITING_APPROVAL,
          approvals: {
            chairman: {
              status: LoanApprovalStatus.AWAITING_APPROVAL,
            },
            treasurer: {
              status: LoanApprovalStatus.APPROVED,
              message: "Go gerrit girls",
            },
            secretary: {
              status: LoanApprovalStatus.AWAITING_APPROVAL,
            },
          },
        }),
      2000
    )
  );
};

export default async function PendingApplicationPage({
  params,
}: {
  params: { applicationId: string };
}) {
  const loanApplication = await getLoanApplication(params.applicationId);

  return (
    <>
      {loanApplication ? (
        <ActiveApplicationSummary application={loanApplication} />
      ) : (
        <NoActiveApplication applicationId={params.applicationId} />
      )}
    </>
  );
}
