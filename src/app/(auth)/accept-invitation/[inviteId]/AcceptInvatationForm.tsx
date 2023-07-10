"use client";

import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconCheck,
  IconChevronRight,
  IconKey,
  IconUser,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useState, useTransition } from "react";
import { LoginCredentials } from "@/types/LoginCredentials";
import { useRouter } from "next/navigation";
import { InvitedMember } from "@/types/user";

type Props = {
  invitation: InvitedMember & { username: string; inviteId: number };
};

const acceptInvitation = async (
  inviteId: number,
  memberDetails: LoginCredentials
) => {
  const req = new Request(
    `http://localhost:8080/members/invites/${inviteId}/accept`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberDetails),
    }
  );

  return (await fetch(req).then(res => res.json())) as InvitedMember;
};

const AcceptInvitationForm = ({ invitation }: Props) => {
  const [error, setError] = useState<string>();
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<{
    username: string;
    password: string;
    confirmPassword: string;
  }>({
    initialValues: {
      username: invitation.username,
      password: "",
      confirmPassword: "",
    },
    validate: {
      password: p => (p.length < 6 ? "Password is too weak" : null),
      confirmPassword: (cp, { password }) =>
        password !== cp
          ? "Password and password confirmation do not match"
          : null,
    },
  });

  const handleSubmit = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    setError(undefined);

    try {
      const member = await acceptInvitation(invitation.inviteId, {
        username,
        password,
      });

      notifications.show({
        title: "Successfully joined the group",
        message: `Dear ${member.firstName} ${member.lastName}. You have successfully joined the group.`,
        color: "teal",
        icon: <IconCheck />,
      });

      router.push("/login");
    } catch (e) {
      console.error(`Failed to invite member because of ${e}`);
      setError("An unknown error occurred. Lets try that again");
    }
  };

  return (
    <form onSubmit={form.onSubmit(v => startTransition(() => handleSubmit(v)))}>
      <TextInput
        label={"Username"}
        description={
          "This is a generated username. Change it to suit your preference"
        }
        className={"mb-3"}
        id={"username"}
        size={"md"}
        autoComplete={"username"}
        required={true}
        icon={<IconUser size={"1.25rem"} />}
        {...form.getInputProps("username")}
      />

      <PasswordInput
        label={"Password"}
        className={"mb-3"}
        id={"password"}
        size={"md"}
        autoComplete={"new-password"}
        required={true}
        icon={<IconKey size={"1.25rem"} />}
        {...form.getInputProps("password")}
      />

      <PasswordInput
        label={"Confirm password"}
        className={"mb-3"}
        id={"confirm-password"}
        size={"md"}
        required={true}
        icon={<IconKey size={"1.25rem"} />}
        {...form.getInputProps("confirmPassword")}
      />

      {error ? <p className="m-0 text-red-600 text-sm">{error}</p> : null}

      <Button
        type="submit"
        rightIcon={<IconChevronRight size={"1.25rem"} />}
        className="mt-3"
        loading={pending}
      >
        Join Group
      </Button>
    </form>
  );
};

export default AcceptInvitationForm;
