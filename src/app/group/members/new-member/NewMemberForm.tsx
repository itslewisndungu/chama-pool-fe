"use client";

import { inviteMemberToGroup } from "@/lib/api/invite-member";
import { InvitedMember } from "@/types/InvitedMember";
import { Button, Input, Text, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconUserPlus } from "@tabler/icons-react";
import { signIn, useSession } from "next-auth/react";

const inviteMember = async (memberDetails: InvitedMember, token: string) => {
  const user = await inviteMemberToGroup(memberDetails, token).then(res =>
    res.json()
  );
};

export const NewMemberForm = () => {
  const form = useForm<InvitedMember>({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      nationalId: "",
    },
  });

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      return signIn();
    },
  });

  return (
    <form
      className={"max-w-4xl grid gap-y-8"}
      onSubmit={form.onSubmit(v => inviteMember(v, session?.accessToken!))}
    >
      <div className={"grid grid-cols-2 gap-y-4 gap-x-8"}>
        <Title order={2} className={"col-span-2"} weight={"normal"}>
          Personal Information
        </Title>

        <span className={"space-y-2"}>
          <Text component="label" htmlFor={"firstName"} className={"text-lg"}>
            First Name
          </Text>
          <Input
            id={"firstName"}
            placeholder={"eg. Simon"}
            size={"md"}
            required={true}
            autoComplete={"given-name"}
            {...form.getInputProps("firstName")}
          />
        </span>

        <span className={"space-y-2"}>
          <Text component="label" htmlFor={"lastName"} className={"text-lg"}>
            Last Name
          </Text>
          <Input
            id={"lastName"}
            placeholder={"eg. Ndung'u"}
            size="md"
            required={true}
            autoComplete={"family-name"}
            {...form.getInputProps("lastName")}
          />
        </span>

        <span className={"space-y-2"}>
          <Text component="label" htmlFor={"phoneNumber"} className={"text-lg"}>
            Phone number
          </Text>
          <Input
            id={"phoneNumber"}
            placeholder={"eg. 0712345678"}
            size="md"
            required={true}
            {...form.getInputProps("phoneNumber")}
          />
        </span>

        <span className={"space-y-2"}>
          <Text component="label" htmlFor={"nationalId"} className={"text-lg"}>
            National ID
          </Text>
          <Input
            id={"nationalId"}
            placeholder={"eg. 11122585"}
            size="md"
            required={true}
            {...form.getInputProps("nationalId")}
          />
        </span>

        <span className={"space-y-2"}>
          <Text component="label" htmlFor={"dateOfBirth"} className={"text-lg"}>
            Date of Birth
          </Text>
          <Input
            id={"dateOfBirth"}
            placeholder={"22/10/2023"}
            size="md"
            required={true}
            autoComplete="bday"
            // {...form.getInputProps('nationalId')}
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
