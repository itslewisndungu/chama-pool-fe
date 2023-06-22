import { NoActiveApplication } from "@/app/(home)/loans/applications/pending-application/no-active-application";
import { ActiveApplicationSummary } from "@/app/(home)/loans/applications/pending-application/application-summary";

type LoanApplication = {};

const getActiveLoanApplication = async (): Promise<
  LoanApplication | undefined
> => {
  return new Promise(resolve => setTimeout(() => resolve({}), 2000));
};

export default async function PendingApplicationPage() {
  const loanApplication = await getActiveLoanApplication();

  return (
    <>
      {loanApplication ? <ActiveApplicationSummary /> : <NoActiveApplication />}
    </>
  );
}
