"use client";

import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { UserProfile } from "@/types/user";

type Props = {
  user: UserProfile;
};

export function PersonalInfoForm({ user }: Props) {
    console.log(user)

  const form = useForm<UserProfile>({
    initialValues: user  });

  return (
    <div className={"grid grid-cols-2 gap-y-4 gap-x-8 max-w-4xl mx-auto"}>
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
        placeholder={"eg. Ndungu"}
        size="md"
        required={true}
        autoComplete={"family-name"}
        {...form.getInputProps("lastName")}
      />

      <TextInput
        label={"Phone Number"}
        id={"phoneNumber"}
        placeholder={"eg. 0712345678"}
        size="md"
        required={true}
        {...form.getInputProps("phoneNumber")}
      />

      <TextInput
        label={"National Id"}
        id={"nationalId"}
        placeholder={"eg. 11122585"}
        size="md"
        required={true}
        {...form.getInputProps("nationalId")}
      />
    </div>
  );
}
