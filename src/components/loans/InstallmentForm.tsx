import { useForm } from "@mantine/form";
import { Button, Modal, NumberInput, Text } from "@mantine/core";
import { IconCash } from "@tabler/icons-react";
import { recordLoanInstallment } from "@/lib/api/disburse-loan";
import { useTransition } from "react";
import { notifications } from "@mantine/notifications";
import { getFormattedCurrency } from "@/lib/utils";

interface InstallmentFormProps {
  loanId: number;
  opened: boolean;
  loanBalance: number;
  close(): void;
}

export function InstallmentForm({
  loanId,
  opened,
  close,
  loanBalance,
}: InstallmentFormProps) {
  const form = useForm<{ amount: number }>({
    validate: {
      amount: a =>
        a > loanBalance
          ? "You cannot record an installment greater than the remaining loan balance"
          : null,
    },
  });
  const [pending, startTransition] = useTransition();

  const handleSubmit = ({ amount }: { amount: number }) => {
    startTransition(async () => {
      await recordLoanInstallment(loanId, amount);
      notifications.show({
        title: "Loan Installment Recorded",
        message: `${getFormattedCurrency(amount)} has been recorded as an installment for loan ${loanId}`,
      });
      form.reset();
      close();
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      centered={true}
      title="Loan Installment"
    >
      <form onSubmit={form.onSubmit(handleSubmit)} className={"grid gap-4"}>
        <NumberInput
        description={`Amount to record. Should be smaller than the remaining balance of ${getFormattedCurrency(loanBalance)}`}
          label={"Installment Amount"}
          placeholder={"10000"}
          id={"amount"}
          size={"lg"}
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

        <Button loading={pending} type={"submit"}>
          Submit
        </Button>
      </form>
    </Modal>
  );
}
