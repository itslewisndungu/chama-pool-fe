import { MeetingContribution } from "@/types/meetings";
import { useForm } from "@mantine/form";
import {
  Button,
  Drawer,
  Group,
  NumberInput,
  rem,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import {
  IconCheck,
  IconCrosshair,
  IconEraser,
  IconPencil,
} from "@tabler/icons-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { notifications } from "@mantine/notifications";

type Props = {
  meetingId: number;
  contributions: MeetingContribution[];
  opened: boolean;
  close: () => void;
};

const updateMeetingContributions = async (
  v: { contributions: MeetingContribution[] },
  meetingId: number,
  token: string
) => {
  const req = new Request(
    `http://localhost:8080/meetings/${meetingId}/contributions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(v),
    }
  );

  const res = await fetch(req).then(res => res.json());
  console.log(res);
};

export function ContributionsUpdateModal({
  contributions,
  opened,
  close,
  meetingId,
}: Props) {
  const form = useForm({
    initialValues: {
      contributions: contributions,
    },
  });

  const [error, setError] = useState<string>();
  let [pending, startTransition] = useTransition();
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      return signIn();
    },
  });

  const handleSubmit = (v: { contributions: MeetingContribution[] }) => {
    startTransition(async () => {
      try {
        await updateMeetingContributions(v, meetingId, session!.accessToken);

        router.refresh();
        notifications.show({
          title: "Meeting contributions successfully recorded",
          message: "",
          autoClose: 10000,
          icon: <IconCheck />,
        });
        close();
      } catch (e) {
        console.log(e);
        setError("Could not update attendance.");
      }
    });
  };

  const fields = form.values.contributions.map((contribution, idx) => {
    return (
      <tr key={contribution.memberId}>
        <td>{idx + 1}</td>
        <td>
          <Group spacing="sm">
            <Text size="sm" weight={500}>
              {contribution.memberName}
            </Text>
          </Group>
        </td>
        <td>
          <NumberInput {...form.getInputProps(`contributions.${idx}.amount`)} />
        </td>
      </tr>
    );
  });

  return (
    <>
      <Drawer
        position={"bottom"}
        opened={opened}
        onClose={close}
        scrollAreaComponent={ScrollArea.Autosize}
        title={<h3 className={"m-0"}>Edit member attendance</h3>}
        size={"100%"}
      >
        <form
          onSubmit={form.onSubmit(v => handleSubmit(v))}
          onReset={form.onReset}
        >
          <Table miw={800} verticalSpacing="sm">
            <thead>
              <tr>
                <th style={{ width: rem(60) }}>#</th>
                <th>Member</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>{fields}</tbody>
          </Table>

          {error ? <p className="m-0 text-red-600 text-sm">{error}</p> : null}

          <div className={"flex gap-4 m-4 items-center"}>
            <Button
              type={"submit"}
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

            <Button
              color={"red"}
              onClick={close}
              className={"ml-auto"}
              disabled={pending}
              rightIcon={<IconCrosshair size={20} />}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Drawer>
    </>
  );
}
