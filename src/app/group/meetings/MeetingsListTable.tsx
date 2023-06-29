"use client";

import {
  Badge,
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  rem,
  Button,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconCalendarEvent,
} from "@tabler/icons-react";
import { Meeting } from "@/types/meetings";
import { getFormattedDate } from "@/lib/utils";
import Link from "next/link";

const useStyles = createStyles(theme => ({
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },
}));

interface Props {
  meetings: Meeting[];
  setSorting: (field: keyof Meeting) => void;
  sortBy: keyof Meeting | null;
  reverseSortDirection: boolean;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size="0.9rem" stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

const MeetingsListTable = ({
  meetings,
  setSorting,
  sortBy,
  reverseSortDirection,
}: Props) => {
  const rows = meetings.map((meeting, idx) => (
    <tr key={meeting.id}>
      <td className={"text-gray-700"}>{idx + 1}</td>
      <td>{getFormattedDate(new Date(meeting.date))}</td>
      <td>
        <Link className={"underline"} href={`/group/meetings/${meeting.id}`}>
          {meeting.title}
        </Link>
      </td>
      <td>{meeting.agenda}</td>
      <td>
        <Badge>{meeting.category}</Badge>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        sx={{ tableLayout: "fixed" }}
      >
        <thead>
          <tr>
            <th className={"w-[4rem]"}>#</th>
            <Th
              sorted={sortBy === "date"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("date")}
            >
              Date
            </Th>
            <Th
              sorted={sortBy === "title"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("title")}
            >
              Meeting Title
            </Th>
            <Th
              sorted={sortBy === "agenda"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("agenda")}
            >
              Agenda
            </Th>
            <Th
              sorted={sortBy === "category"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("category")}
            >
              Category
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={3} className={""}>
                <p className={"lead"}>No meetings found</p>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
};

export default MeetingsListTable;
