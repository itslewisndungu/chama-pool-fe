import { LoginForm } from '@/app/login/LoginForm';
import { Paper } from '@mantine/core';

export default function Page() {
  return (
    <section className={'mt-20 grid place-content-center mx-auto'}>
      <LoginForm />
    </section>
  );
}
