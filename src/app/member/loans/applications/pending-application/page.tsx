import { NoActiveApplication } from "@/app/member/loans/applications/pending-application/no-active-application";
import { ActiveApplicationSummary } from "@/app/member/loans/applications/pending-application/application-summary";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LoanApplication } from "@/types/loans";
import { getEndpointPath } from "@/lib/utils";

const mockGetActiveLoanApplication = async (): Promise<
  LoanApplication | undefined
> => {
  return new Promise(resolve => setTimeout(() => resolve(undefined), 2000));
};

const getActiveLoanApplication = async (
  token: string
): Promise<LoanApplication | undefined> => {
  const request = new Request(getEndpointPath(`/loans/applications/active`), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await fetch(request);

  if (res.ok) {
    return (await res.json()) as LoanApplication;
  } else {
    return undefined;
  }
};

export default async function PendingApplicationPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }

  const application = await getActiveLoanApplication(session.accessToken);

  return (
    <>
      {application ? (
        <ActiveApplicationSummary application={application} />
      ) : (
        <NoActiveApplication />
      )}
    </>
  );
}
