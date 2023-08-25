import { LoanApplication } from "@/types/loans";
import { useEffect, useState } from "react";
import { sortTableData } from "@/lib/utils";
import { ApplicationsTable } from "@/app/member/loans/applications/past-applications/applications-table";

type Props = {
  applications: LoanApplication[];
};

export function LoanApplicationsList({ applications }: Props) {
  const [sortedData, setSortedData] = useState<LoanApplication[]>(applications);

  const [search] = useState("");
  const [sortBy, setSortBy] = useState<keyof LoanApplication | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  useEffect(() => {
    setSortedData(applications);
  }, [applications]);

  const setSorting = (field: keyof LoanApplication) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(
      sortTableData<LoanApplication>(applications, {
        sortBy: field,
        reversed,
        search,
      })
    );
  };

  return (
    <div className={"grid"}>
      <ApplicationsTable
        applications={sortedData}
        setSorting={setSorting}
        sortBy={sortBy}
        reverseSortDirection={reverseSortDirection}
      />
    </div>
  );
}
