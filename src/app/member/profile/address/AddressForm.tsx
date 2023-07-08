"use client"

import { Address } from "@/types/user";
import { Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

type Props = {
  address: Address;
};

export function AddressForm({ address }: Props) {
  const form = useForm({
    initialValues: address,
  });

  return (
    <div className={"grid md:grid-cols-2 gap-y-4 gap-x-8 max-w-4xl mx-auto"}>
      <TextInput
        label="Home county"
        id={"county"}
        placeholder={"eg. Simon"}
        size={"md"}
        required={true}
        {...form.getInputProps("county")}
      />

      <TextInput
        label="Sub-county"
        id={"subCounty"}
        placeholder={"eg. Simon"}
        size={"md"}
        required={true}
        {...form.getInputProps("subCounty")}
      />

      <TextInput
        label="Constituency"
        id={"constituency"}
        placeholder={"eg. Simon"}
        size={"md"}
        required={true}
        className={"col-span-2"}
        {...form.getInputProps("constituency")}
      />

      <Textarea
        label="Location description"
        id={"locationDescription"}
        placeholder={"Across the road from the police station"}
        size={"md"}
        className={"col-span-2"}
        {...form.getInputProps("locationDescription")}
      />
    </div>
  );
}
