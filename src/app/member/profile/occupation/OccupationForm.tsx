import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

type Occupation = {
  organization: string;
  position: string;
  salary: number;
};

type Params = {
  occupation: Occupation;
};

export function OccupationForm({ occupation }: Params) {
  const form = useForm({
    initialValues: occupation,
  });

  return (
    <div className={"grid grid-cols-2 gap-y-4 gap-x-8"}>
      <TextInput
        label="Organization"
        id={"organization"}
        placeholder={"eg. Simon"}
        size={"md"}
        required={true}
        autoComplete="organization"
        {...form.getInputProps("organization")}
      />

      <TextInput
        label="Position"
        id={"position"}
        placeholder={"eg. Ndung'u"}
        size={"md"}
        required={true}
        autoComplete="organization-title"
      />

      <TextInput
        label="Employer"
        id={"salary"}
        placeholder={"eg. 0712345678"}
        size={"md"}
        required={true}
        type="number"
        {...form.getInputProps("salary")}
      />
    </div>
  );
}
