import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { RecordMembershipFeesForm } from "@/app/group/members/membership-fees/RecordMembershipFeesForm";

type MembershipFee = {
  memberId: number;
  memberName: string;
  amount: number;
  amountPaid: number;
  status: string;
  balance: number;
};

const getOutstandingMembershipFees = async (token: string) => {
  const req = new Request(
    `http://localhost:8080/members/membership-fees/outstanding`,
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
