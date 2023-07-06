import { keys } from "@mantine/utils";
import { MemberRole } from "@/types/MemberRole";

export const getRemainingLoanDays = (dueDate: Date | undefined) => {
  if (dueDate === undefined) return undefined;

  const currentDate = new Date();
  const loanDueDate = new Date(dueDate);

  const timeDifference = loanDueDate.getTime() - currentDate.getTime();
  const differenceInDays = Math.floor(timeDifference / (1000 * 3600 * 24));

  let timeUnit;
  let difference;

  if (differenceInDays >= 30) {
    difference = Math.floor(differenceInDays / 30);
    timeUnit = difference === 1 ? "month" : "months";
  } else {
    difference = differenceInDays;
    timeUnit = difference === 1 ? "day" : "days";
  }

  return `${difference} ${timeUnit} remaining to repay loan.`;
};

export const calculateRemainingDaysPercentage = (
  dueDate: Date | undefined,
  disbursementDate: Date | undefined
) => {
  if (dueDate === undefined || disbursementDate === undefined) return 0;

  const loanDisbursementDate = new Date(disbursementDate);
  const currentDate = new Date();
  const loanDueDate = new Date(dueDate);

  const timeRemaining = loanDueDate.getTime() - currentDate.getTime();
  const timePassed = currentDate.getTime() - loanDisbursementDate.getTime();

  return Math.floor((timePassed / timeRemaining) * 100);
};
export const isUserAdmin = (roles: MemberRole[]): boolean => {
  return (
    isUserTreasurer(roles) || isUserSecretary(roles) || isUserChairman(roles)
  );
};

export const isUserTreasurer = (roles: MemberRole[]): boolean => {
  return roles.some(role => role === MemberRole.TREASURER);
};

export const isUserSecretary = (roles: MemberRole[]): boolean => {
  return roles.some(role => role === MemberRole.SECRETARY);
};

export const isUserChairman = (roles: MemberRole[]): boolean => {
  return roles.some(role => role === MemberRole.CHAIRMAN);
};
export const getFormattedCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KSH",
  }).format(amount);
};

const filterTableData = <T>(data: T[], search: string) => {
  const query = search.toLowerCase().trim().split(",");

  return data.filter(item =>
    keys(data[0]).some(key => {
      return query.some(term =>
        String(item[key]).toLowerCase().includes(term.trim())
      );
    })
  );
};

const compareTableValues = (value1: unknown, value2: unknown) => {
  // Handle undefined values
  if (value1 === undefined && value2 === undefined) {
    return 0;
  } else if (value1 === undefined) {
    return 1;
  } else if (value2 === undefined) {
    return -1;
  }

  // Handle number values
  if (typeof value1 === "number" && typeof value2 === "number") {
    return value1 - value2;
  }

  if (typeof value1 === Date && typeof value2 === Date) {
      return compareDates(value1, value2);
  }

  // Fallback to string comparison
  return String(value1).localeCompare(String(value2));
};

export const sortTableData = <T>(
  data: T[],
  payload: { sortBy: keyof T | null; reversed: boolean; search: string }
) => {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterTableData<T>(data, payload.search);
  }

  return filterTableData<T>(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return compareTableValues(b[sortBy], a[sortBy]);
      }
      return compareTableValues(a[sortBy], b[sortBy]);
    }),
    payload.search
  );
};

export const getFormattedDate = (date: Date) => {
  const meetingDate = new Date(date);
  const formattedDate = meetingDate.toLocaleDateString("en-KE", {
    month: "long",
    year: "numeric",
  });

  const day = meetingDate.getDate();
  const suffix = getDaySuffix(day);

  return `${day}${suffix} ${formattedDate}`;
};

function getDaySuffix(day: number) {
  if (day >= 11 && day <= 13) {
    return "th";
  }

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export const compareDates = (dateA: string | Date, dateB: string | Date) => {
  const convertedDate1 = new Date(dateA);
  const convertedDate2 = new Date(dateB);

  if (convertedDate1 < convertedDate2) {
    return -1;
  } else if (convertedDate1 > convertedDate2) {
    return 1;
  } else {
    return 0;
  }
};
