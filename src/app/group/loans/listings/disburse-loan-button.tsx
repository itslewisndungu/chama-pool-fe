import { Button } from "@mantine/core";
import { disburseLoan } from "@/lib/api/disburse-loan";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconReceipt, IconX } from "@tabler/icons-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

type Props = {
  loanId: number;
};

export function DisburseLoanButton({ loanId }: Props) {
  const [disbursing, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Button
      loading={disbursing}
      rightIcon={<IconReceipt size={20} />}
      onClick={() =>
        startTransition(() => {
          disburseLoan(loanId)
            .then(_ => {
              notifications.show({
                title: "Loan disbursed",
                message: `The loan has been successfully disbursed. Applicant will be notified`,
                color: "teal",
                icon: <IconCheck />,
              });
              router.refresh();
            })
            .catch(err => {
              console.error(err);
              notifications.show({
                title: "Error",
                message: `An error occurred while disbursing the loan. Applicant will be notified`,
                color: "red",
                icon: <IconX />,
              });
            });
        })
      }
    >
      Disburse loan
    </Button>
  );
}
