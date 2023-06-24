import React from "react";
import { getServerSession } from "next-auth/next";
import MembersTable from "./MembersTable";
import { User } from "@/types/User";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

type Props = {};

const getMembersList = async (token: string) => {
  const req = new Request("http://localhost:8080/members", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await fetch(req);
  return (await res.json()) as User[];
};

export default async function Page({}: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

  const token = session.accessToken;

  let members: User[];

  try {
    members = await getMembersList(token);
  } catch (err) {
    members = [];
  }

  return (
    <section className={"max-w-5xl"}>
      <h1 className={"mt-0"}>Members directory</h1>
      <MembersTable data={members} />
    </section>
  );
}
