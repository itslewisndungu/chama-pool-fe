import { AddressForm } from "@/app/member/profile/address/AddressForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { Address } from "@/types/user";
import { redirect } from "next/navigation";
import { getEndpointPath } from "@/lib/utils";

const getAddress = async (username: string, token: string) => {
  const req = new Request(getEndpointPath(`/members/${username}/address`), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (await fetch(req).then(res => res.json())) as Address;
};

export default async function AddressPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

  const address = await getAddress(session.user.username, session.accessToken);

  return <AddressForm address={address} />;
}
