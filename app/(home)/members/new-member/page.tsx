import { NewMemberForm } from '@/app/(home)/members/new-member/NewMemberForm';

export default function Page() {
  return (
    <section>
      <h1 className="mt-0">Invite a new member</h1>
      <NewMemberForm />
    </section>
  );
}