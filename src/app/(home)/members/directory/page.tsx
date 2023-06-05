import React from 'react';
import MembersTable from './MembersTable';
import { listAllGroupMembers } from '@/lib/api/list-group-members';
import { User } from '@/types/User';

type Props = {};

const getMembersList = async () => {
  const req = new Request('http://localhost:8080/members', {
    method: 'GET',
  });

  const members: {
    members: User[];
  } = await fetch(req, { next: { revalidate: 10 } })
    .then(res => res.json())
    .catch(console.error);

  return members.members.map(m => {
    return {
      firstName: m.firstName,
      lastName: m.lastName,
      username: m.username,
      phoneNumber: m.phoneNumber,
    };
  });
};

export default async function Page({}: Props) {
  const members = await getMembersList();

  return (
    <section className={'max-w-5xl'}>
      <h1 className={'mt-0'}>Members directory</h1>
      <MembersTable data={members} />
    </section>
  );
}
