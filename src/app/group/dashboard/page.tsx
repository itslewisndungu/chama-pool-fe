import { GroupFinancialSummary } from "@/components/dashboard/GroupFinancialSummary";
import { GroupLoansSummary } from "@/components/dashboard/LoanSummary";

const getData = async () => {
  return [
    // {
    //   title: 'Account Balance',
    //   value: '13,456',
    //   diff: 34,
    //   icon: 'coin',
    // },
    {
      title: "Monthly Revenue",
      value: "4,145",
      icon: "receipt",
      diff: -13,
    },
    {
      title: "Monthly Expenses",
      icon: "expense",
      value: "745",
      diff: 18,
    },
  ];
};
export default async function Page() {
  const data = await getData();

  return (
    <>
      <h1 className="text-xl font-bold m-0 text-gray-700">Financial Summary</h1>
      <GroupFinancialSummary data={data} />
      <GroupLoansSummary />
    </>
  );
}
