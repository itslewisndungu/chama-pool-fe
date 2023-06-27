import { keys } from "@mantine/utils";

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
  const formattedDate = new Date(date).toLocaleDateString("en-KE", {
    month: "long",
    year: "numeric",
  });
  const day = date.getDate();
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
