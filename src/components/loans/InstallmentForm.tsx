import { useForm } from "@mantine/form";
import { Button, Modal, NumberInput, Text } from "@mantine/core";
import { IconCash } from "@tabler/icons-react";
import { recordLoanInstallment } from "@/lib/api/disburse-loan";
import { useTransition } from "react";
import { notifications } from "@mantine/notifications";

interface InstallmentFormProps {
  loanId: number;
  opened: boolean;
  close(): void;
}

export function InstallmentForm({
  loanId,
  opened,
  close,
}: InstallmentFormProps) {
  const form = useForm<{ amount: number }>({});
  const [pending, startTransition] = useTransition();

  const handleSubmit = ({ amount }: { amount: number }) => {
    startTransition(async () => {
      await recordLoanInstallment(loanId, amount);
      notifications.show({
        title: "Loan Installment Recorded",
        message: `KSH ${amount} has been recorded as an installment for loan ${loanId}`,
      });
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
