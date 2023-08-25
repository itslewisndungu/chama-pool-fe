import { LoanApplication } from "@/types/loans";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ApplicationsList } from "@/app/group/loans/applications/applications-list";

const retrieveLoanApplications = async (token: string) => {
  const req = new Request(
    "http://localhost:8080/loans/applications/my-applications",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await fetch(req).then(res => res.json())) as LoanApplication[];
};
export default async function PastApplicationsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }

  const applications = await retrieveLoanApplications(session.accessToken);

  return <ApplicationsList applications={applications} />;
}
