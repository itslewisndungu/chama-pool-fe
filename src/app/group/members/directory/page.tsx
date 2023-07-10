import React from "react";
import { getServerSession } from "next-auth/next";
import MembersTable from "./MembersTable";
import { UserProfile } from "@/types/user";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DownloadReportButton from "@/components/reports/DownloadReportButton";

type Props = {};

const getMembersList = async (token: string) => {
  const req = new Request("http://localhost:8080/members", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await fetch(req);
  return (await res.json()) as {members: UserProfile[]};
};

export default async function Page({}: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

  const token = session.accessToken;

  let members: UserProfile[];

  try {
    const res = await getMembersList(token);
    members = res.members;
  } catch (err) {
    members = [];
  }

  return (
    <section className={"max-w-5xl"}>
      <div className={"mb-4 flex justify-between items-center"}>
        <h1 className={"m-0"}>Members directory</h1>
        <DownloadReportButton
          token={session.accessToken}
          link={`http://localhost:8080/reports/group-members`}
        />
      </div>
      <MembersTable data={members} />
    </section>
  );
}
