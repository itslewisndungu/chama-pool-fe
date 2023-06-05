import { InvitedMember } from '@/types/InvitedMember';
import AcceptInvitationForm from './AcceptInvatationForm';
import { inviteMemberToGroup } from '@/lib/api/invite-member';
import { acceptMemberInvitation } from '@/lib/api/accept-invitation';
import { useRouter } from 'next/navigation';

type Props = {
  params: {
    inviteId: string;
  };
};

async function getInvitedMember(id: string) {
  const req = new Request(`http://localhost:8080/members/invites/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const user: {
    invitedMember: InvitedMember & { username: string; inviteId: number };
  } = await fetch(req)
    .then(res => res.json())
    .catch(console.error);

  console.log(user);
  return user;
}

export default async function Page({ params }: Props) {
  const invitation = await getInvitedMember(params.inviteId);
  return (
    <main className="grid place-content-center mx-auto">
      <h1>Accept invitation into the group</h1>
      <AcceptInvitationForm invitation={invitation.invitedMember} />
    </main>
  );
}
