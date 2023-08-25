import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { RecordMembershipFeesForm } from "@/app/group/deposits/membership-fees/RecordMembershipFeesForm";
import { getEndpointPath } from "@/lib/utils";

type MembershipFee = {
  memberId: number;
  memberName: string;
  amount: number;
  amountPaid: number;
  status: string;
  balance: number;
};

const getMockOutstandingMembershipFees = async (token: string) => {
  const data: MembershipFee[] = [
    {
      memberId: 1,
      memberName: "Simon Ndungu",
      amount: 1000,
      amountPaid: 500,
      status: "Paid",
      balance: 500,
    },
    {
      memberId: 2,
      memberName: "Simon Ndungu",
      amount: 1000,
      amountPaid: 500,
      status: "Paid",
      balance: 500,
    },
    {
      memberId: 3,
      memberName: "Simon Ndungu",
      amount: 1000,
      amountPaid: 500,
      status: "Paid",
      balance: 500,
    },
  ];

  return new Promise<MembershipFee[]>(resolve => {
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
};

const getOutstandingMembershipFees = async (token: string) => {
  const req = new Request(
    getEndpointPath(`/members/membership-fees/outstanding`),
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (await fetch(req).then(res => res.json())) as MembershipFee[];
};

export default async function RecordMembershipFees() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

  const outstandingMembershipFees = await getOutstandingMembershipFees(
    session.accessToken
  );

  return (
    <>
      <RecordMembershipFeesForm fees={outstandingMembershipFees} />
    </>
  );
}
