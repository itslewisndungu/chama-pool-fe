"use client";

import { useForm } from "@mantine/form";
import { Button, TextInput } from "@mantine/core";
import { useState, useTransition } from "react";
import { notifications } from "@mantine/notifications";
import { getEndpointPath } from "@/lib/utils";

const resetPassword = async (username: string) => {
  const path = getEndpointPath(
    getEndpointPath(`/auth/${username}/reset-password`)
  );
  const req = new Request(path, {
    method: "POST",
    body: JSON.stringify({ username }),
  });

  return await fetch(req);
};

export default function ForgotPasswordPage() {
  const form = useForm<{ username: string }>({});
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  const handleSubmit = (username: string) => {
    startTransition(async () => {
      try {
        await resetPassword(username);
        notifications.show({
          title: "Password reset sms sent",
          message: "We have a sent a password reset sms to your phone number",
          color: "teal",
        });
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
          Forgot Password
        </h2>
        <p className="lead text-center text-gray-600">
          Lets help you reset your password.
        </p>
      </div>

      <form
        className={"flex flex-col mt-8"}
        onSubmit={form.onSubmit(({ username }) => handleSubmit(username))}
      >
        <TextInput
          label="Enter your username"
          description={"Provide the username you used to register"}
          size={"md"}
          {...form.getInputProps("username")}
          required
        />

        {error ? <p className="m-0 text-red-600 text-sm">{error}</p> : null}

        <Button
          size={"md"}
          type={"submit"}
          loading={pending}
          className={"mt-5"}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
