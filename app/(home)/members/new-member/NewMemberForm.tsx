'use client';

import { Button, Input, Text, Title } from '@mantine/core';
import { IconPlus, IconUserPlus } from '@tabler/icons-react';

export const NewMemberForm = () => {
  return (
    <form className={'max-w-4xl grid gap-y-8'}>
      <div className={'grid grid-cols-2 gap-y-4 gap-x-8'}>
        <Title order={2} className={'col-span-2'} weight={'normal'}>
          Personal Information
        </Title>

        <span className={'space-y-2'}>
          <Text component="label" htmlFor={'firstName'} className={'text-lg'}>
            First Name
          </Text>
          <Input
            id={'firstName'}
            placeholder={'eg. Simon'}
            size={'md'}
            required={true}
            autoComplete={'given-name'}
          />
        </span>

        <span className={'space-y-2'}>
          <Text component="label" htmlFor={'lastName'} className={'text-lg'}>
            Last Name
          </Text>
          <Input
            id={'lastName'}
            placeholder={"eg. Ndung'u"}
            size="md"
            required={true}
            autoComplete={'family-name'}
          />
        </span>

        <span className={'space-y-2'}>
          <Text component="label" htmlFor={'phoneNumber'} className={'text-lg'}>
            Phone number
          </Text>
          <Input
            id={'phoneNumber'}
            placeholder={'eg. 0712345678'}
            size="md"
            required={true}
          />
        </span>

        <span className={'space-y-2'}>
          <Text component="label" htmlFor={'nationalId'} className={'text-lg'}>
            National ID
          </Text>
          <Input
            id={'nationalId'}
            placeholder={'eg. 11122585'}
            size="md"
            required={true}
          />
        </span>

        <span className={'space-y-2'}>
          <Text component="label" htmlFor={'dateOfBirth'} className={'text-lg'}>
            Date of Birth
          </Text>
          <Input
            id={'dateOfBirth'}
            placeholder={'22/10/2023'}
            size="md"
            required={true}
            autoComplete="bday"
          />
        </span>
      </div>

      <div className={'grid grid-cols-2 gap-y-4 gap-x-8'}>
        <Title order={2} className={'col-span-2'} weight={'normal'}>
          Next of Kin
        </Title>

        <span className="space-y-2">
          <Text
            component="label"
            htmlFor={'kinFirstName'}
            className={'text-lg'}
          >
            First Name
          </Text>
          <Input
            id={'kinFirstName'}
            placeholder={'eg. Simon'}
            size="md"
            required={true}
          />
        </span>

        <span className="space-y-2">
          <Text component="label" htmlFor={'kinLastName'} className={'text-lg'}>
            Last Name
          </Text>
          <Input
            id={'kinLastName'}
            placeholder={"eg. Ndung'u"}
            size="md"
            required={true}
          />
        </span>

        <span className="space-y-2">
          <Text
            component="label"
            htmlFor={'kinPhoneNumber'}
            className={'text-lg'}
          >
            Phone number
          </Text>
          <Input
            id={'kinPhoneNumber'}
            placeholder={'eg. 0712345678'}
            size="md"
            required={true}
          />
        </span>

        <span className="space-y-2">
          <Text
            component="label"
            htmlFor={'kinNationalId'}
            className={'text-lg'}
          >
            National ID
          </Text>
          <Input
            id={'kinNationalId'}
            placeholder={'eg. 11122585'}
            size="md"
            required={true}
          />
        </span>
      </div>

      <div className={'grid grid-cols-2 gap-y-4 gap-x-8'}>
        <Title order={2} className={'col-span-2'} weight={'normal'}>
          Occupation
        </Title>

        <span className="space-y-2">
          <Text
            component="label"
            htmlFor={'organization'}
            className={'text-lg'}
          >
            Organization
          </Text>
          <Input
            id={'organization'}
            placeholder={'eg. Simon'}
            size={'md'}
            required={true}
            autoComplete="organization"
          />
        </span>

        <span className="space-y-2">
          <Text component="label" htmlFor={'position'} className={'text-lg'}>
            Position
          </Text>
          <Input
            id={'position'}
            placeholder={"eg. Ndung'u"}
            size={'md'}
            required={true}
            autoComplete="organization-title"
          />
        </span>

        <span className="space-y-2">
          <Text component="label" htmlFor={'salary'} className={'text-lg'}>
            Salary
          </Text>
          <Input
            id={'salary'}
            placeholder={'eg. 0712345678'}
            size={'md'}
            required={true}
            type="number"
          />
        </span>
      </div>

      <div className={'grid grid-cols-2 gap-y-4 gap-x-8'}>
        <Title order={2} className={'col-span-2'} weight={'normal'}>
          Home location
        </Title>

        <span className="space-y-2">
          <Text component="label" htmlFor={'county'} className={'text-lg'}>
            Home county
          </Text>
          <Input
            id={'county'}
            placeholder={'eg. Simon'}
            size={'md'}
            required={true}
          />
        </span>

        <span className="space-y-2">
          <Text component="label" htmlFor={'subCounty'} className={'text-lg'}>
            Sub-county
          </Text>
          <Input
            id={'subCounty'}
            placeholder={'eg. Simon'}
            size={'md'}
            required={true}
          />
        </span>

        <span className="space-y-2">
          <Text component="label" htmlFor={'ward'} className={'text-lg'}>
            Ward
          </Text>
          <Input
            id={'ward'}
            placeholder={'eg. Simon'}
            size={'md'}
            required={true}
          />
        </span>
      </div>

      <div>
        <Button
          size="md"
          className=""
          type="submit"
          rightIcon={<IconUserPlus size="1.25rem" />}
        >
          Invite member
        </Button>
      </div>
    </form>
  );
};
