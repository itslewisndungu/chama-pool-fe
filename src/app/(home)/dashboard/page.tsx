import { GroupFinancialSummary } from '@/components/GroupFinancialSummary';

const getData = async () => {
  const data = [
    // {
    //   title: 'Account Balance',
    //   value: '13,456',
    //   diff: 34,
    //   icon: 'coin',
    // },
    {
      title: 'Mothly Revenue',
      value: '4,145',
      icon: 'receipt',
      diff: -13,
    },
    {
      title: 'Montly Expenses',
      icon: 'expense',
      value: '745',
      diff: 18,
    },
  ];

  return data;
};
export default async function Page() {
  const data = await getData();

  return (
    <>
      <p className="text-xl font-bold m-0 text-gray-700">Financial Summary</p>
      <GroupFinancialSummary data={data} />
    </>
  );
}
