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
import { LoanInstallment } from "@/types/loans";
import Link from "next/link";
import { getFormattedCurrency, getFormattedDate } from "@/lib/utils";

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

type Props = {
  installments: LoanInstallment[];
  setSorting: (field: keyof LoanInstallment) => void;
  sortBy: keyof LoanInstallment | null;
  reverseSortDirection: boolean;
};

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

export const InstallmentsListTable = ({
  installments,
  setSorting,
  sortBy,
  reverseSortDirection,
}: Props) => {
  const loansRows = installments.map((installment, idx) => (
    <tr key={installment.id}>
      <td>{idx + 1}</td>
      <td>{getFormattedCurrency(installment.amount)}</td>
      <td>{getFormattedDate(installment.date)}</td>
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
            <th style={{ width: rem(160) }}>#</th>
            <Th
              sorted={sortBy === "amount"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("amount")}
            >
              Amount paid
            </Th>
            <Th
              sorted={sortBy === "date"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("date")}
            >
              Date paid
            </Th>
          </tr>
        </thead>
        <tbody>
          {loansRows.length > 0 ? (
            loansRows
          ) : (
            <tr>
              <td colSpan={3} align={"center"}>
                <p className={"text-xl md:text-2xl font-light text-gray-800"}>
                  No loan installments paid
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
};
