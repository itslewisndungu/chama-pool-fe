'use client';
import { Input, Text, PasswordInput, Button, Paper, Title } from '@mantine/core';
import { IconChevronRight, IconKey, IconUser } from '@tabler/icons-react';

export const LoginForm = () => {
  return (
    <Paper shadow={'sm'} className={'p-8'}>
      <Title order={1} className={"mb-4"}>Login into your account.</Title>

      <form className={'grid gap-4'}>
        <div className={'space-y-2'}>
          <Text component='label' htmlFor={'username'} className={'text-lg'}>Username</Text>
          <Input
            id={'username'}
            placeholder={'Enter your username'}
            size={'md'}
            autoComplete={'username'}
            required={true}
            icon={<IconUser size={'1.25rem'} />}
          />
        </div>

        <div className={'space-y-2'}>
          <Text component='label' htmlFor={'password'} className={'text-lg'}>Password</Text>
          <PasswordInput
            id={'password'}
            placeholder={'Enter your password'}
            size={'md'}
            required={true}
            icon={<IconKey size={'1.25rem'} />}
          />
        </div>

        <Button
          className={'mt-2'}
          type={'submit'}
          rightIcon={<IconChevronRight size={'1.25rem'} />}>
          Login
        </Button>
      </form>
    </Paper>
  );
};