"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const disburseLoan = async (loanId: number) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const req = new Request(`http://localhost:8080/loans/${loanId}/disburse`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  const res = await fetch(req);
  return res;
};

export const recordLoanInstallment = async (loanId: number, amount: number) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const req = new Request(
    `http://localhost:8080/loans/${loanId}/installments`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    }
  );

  const res = await fetch(req);
  return res;
};
