"use client";

import { LoginCredentials } from "@/types/LoginCredentials";
import {
  Input,
  Text,
  PasswordInput,
  Button,
  Paper,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconChevronRight, IconKey, IconUser } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const LoginForm = () => {
  const router = useRouter();

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginCredentials>({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      password: p => (p.length < 6 ? "Password is too weak" : null),
    },
  });

  const searchParams = useSearchParams();
  // TODO: Check if the user is and admin and redirect to admin dashboard, otherwise redirect to member dashboard
  const callbackUrl = searchParams.get("callbackUrl") || "/member/dashboard";

  const handleSubmit = async (credentials: LoginCredentials) => {
    const { username, password } = credentials;
    setError(undefined);
    setLoading(true);

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
      setLoading(false);
    }
  };

  return (
    <Paper shadow={"sm"} className={"p-8"}>
      <Title order={1} className={"mb-4"}>
        Login into your account.
      </Title>

      <form className={"grid gap-1"} onSubmit={form.onSubmit(handleSubmit)}>
        <div className={"space-y-4"}>
          <div className={"space-y-2"}>
            <Text component="label" htmlFor={"username"} className={"text-lg"}>
              Username
            </Text>
            <Input
              id={"username"}
              placeholder={"Enter your username"}
              size={"md"}
              autoComplete={"username"}
              required={true}
              icon={<IconUser size={"1.25rem"} />}
              {...form.getInputProps("username")}
            />
          </div>
          <div className={"space-y-2"}>
            <Text component="label" htmlFor={"password"} className={"text-lg"}>
              Password
            </Text>
            <PasswordInput
              id={"password"}
              placeholder={"Enter your password"}
              size={"md"}
              required={true}
              icon={<IconKey size={"1.25rem"} />}
              {...form.getInputProps("password")}
            />
          </div>
        </div>

        <div className={"min-h-[1.25rem] my-2"}>
          {error ? <p className="m-0 text-red-600 text-sm">{error}</p> : null}
        </div>

        <Button
          loading={loading}
          type={"submit"}
          rightIcon={<IconChevronRight size={"1.25rem"} />}
        >
          Login
        </Button>
      </form>
    </Paper>
  );
};
