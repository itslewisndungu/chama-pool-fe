"use client";

import { useForm } from "@mantine/form";
import { Button, NumberInput, Text, Textarea } from "@mantine/core";
import { IconCash } from "@tabler/icons-react";
import { LoanApplication } from "@/app/(home)/loans/new-loan/AcceptLoanConditions";
import { useState } from "react";

type Props = {
  close(): void;
};

const applyForLoan = async (loanApplication: LoanApplication) => {
  return new Promise(resolve =>
    setTimeout(() => resolve(loanApplication), 2000)
  );
};

export function RequestLoanForm({ close }: Props) {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const form = useForm({});

  const handleSubmit = async (values: any) => {
    setLoading(true);

    try {
      await applyForLoan(values as LoanApplication);
    } catch (e) {
      setError("An unknown error occurred. Lets try that again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={"flex flex-col gap-4"}
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <NumberInput
        label={"Amount"}
        placeholder={"Enter amount you want to borrow"}
        description={"Enter amount within the range of 1000 and 100000"}
        id={"amount"}
        size={"md"}
        icon={<IconCash />}
        rightSection={
          <Text size={"sm"} className={"text-gray-600 pr-4"}>
            KSH
          </Text>
        }
        required={true}
        {...form.getInputProps("amount")}
        withAsterisk
      />

      <Textarea
        label={"Reason for requesting loan "}
        id={"reason"}
        size={"md"}
        required={true}
        {...form.getInputProps("reason")}
        withAsterisk
      />

      {error ? <p className="m-0 text-red-600 text-sm">{error}</p> : null}

      <span className={"flex gap-5 mt-1"}>
        <Button
          type={"submit"}
          disabled={!form.isValid()}
          className={"flex-1"}
          loading={loading}
        >
          Apply
        </Button>

        <Button
          onClick={close}
          variant={"light"}
          color={"red"}
          className={"flex-1"}
        >
          Cancel
        </Button>
      </span>
    </form>
  );
}
