"use client";
import { Table, Group, Text, rem, Button } from "@mantine/core";
import { MeetingAttendance } from "@/types/meetings";
import { useDisclosure } from "@mantine/hooks";
import AttendanceUpdateModal from "@/app/group/meetings/[meetingId]/attendance/AttendanceUpdateModal";

interface Props {
  attendances: MeetingAttendance[];
}

export function Attendance({ attendances }: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  const fields = attendances.map((attendance, idx) => {
    return (
      <tr key={attendance.memberId}>
        <td className={"text-gray-800"}>{idx + 1}</td>
        <td>
          <Group spacing="sm">
            <Text size="sm" weight={500}>
              {attendance.memberName}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Text size="sm" weight={500}>
              {attendance.isPresent
                ? "Present"
                : attendance.apology
                ? "Absent with apology"
                : "Absent without apology"}
            </Text>
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            <Text size="sm" weight={500}>
              {attendance.apology}
            </Text>
          </Group>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Table miw={800} verticalSpacing="sm">
        <thead>
          <tr>
            <th style={{ width: rem(100) }}>#</th>
            <th>Member</th>
            <th>Member Present</th>
            <th>Apology</th>
          </tr>
        </thead>
        <tbody>{fields}</tbody>
      </Table>

      <Button variant={"light"} className={"mt-4"} onClick={open}>
        Update attendance
      </Button>
      <AttendanceUpdateModal
        opened={opened}
        close={close}
        attendances={attendances}
      />
    </>
  );
}
