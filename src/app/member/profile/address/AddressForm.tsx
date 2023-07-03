import { Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

type Address = {
  county: string;
  subCounty: string;
  constituency: string;
  locationDescription: string;
};

type Props = {
  address: Address;
};

export function AddressForm({ address }: Props) {
  const form = useForm({
    initialValues: address,
  });

  return (
    <div className={"grid grid-cols-2 gap-y-4 gap-x-8"}>
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
        {...form.getInputProps("constituency")}
      />

      <Textarea
        label="Location description"
        id={"locationDescription"}
        placeholder={"Across the road from the police station"}
        size={"md"}
        {...form.getInputProps("locationDescription")}
      />
    </div>
  );
}
