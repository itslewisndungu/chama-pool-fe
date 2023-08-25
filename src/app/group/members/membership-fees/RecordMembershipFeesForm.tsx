"use client";

import { useForm } from "@mantine/form";
import { Button, Group, NumberInput, rem, Table, Text } from "@mantine/core";
import { IconCheck, IconEraser, IconPencil } from "@tabler/icons-react";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { notifications } from "@mantine/notifications";
import { getEndpointPath } from "@/lib/utils";

type MembershipFee = {
  memberId: number;
  memberName: string;
  amount: number;
  amountPaid: number;
  status: string;
  balance: number;
};

type Props = {
  fees: MembershipFee[];
};

const recordMembershipFeeRepayment = async (v: any, token: string) => {
  const req = new Request(
    getEndpointPath(`/members/membership-fees/pay-bulk-installments`),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(v),
    }
  );

  return await fetch(req);
};

const transformFee = (fee: MembershipFee) => {
  return {
    ...fee,
    amount: 0,
  } satisfies MembershipFee;
};

export function RecordMembershipFeesForm(props: Props) {
  const [error, setError] = useState<string>();
  let [pending, startTransition] = useTransition();
  const router = useRouter();

  const [fees, setFees] = useState(props.fees.map(transformFee));

  useEffect(() => {
    setFees(props.fees.map(transformFee));
  }, [props.fees]);

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      return signIn();
    },
  });

  const form = useForm({
    initialValues: {
      feePayments: fees,
    },
  });

  const handleSubmit = (v: { feePayments: MembershipFee[] }) => {
    startTransition(async () => {
      try {
        await recordMembershipFeeRepayment(v, session!.accessToken);
        notifications.show({
          title: "Meeting contributions successfully recorded",
          message: "",
          autoClose: 10000,
          icon: <IconCheck />,
        });
        router.refresh();
        close();
      } catch (e) {
        console.log(e);
        setError("Could not record fee rapayment.");
      }
    });
  };

  const fields = form.values.feePayments.map((fee, idx) => {
    return (
      <tr key={fee.memberId}>
        <td>{idx + 1}</td>
        <td>
          <Group spacing="sm">
            <Text size="sm" weight={500}>
              {fee.memberName}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Text size="sm" weight={500}>
              {fee.amountPaid}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Text size="sm" weight={500}>
              {fee.balance}
            </Text>
          </Group>
        </td>
        <td>
          <NumberInput {...form.getInputProps(`feePayments.${idx}.amount`)} />
        </td>
      </tr>
    );
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit(v => handleSubmit(v))}
        onReset={form.onReset}
      >
        <Table miw={800} verticalSpacing="sm">
          <thead>
            <tr>
              <th style={{ width: rem(60) }}>#</th>
              <th>Member</th>
              <th>Amount Paid</th>
              <th>Remaining balance</th>
              <th>Fee to record</th>
            </tr>
          </thead>
          <tbody>{fields}</tbody>
        </Table>

        {error ? <p className="m-0 text-red-600 text-sm">{error}</p> : null}

        <div className={"flex gap-4 m-4 items-center"}>
          <Button
            type={"submit"}
            onClick={() => setError(undefined)}
            rightIcon={<IconPencil size={20} />}
            loading={pending}
          >
            Record Contribution
          </Button>

          <Button
            type={"reset"}
            color={"red"}
            variant={"light"}
            rightIcon={<IconEraser size={20} />}
            disabled={pending}
          >
            Reset
          </Button>
        </div>
      </form>
    </>
  );
}
