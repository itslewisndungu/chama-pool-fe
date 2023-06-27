import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  rem,
  Badge,
  Button,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import { Loan } from "@/types/loans";
import Link from "next/link";
import { getFormattedCurrency } from "@/lib/utils";

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
  loans: Loan[];
  setSorting: (field: keyof Loan) => void;
  sortBy: keyof Loan | null;
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

export const LoansListTable = ({
  loans,
  setSorting,
  sortBy,
  reverseSortDirection,
}: Props) => {
  const rows = loans.map((loan, idx) => (
    <tr key={loan.id}>
      <td>{idx + 1}</td>
      <td>{loan.memberName}</td>
      <td>{getFormattedCurrency(loan.amount)}</td>
      <td>
        <Badge>{loan.status}</Badge>
      </td>
      <td>
        <Button
          variant={"subtle"}
          component={Link}
          href={`/member/loans/${loan.id}/summary`}
        >
          View Details
        </Button>
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
            <th>#</th>
            <Th
              sorted={sortBy === "memberName"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("memberName")}
            >
              Member name
            </Th>
            <Th
              sorted={sortBy === "amount"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("amount")}
            >
              Amount loaned
            </Th>
            <Th
              sorted={sortBy === "status"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("status")}
            >
              Loan status
            </Th>
            <th>
              <Text fw={500} fz="sm">
                Actions
              </Text>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={4} align={"center"}>
                <p className={"text-xl md:text-2xl font-light text-gray-800"}>
                  No loans found according to the search criteria
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
};
