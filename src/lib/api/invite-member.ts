import { InvitedMember } from "@/types/InvitedMember";
import { getEndpointPath } from "@/lib/utils";

export async function inviteMemberToGroup(
  memberDetails: InvitedMember,
  token: string
) {
  const req = new Request(getEndpointPath(`/members/invites`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(memberDetails),
  });

  return fetch(req);
}
