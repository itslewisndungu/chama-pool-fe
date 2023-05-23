import React from 'react';
import AcceptInvitationForm from './AcceptInvatationForm';

type Props = {
  params: {
    inviteId: string;
  };
};

export default function Page({ params }: Props) {
  return (
    <main className="grid place-content-center mx-auto">
      <h1>Accept invitation into the group</h1>
      <AcceptInvitationForm />
    </main>
  );
}
