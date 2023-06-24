"use client";

import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  rem,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import { Meeting } from "./MeetingsList";

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
  data: Meeting[];
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
  data,
  setSorting,
  sortBy,
  reverseSortDirection,
}: Props) => {
  const rows = data.map(row => (
    <tr key={row.id}>
      <td>{row.date}</td>
      <td>{row.agenda}</td>
      <td>{row.kind}</td>
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
            <Th
              sorted={sortBy === "date"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("date")}
            >
              Date
            </Th>
            <Th
              sorted={sortBy === "agenda"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("agenda")}
            >
              Agenda
            </Th>
            <Th
              sorted={sortBy === "kind"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("kind")}
            >
              Kind
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={Object.keys(data[0]).length}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
};

export default MeetingsListTable;