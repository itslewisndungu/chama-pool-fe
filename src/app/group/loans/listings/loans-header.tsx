import { NativeSelect, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { LoanStatus } from "@/app/group/loans/Loan";

type Props = {
  searchValue(v: string): void;
  filterValue: (filteredValue: LoanStatus | LoanStatus[] | undefined) => void;
};

export const LoansListHeader = ({ searchValue, filterValue }: Props) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchValue(event.currentTarget.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;

    switch (value) {
      case "active-loans":
        filterValue([LoanStatus.ACTIVE, LoanStatus.OVERDUE]);
        break;
      case "repaid-loans":
        filterValue(LoanStatus.REPAID);
        break;
      case "pending-loans":
        filterValue([LoanStatus.PENDING, LoanStatus.AWAITING_DISBURSEMENT]);
        break;
      default:
        filterValue(undefined);
        break;
    }
  };

  return (
    <div className="container flex gap-4 items-center">
      <div className="flex gap-2 items-center">
        <p className="">Showing</p>
        <NativeSelect
          onChange={handleFilterChange}
          data={[
            { label: "All loans", value: "all-loans" },
            { label: "Active Loans", value: "active-loans", selected: true },
            { label: "Repaid Loans", value: "repaid-loans" },
            { label: "Pending Loans", value: "pending-loans" },
          ]}
        />
      </div>

      <TextInput
        className="flex-1"
        placeholder="Search loan"
        icon={<IconSearch size="0.9rem" stroke={1.5} />}
        onChange={handleSearchChange}
      />
    </div>
  );
};
