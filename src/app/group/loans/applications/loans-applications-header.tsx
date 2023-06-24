import { NativeSelect, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { LoanApplicationStatus } from "@/types/loans";

type Props = {
  searchValue(v: string): void;
  filterValue: (
    filteredValue: LoanApplicationStatus | LoanApplicationStatus[] | undefined
  ) => void;
};

export const LoanApplicationsHeader = ({ searchValue, filterValue }: Props) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchValue(event.currentTarget.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;

    switch (value) {
      case "active-applications":
        filterValue([LoanApplicationStatus.AWAITING_APPROVAL]);
        break;
      case "past-applications":
        filterValue([
          LoanApplicationStatus.APPROVED,
          LoanApplicationStatus.REJECTED,
        ]);
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
            { label: "All applications", value: "all-loans" },
            {
              label: "Active Application",
              value: "active-applications",
              selected: true,
            },
            { label: "Past Applications", value: "past-applications" },
          ]}
        />
      </div>

      <TextInput
        className="flex-1"
        placeholder="Search loan application"
        icon={<IconSearch size="0.9rem" stroke={1.5} />}
        onChange={handleSearchChange}
      />
    </div>
  );
};
