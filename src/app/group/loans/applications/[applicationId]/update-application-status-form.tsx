"use client";

import { useForm } from "@mantine/form";
import { Button, NativeSelect, Textarea } from "@mantine/core";
import { LoanApprovalStatus } from "@/types/loans";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

type Props = {
  approved: LoanApprovalStatus;
  message?: string;
  close(): void;
};

type LoanApproval = {
  approval: LoanApprovalStatus;
  message?: string;
};

const updateApplicationStatusForm = async (approval: LoanApproval) => {
  return new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      if (approval.approval === LoanApprovalStatus.APPROVED) {
        resolve(approval);
      } else {
        reject("An error occurred");
      }
    }, 1000);
  });
};

export function UpdateApplicationStatusForm({
  approved,
  message,
  close,
}: Props) {
  const form = useForm<LoanApproval>({
    initialValues: {
      approval:
        approved === approved
          ? LoanApprovalStatus.APPROVED
          : LoanApprovalStatus.REJECTED,
      message: message,
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleSubmit = async (values: LoanApproval) => {
    setLoading(true);

    try {
      await updateApplicationStatusForm(values);
      notifications.show({
        title: "Loans approval successful",
        message:
          "Your approval has been successfully submitted. The applicant will be notified.",
        autoClose: 10000,
        icon: <IconCheck />,
      });
      close();
    } catch (e) {
      console.log(`Error approving loan because ${e}`);
      setError(
        "An error occurred when approving the loan. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="grid gap-3" onSubmit={form.onSubmit(handleSubmit)}>
      <NativeSelect
        id={"approval"}
        data={[
          { label: "Rejected", value: "REJECTED" },
          { label: "Approved", value: "APPROVED" },
        ]}
        label="Approval status"
        withAsterisk
        required={true}
        {...form.getInputProps("approval")}
      />

      <Textarea
        label={"Message"}
        id={"message"}
        size={"md"}
        {...form.getInputProps("message")}
      />

      {error ? <p className="m-0 text-red-600 text-sm">{error}</p> : null}

      <div className="flex mt-2 gap-2">
        <Button className="flex-1" loading={loading} type={"submit"}>
          Update
        </Button>
        <Button
          className="flex-1"
          disabled={loading}
          variant="subtle"
          color="red"
          onClick={close}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
