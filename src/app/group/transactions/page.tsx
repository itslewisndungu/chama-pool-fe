import { Transaction } from "@/types/transactions";
import { TransactionsList } from "@/app/group/transactions/TransactionsList";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DownloadReportButton from "@/components/reports/DownloadReportButton";

const getTransactions = async (token: string) => {
  const req = new Request("http://localhost:8080/transactions", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as Transaction[];
};

export default async function TransactionsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }

  const transactions = await getTransactions(session.accessToken);

  return (
    <>
      <div className={"flex justify-between items-center"}>
        <h1>Transactions</h1>
        <DownloadReportButton
          token={session.accessToken}
          link={"http://localhost:8080/transactions/report"}
        />
      </div>
      <TransactionsList transactions={transactions} />
    </>
  );
}
