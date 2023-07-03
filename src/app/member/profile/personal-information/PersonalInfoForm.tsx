"use client"

import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";

type PersonalInfo = {
  firstname: string;
  lastname: string;
  phoneNumber: string;
  nationalId: string;
  dateOfBirth: Date;
};

type Props = {
  user: PersonalInfo;
};

export function PersonalInfoForm({ user }: Props) {
  const form = useForm({
    initialValues: user,
  });

  return (
    <div className={"grid grid-cols-2 gap-y-4 gap-x-8 max-w-4xl mx-auto"}>
      <TextInput
        label={"First Name"}
        id={"firstName"}
        placeholder={"eg. Simon"}
        size={"md"}
        required={true}
        autoComplete={"given-name"}
        {...form.getInputProps("firstname")}
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

      <DateInput
        label={"Date of Birth"}
        id={"dateOfBirth"}
        placeholder={"22/10/2023"}
        size="md"
        required={true}
        autoComplete="bday"
        {...form.getInputProps("dateOfBirth")}
      />
    </div>
  );
}
