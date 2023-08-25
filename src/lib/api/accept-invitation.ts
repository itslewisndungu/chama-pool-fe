import { getEndpointPath } from "@/lib/utils";

export async function acceptMemberInvitation(
  memberDetails: {
    username: string;
    password: string;
  },
  inviteId: number
) {
  const req = new Request(
    getEndpointPath(`/members/invites/${inviteId}/accept`),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberDetails),
    }
  );

  return fetch(req);
}
