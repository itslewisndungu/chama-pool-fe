import { PersonalInfoForm } from "@/app/member/profile/personal-information/PersonalInfoForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { UserProfile } from "@/types/user";
import { redirect } from "next/navigation";
import { getEndpointPath } from "@/lib/utils";

const getPersonalInfo = async (username: string, token: string) => {
  const req = new Request(getEndpointPath(`/members/${username}/profile`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as UserProfile;
};

export default async function PersonalInfoPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

  const user = await getPersonalInfo(
    session.user.username,
    session.accessToken
  );

  return <PersonalInfoForm user={user} />;
}
