import { InvitedMember } from "@/types/InvitedMember";
import AcceptInvitationForm from "./AcceptInvatationForm";
import { InvitedMember } from "@/types/user";
import {getEndpointPath} from "@/lib/utils";

type Props = {
  params: {
    inviteId: string;
  };
};

async function getInvitedMember(id: string) {
  const path = getEndpointPath(`/members/invites/${id}`)
  const req = new Request(path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
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
