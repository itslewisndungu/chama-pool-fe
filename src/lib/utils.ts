import { keys } from "@mantine/utils";

export const getFormattedCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KSH",
  }).format(amount);
};
