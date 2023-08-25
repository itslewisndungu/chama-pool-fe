"use client";

import { LoginCredentials } from "@/types/LoginCredentials";
import { PasswordInput, Button, Title, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconChevronRight, IconKey, IconUser } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Link from "next/link";

export default function Page() {
  const router = useRouter();

  const [error, setError] = useState<string>();
  const [pending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const form = useForm<LoginCredentials>({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      password: p => (p.length < 6 ? "Password is too weak" : null),
    },
  });

  const handleSubmit = async (credentials: LoginCredentials) => {
    const { username, password } = credentials;
    setError(undefined);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
        callbackUrl,
      });

      if (res?.error) {
        setError("Invalid username or password");
      } else {
        router.push(callbackUrl);
      }
    } catch (e) {
      console.error(`Login failed because of ${e}`);
      setError("An unknown error occurred. Lets try that again");
    } finally {
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto sm:p-0 mt-20">
      <Title order={1} className={"mb-4"}>
        Login into your account.
      </Title>

      <form
        className={"grid gap-2"}
        onSubmit={form.onSubmit(v =>
          startTransition(async () => await handleSubmit(v))
        )}
      >
        <TextInput
          label={"Username"}
          placeholder={"Enter your username"}
          size={"md"}
          autoComplete={"username"}
          required={true}
          icon={<IconUser size={"1.25rem"} />}
          {...form.getInputProps("username")}
        />

        <PasswordInput
          label={"Password"}
          autoComplete={"current-password"}
          placeholder={"Enter your password"}
          size={"md"}
          required={true}
          icon={<IconKey size={"1.25rem"} />}
          {...form.getInputProps("password")}
        />

          {error ? <p className="m-0 text-red-600 text-sm">{error}</p> : null}


        <Button
          loading={pending}
          type={"submit"}
          rightIcon={<IconChevronRight size={"1.25rem"} />}
        >
          Login
        </Button>

        <Button
          variant={"subtle"}
          size={"xs"}
          component={Link}
          href={"/forgot-password"}
          className={"self-start"}
        >
          Forgot password?
        </Button>
      </form>
    </div>
  );
}
