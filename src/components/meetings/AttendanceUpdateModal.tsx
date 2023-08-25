import {
  Button,
  TextInput,
  Text,
  Checkbox,
  Drawer,
  ScrollArea,
  Group,
  Table,
  rem,
} from "@mantine/core";
import { MeetingAttendance } from "@/types/meetings";
import { useForm } from "@mantine/form";
import { IconCheck, IconEraser, IconPencil, IconX } from "@tabler/icons-react";
import { useState, useTransition } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { getEndpointPath } from "@/lib/utils";

type Props = {
  opened: boolean;
  close: () => void;
  attendances: MeetingAttendance[];
  meetingId: number;
};

const updateMeetingAttendance = async (
  v: {
    attendances: MeetingAttendance[];
  },
  meetingId: number,
  token: string
) => {
  const req = new Request(
    getEndpointPath(`/meetings/${meetingId}/attendance`),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(v),
    }
  );

  return await fetch(req).then(res => res.json());
};

export default function AttendanceUpdateModal({
  opened,
  close,
  attendances,
  meetingId,
}: Props) {
  const form = useForm({
    initialValues: {
      attendances: attendances,
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

  const handleSubmit = (v: { attendances: MeetingAttendance[] }) => {
    startTransition(async () => {
      try {
        await updateMeetingAttendance(v, meetingId, session!.accessToken);
        router.refresh();
        notifications.show({
          title: "Meeting attendance successfully recorded",
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

  const fields = form.values.attendances.map((item, idx) => {
    return (
      <tr key={item.memberId}>
        <td>{idx + 1}</td>
        <td>
          <Group spacing="sm">
            <Text size="sm" weight={500}>
              {item.memberName}
            </Text>
          </Group>
        </td>
        <td>
          <Checkbox
            checked={item.isPresent}
            transitionDuration={0}
            {...form.getInputProps(`attendances.${idx}.isPresent`)}
          />
        </td>
        <td>
          <TextInput {...form.getInputProps(`attendances.${idx}.apology`)} />
        </td>
      </tr>
    );
  });

  return (
    <Drawer
      position={"bottom"}
      opened={opened}
      onClose={close}
      scrollAreaComponent={ScrollArea.Autosize}
      title={"Edit member attendance"}
      size={"100%"}
    >
      <form
        onSubmit={form.onSubmit(v => handleSubmit(v))}
        onReset={form.onReset}
      >
        <Table miw={800} verticalSpacing="sm">
          <thead>
            <tr>
              <th style={{ width: rem(40) }}>#</th>
              <th>Member</th>
              <th>Member Present</th>
              <th>Apology</th>
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
            Record attendance
          </Button>

          <Button
            type={"reset"}
            variant={"light"}
            disabled={pending}
            rightIcon={<IconEraser size={20} />}
          >
            Reset
          </Button>

          <Button
            color={"red"}
            onClick={close}
            className={"ml-auto"}
            disabled={pending}
            rightIcon={<IconX size={20} />}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Drawer>
  );
}
