import React from 'react';
import MembersTable from './MembersTable';
import { User } from '@/types/User';

type Props = {};

const getMembersList = async () => {
  const req = new Request('http://localhost:8080/members', {
    method: 'GET',
  });

  const res = await fetch(req, { next: { revalidate: 10 } });
  const members = (await res.json()) as User[];

  return members.map(m => {
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
