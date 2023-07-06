import { ApplicationSummary } from "@/app/group/loans/applications/[applicationId]/application-summary";
import {
  LoanApplication,
  LoanApplicationStatus,
  LoanApprovalStatus,
} from "@/types/loans";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { signIn } from "next-auth/react";

const mockGetLoanApplication = async (
  applicationId: number
): Promise<LoanApplication | undefined> => {
  return new Promise(resolve =>
    setTimeout(
      () =>
        resolve({
          id: applicationId,
          applicationDate: new Date(),
          memberId: 1,
          memberName: "John Doe",
          memberPhoneNumber: "0700000000",
          amount: 10000,
          reasonForLoan: "To buy a car",
          status: LoanApplicationStatus.AWAITING_APPROVAL,
          approval: {
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

const getLoanApplication = async (applicationId: string, token: string) => {
  const req = new Request(
    `http://localhost:8080/loans/applications/${applicationId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await fetch(req).then(res => res.json())) as LoanApplication;
};
export default async function PendingApplicationPage({
  params,
}: {
  params: { applicationId: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return signIn();
  }

  // const loanApplication = await mockGetLoanApplication(params.applicationId);
  const loanApplication = await getLoanApplication(
    params.applicationId,
    session.accessToken
  );

  return (
    <>
      {loanApplication ? (
        <ApplicationSummary application={loanApplication} />
      ) : (
        <section className={"grid place-content-center mt-16"}>
          <p className={"text-xl md:text-2xl font-light text-gray-800"}>
            Application with ID {params.applicationId} not found
          </p>
        </section>
      )}
    </>
  );
}
