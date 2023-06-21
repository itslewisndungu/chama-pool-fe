import { getFormattedCurrency } from "@/lib/utils";

export function LoanSummary() {
  return (
    <>
      <h2 className={"mb-0 mt-1"}>Loan summary</h2>

      <div className={"flex flex-col my-1"}>
        <p className={"my-1 space-x-2"}>
          <span className={"text-gray-800 text-sm"}>Loan status:</span>
          <span>Approved</span>
        </p>
        <p className={"my-1 space-x-2"}>
          <span className={"text-gray-800 text-sm"}>Loan amount:</span>
          <span>{getFormattedCurrency(10000)}</span>
        </p>
        <p className={"my-1 space-x-2"}>
          <span className={"text-gray-800 text-sm"}>
            Reason requesting loan:
          </span>
          <span>To buy a new car</span>
        </p>
      </div>
    </>
  );
}
