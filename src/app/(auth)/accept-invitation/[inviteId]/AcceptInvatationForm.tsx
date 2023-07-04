"use client";

import { acceptMemberInvitation } from "@/lib/api/accept-invitation";
import { InvitedMember } from "@/types/InvitedMember";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconChevronRight, IconKey, IconUser } from "@tabler/icons-react";

type Props = {
  invitation: InvitedMember & { username: string; inviteId: number };
};

const AcceptInvitationForm = ({ invitation }: Props) => {
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

  const acceptInvitation = async (username: string, password: string) => {
    try {
      const user = await acceptMemberInvitation(
        {
          username,
          password,
        },
        invitation.inviteId
      ).then(res => res.json());
    } catch (e) {
      throw new Error(`Failed to accept invitation because of ${e}`);
    }
  };

  return (
    <form
      onSubmit={form.onSubmit(v => acceptInvitation(v.username, v.password))}
    >
      <TextInput
        label={"Username"}
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
        autoComplete={"confirm-password"}
        required={true}
        icon={<IconKey size={"1.25rem"} />}
        {...form.getInputProps("confirmPassword")}
      />

      <Button
        type="submit"
        rightIcon={<IconChevronRight size={"1.25rem"} />}
        className="mt-3"
      >
        Join Group
      </Button>
    </form>
  );
};

export default AcceptInvitationForm;
