import { InvitedMember } from '@/types/InvitedMember';

export async function inviteMemberToGroup(
  memberDetails: InvitedMember,
  token: string
) {
  const req = new Request('http://localhost:8080/members/invites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(memberDetails),
  });

  return fetch(req);
}
