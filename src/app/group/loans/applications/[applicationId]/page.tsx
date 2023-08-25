import { ApplicationSummary } from "@/app/group/loans/applications/[applicationId]/application-summary";
import {
  LoanApplication,
  LoanApplicationStatus,
  LoanApprovalStatus,
} from "@/types/loans";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { signIn } from "next-auth/react";
import { getEndpointPath } from "@/lib/utils";

const getLoanApplication = async (applicationId: string, token: string) => {
  const req = new Request(
    getEndpointPath(`/loans/applications/${applicationId}`),
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
