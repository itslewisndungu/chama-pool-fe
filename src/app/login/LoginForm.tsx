'use client';
import useAuth from '@/hooks/useAuth';
import { LoginCredentials } from '@/types/LoginCredentials';
import {
  Input,
  Text,
  PasswordInput,
  Button,
  Paper,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconChevronRight, IconKey, IconUser } from '@tabler/icons-react';

export const LoginForm = () => {
  const { login } = useAuth();

  const form = useForm<LoginCredentials>({
    initialValues: {
      username: '',
      password: '',
    },
    // validate: {
    //   password: password =>
    //     password.length < 6 ? 'Password is too weak' : null,
    // },
  });

  return (
    <Paper shadow={'sm'} className={'p-8'}>
      <Title order={1} className={'mb-4'}>
        Login into your account.
      </Title>

      <form className={'grid gap-4'} onSubmit={form.onSubmit(login)}>
        <div className={'space-y-2'}>
          <Text component="label" htmlFor={'username'} className={'text-lg'}>
            Username
          </Text>
          <Input
            id={'username'}
            placeholder={'Enter your username'}
            size={'md'}
            autoComplete={'username'}
            required={true}
            icon={<IconUser size={'1.25rem'} />}
            {...form.getInputProps('username')}
          />
        </div>

        <div className={'space-y-2'}>
          <Text component="label" htmlFor={'password'} className={'text-lg'}>
            Password
          </Text>
          <PasswordInput
            id={'password'}
            placeholder={'Enter your password'}
            size={'md'}
            required={true}
            icon={<IconKey size={'1.25rem'} />}
            {...form.getInputProps('password')}
          />
        </div>

        <Button
          className={'mt-2'}
          type={'submit'}
          rightIcon={<IconChevronRight size={'1.25rem'} />}
        >
          Login
        </Button>
      </form>
    </Paper>
  );
};
