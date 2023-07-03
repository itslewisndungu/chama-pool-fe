import { useForm } from "@mantine/form";
import { TextInput } from "@mantine/core";

type NextOfKin = {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  nationalId: string;
};
type Props = {
  kin: NextOfKin;
};

export function NextOfKinForm({ kin }: Props) {
  const form = useForm({
    initialValues: kin,
  });

  return (
    <div className={"grid grid-cols-2 gap-y-4 gap-x-8"}>
      <TextInput
        label="First Name"
        id={"kinFirstName"}
        placeholder={"eg. Simon"}
        size="md"
        required={true}
        {...form.getInputProps("nextOfKinLastName")}
      />

      <TextInput
        label="Last Name"
        id={"kinLastName"}
        placeholder={"eg. Ndung'u"}
        size="md"
        required={true}
        {...form.getInputProps("nextOfKinFirstName")}
      />

      <TextInput
        label="Phone number"
        id={"kinPhoneNumber"}
        placeholder={"eg. 0712345678"}
        size="md"
        required={true}
        {...form.getInputProps("nextOfKinMobileNumber")}
      />

      <TextInput
        label="National ID"
        id={"kinNationalId"}
        placeholder={"eg. 11122585"}
        size="md"
        required={true}
        {...form.getInputProps("nextOfKinNationalId")}
      />
    </div>
  );
}
