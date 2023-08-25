import { NextOfKinForm } from "@/app/member/profile/kin/NextOfKinForm";
import { authOptions } from "@/lib/auth";
import { NextOfKin } from "@/types/user";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const getKin = async (username: string, token: string) => {
  const req = new Request(`http://localhost:8080/members/${username}/kin`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as NextOfKin;
};

export default async function NextOfKinPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

  const kin = await getKin(session.user.username, session.accessToken);

  return <NextOfKinForm kin={kin} />;
}
