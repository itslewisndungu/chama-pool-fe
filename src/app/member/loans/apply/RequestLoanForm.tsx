"use client";

import { useForm } from "@mantine/form";
import { Button, NumberInput, Text, Textarea } from "@mantine/core";
import { IconCash, IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { LoanApplication } from "@/types/loans";
import { useSession } from "next-auth/react";
import { getEndpointPath } from "@/lib/utils";

type Props = {
  amountEligible: number;
  close(): void;
};

type LoanApplicationFormData = {
  amount: number;
  reasonForLoan: string;
};

const applyForLoan = async (
  loanApplication: LoanApplicationFormData,
  token: string
) => {
  const req = new Request(getEndpointPath("/loans/applications/apply"), {
    method: "POST",
    body: JSON.stringify(loanApplication),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const res = await fetch(req);
  return (await res.json()) as LoanApplication;
};

const mockApplyForLoan = async (
  loanApplication: LoanApplicationFormData
): Promise<LoanApplicationFormData> => {
  return new Promise(resolve =>
    setTimeout(() => resolve(loanApplication), 2000)
  );
};

export function RequestLoanForm({ close, amountEligible }: Props) {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const form = useForm<LoanApplicationFormData>({
    validate: {
      amount: value => {
        if (value < 1000) {
          return "Amount must be at least 1000";
        } else if (value > amountEligible) {
          return `Amount must be less than your limit value of ${amountEligible}`;
        }
      },
    },
  });

  const handleSubmit = async (values: LoanApplicationFormData) => {
    setLoading(true);

    try {
      await applyForLoan(
        values as LoanApplicationFormData,
        session?.accessToken!
      );
      notifications.show({
        title: "Loans application successful",
        message: `Your loan application of ${values.amount} has been received and is being processed. You will be notified when it has been approved.`,
        autoClose: 10000,
        icon: <IconCheck />,
      });
      close();
      router.push("/member/loans/applications/pending-application");
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
        description={`Enter amount within the range of 1000 and ${amountEligible} `}
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
        id={"reasonForLoan"}
        size={"md"}
        required={true}
        {...form.getInputProps("reasonForLoan")}
        withAsterisk
      />

      {error ? <p className="m-0 text-red-600 text-sm">{error}</p> : null}

      <span className={"flex gap-5 mt-1"}>
        <Button type={"submit"} className={"flex-1"} loading={loading}>
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
