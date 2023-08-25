"use client";

import { useForm } from "@mantine/form";
import { Button, PasswordInput } from "@mantine/core";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { notifications } from "@mantine/notifications";

const changePassword = async (token: string, password: string) => {
  const req = new Request("http://localhost:8080/auth/change-password", {
    method: "POST",
    body: JSON.stringify({ token, password }),
  });

  return await fetch(req);
};

export default function ChangePasswordPage() {
  const form = useForm<{ password: string; confirmPassword: string }>({
    validate: {
      password: p => (p.length < 6 ? "Password is too weak" : null),
      confirmPassword: (cp, { password }) =>
        password !== cp
          ? "Password and password confirmation do not match"
          : null,
    },
  });

  const [pending, startTransition] = useTransition();
  const resetToken = useSearchParams().get("token");
  const [error, setError] = useState<string>();
  const router = useRouter();

  if (!resetToken) {
    return <div>Invalid reset token</div>;
  }

  const handleSubmit = (username: string) => {
    startTransition(async () => {
      try {
        await changePassword(resetToken, username);
        notifications.show({
          title: "Successfully changed password",
          message: "You can now login with your new password",
          color: "teal",
        });
        router.push("/login");
      } catch (e) {
        console.error(e);
        setError("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <div className="p-4 max-w-md mx-auto sm:p-0 mt-20">
      <div>
        <h2 className="text-4xl font-semibold tracking-tight text-center m-0">
          Change Password
        </h2>
        <p className="lead text-center text-gray-600">
          Enter your new password below.
        </p>
      </div>

      <form
        className={"flex flex-col mt-8 gap-4"}
        onSubmit={form.onSubmit(({ password }) => handleSubmit(password))}
      >
        <PasswordInput
          label={"Password"}
          description={"Enter your new password"}
          size={"md"}
          required
          {...form.getInputProps("password")}
        />

        <PasswordInput
          label={"Confirm Password"}
          size={"md"}
          required
          {...form.getInputProps("confirmPassword")}
        />

        {error ? <p className="m-0 text-red-600 text-sm">{error}</p> : null}

        <Button type={"submit"} loading={pending}>
          Submit
        </Button>
      </form>
    </div>
  );
}
