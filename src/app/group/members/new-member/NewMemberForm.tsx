"use client";

import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck, IconUserPlus } from "@tabler/icons-react";
import { signIn, useSession } from "next-auth/react";
import { DateInput } from "@mantine/dates";
import { useState, useTransition } from "react";
import { notifications } from "@mantine/notifications";
import { InvitedMember } from "@/types/user";
import { getEndpointPath } from "@/lib/utils";

const inviteMember = async (memberDetails: InvitedMember, token: string) => {
  const req = new Request(getEndpointPath(`/members/invites`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(memberDetails),
  });

  return (await fetch(req).then(res => res.json())) as InvitedMember;
};

export const NewMemberForm = () => {
  const form = useForm<InvitedMember>({
    validate: {
      phoneNumber: p =>
        /^(\+254)?\d{9}$/.test(p) ? null : "Invalid phone number",
      nationalId: n => (/^[0-9]{8}$/.test(n) ? null : "Invalid national ID"),
    },
  });

  const [error, setError] = useState<string>();
  const [pending, startTransition] = useTransition();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      return signIn();
    },
  });

  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  const handleSubmit = async (memberDetails: InvitedMember) => {
    setError(undefined);

    try {
      const member = await inviteMember(memberDetails, session?.accessToken!);
      notifications.show({
        title: "Member invited",
        message: `${member.firstName} ${member.lastName} has been invited to the group`,
        color: "teal",
        icon: <IconCheck />,
      });
    } catch (e) {
      console.error(`Failed to invite member because of ${e}`);
      setError("An unknown error occurred. Lets try that again");
    }
  };

  return (
    <form
      className={"max-w-4xl grid gap-y-8"}
      onSubmit={form.onSubmit(v => startTransition(() => handleSubmit(v)))}
    >
      <div className={"grid md:grid-cols-2 gap-y-4 gap-x-8"}>
        <TextInput
          label={"First Name"}
          id={"firstName"}
          placeholder={"eg. Simon"}
          size={"md"}
          required={true}
          autoComplete={"given-name"}
          {...form.getInputProps("firstName")}
        />

        <TextInput
          label={"Last Name"}
          id={"lastName"}
          placeholder={"eg. Ndung'u"}
          size="md"
          required={true}
          autoComplete={"family-name"}
          {...form.getInputProps("lastName")}
        />

        <TextInput
          label={"Phone number"}
          id={"phoneNumber"}
          placeholder={"eg. 0712345678"}
          size="md"
          required={true}
          {...form.getInputProps("phoneNumber")}
        />

        <TextInput
          label={"National ID"}
          id={"nationalId"}
          placeholder={"eg. 11122585"}
          size="md"
          required={true}
          {...form.getInputProps("nationalId")}
        />

        <DateInput
          maxDate={maxDate}
          label={"Date of Birth"}
          id={"dateOfBirth"}
          placeholder={"22/10/2023"}
          size="md"
          required={true}
          autoComplete="bday"
          {...form.getInputProps("dateOfBirth")}
        />
      </div>

      {error ? <p className="m-0 text-red-600 text-sm">{error}</p> : null}

      <div>
        <Button
          type="submit"
          rightIcon={<IconUserPlus size="1.25rem" />}
          loading={pending}
        >
          Invite member
        </Button>
      </div>
    </form>
  );
};
