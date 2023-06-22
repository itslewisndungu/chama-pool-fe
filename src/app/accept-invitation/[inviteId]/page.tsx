import { InvitedMember } from "@/types/InvitedMember";
import AcceptInvitationForm from "./AcceptInvatationForm";

type Props = {
  params: {
    inviteId: string;
  };
};

async function getInvitedMember(id: string) {
  const req = new Request(`http://localhost:8080/members/invites/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await fetch(req);
  return (await res.json()) as InvitedMember & {
    username: string;
    inviteId: number;
  };
}

export default async function Page({ params }: Props) {
  const invitation = await getInvitedMember(params.inviteId);
  return (
    <main className="grid place-content-center mx-auto">
      <h1>Accept invitation into the group</h1>
      <AcceptInvitationForm invitation={invitation} />
    </main>
  );
}
