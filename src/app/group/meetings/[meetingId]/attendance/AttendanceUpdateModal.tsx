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
import { IconCrosshair, IconEraser, IconPencil } from "@tabler/icons-react";

type Props = {
  opened: boolean;
  close: () => void;
  attendances: MeetingAttendance[];
};
export default function AttendanceUpdateModal({
  opened,
  close,
  attendances,
}: Props) {
  const form = useForm({
    initialValues: {
      attendances: attendances,
    },
  });

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
      title={<h3 className={"m-0"}>Edit member attendance</h3>}
      size={"100%"}
    >
      <form onSubmit={form.onSubmit(console.log)} onReset={form.onReset}>
        <ScrollArea>
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
        </ScrollArea>

        <div className={"flex gap-4 m-4 items-center"}>
          <Button type={"submit"} rightIcon={<IconPencil size={20} />}>
            Record attendance
          </Button>

          <Button
            type={"reset"}
            variant={"light"}
            rightIcon={<IconEraser size={20} />}
          >
            Reset
          </Button>

          <Button
            color={"red"}
            onClick={close}
            variant={"light"}
            rightIcon={<IconCrosshair size={20} />}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Drawer>
  );
}
