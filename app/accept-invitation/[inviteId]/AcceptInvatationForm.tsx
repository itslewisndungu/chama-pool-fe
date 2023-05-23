'use client';

import { Button, Input, Text } from '@mantine/core';
import { IconChevronRight, IconKey, IconUser } from '@tabler/icons-react';

type Props = {};

const AcceptInvitationForm = (props: Props) => {
  return (
    <form>
      <Text component="label" htmlFor={'username'} className={'text-lg'}>
        Username
      </Text>

      <Input
        className={'mb-3'}
        id={'username'}
        size={'md'}
        autoComplete={'username'}
        required={true}
        icon={<IconUser size={'1.25rem'} />}
      />

      <Text component="label" htmlFor={'password'} className={'text-lg'}>
        Password
      </Text>

      <Input
        className={'mb-3'}
        id={'password'}
        size={'md'}
        autoComplete={'password'}
        required={true}
        icon={<IconKey size={'1.25rem'} />}
      />

      <Text
        component="label"
        htmlFor={'confirm-password'}
        className={'text-lg'}
      >
        Confirm password
      </Text>

      <Input
        className={'mb-3'}
        id={'confirm-password'}
        size={'md'}
        autoComplete={'confirm-password'}
        required={true}
        icon={<IconKey size={'1.25rem'} />}
      />

      <Button
        rightIcon={<IconChevronRight size={'1.25rem'} />}
        className="mt-3"
      >
        Join Group
      </Button>
    </form>
  );
};

export default AcceptInvitationForm;
