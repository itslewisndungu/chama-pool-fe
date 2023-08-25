import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { OccupationForm } from "@/app/member/profile/occupation/OccupationForm";
import { Occupation } from "@/types/user";
import { getEndpointPath } from "@/lib/utils";

const getOccupation = async (username: string, token: string) => {
  const req = new Request(getEndpointPath(`/members/${username}/occupation`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as Occupation;
};

export default async function OccupationPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

  const occupation = await getOccupation(
    session.user.username,
    session.accessToken
  );

  return <OccupationForm occupation={occupation} />;
}
