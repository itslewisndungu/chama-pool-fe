import React from "react";
import { getServerSession } from "next-auth/next";
import { Member } from "@/types/user";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DownloadReportButton from "@/components/reports/DownloadReportButton";
import MembersTable from "@/components/members/MembersTable";
import { getEndpointPath } from "@/lib/utils";

type Props = {};

const getMembersList = async (token: string) => {
  const req = new Request(getEndpointPath(`/members`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await fetch(req);
  return (await res.json()) as { members: Member[] };
};

export default async function Page({}: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

  const token = session.accessToken;
  const { members } = await getMembersList(token);

  return (
    <section className={"max-w-5xl"}>
      <div className={"mb-4 flex justify-between items-center"}>
        <h1 className={"m-0"}>Members directory</h1>
        <DownloadReportButton
          token={session.accessToken}
          link={getEndpointPath(`/reports/group-members`)}
        />
      </div>
      <MembersTable data={members} />
    </section>
  );
}
