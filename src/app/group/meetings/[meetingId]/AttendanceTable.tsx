"use client";
import {
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Text,
  rem,
  TextInput,
  Button,
} from "@mantine/core";
import { MeetingAttendance } from "@/types/meetings";
import { useForm } from "@mantine/form";
import { IconPencil, IconEraser } from "@tabler/icons-react";

interface Props {
  attendances: MeetingAttendance[];
}

export function AttendanceTable({ attendances }: Props) {
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
    <>
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
            color={"red"}
            variant={"light"}
            rightIcon={<IconEraser size={20} />}
          >
            Reset
          </Button>
        </div>
      </form>
    </>
  );
}
