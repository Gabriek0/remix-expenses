import { Expense } from "~/models/Expense";

export function validateExpenseInput(expense: Expense): void {
  let errors = {
    title: "",
    amount: "",
    date: "",
  };

  if (!isValidTitle(expense.title)) {
    errors.title = "Invalid expense title. Must be at most 30 characters long.";
  }

  if (!isValidAmount(String(expense.amount))) {
    errors.amount = "Invalid amount. Must be a number greater than zero.";
  }

  if (!isValidDate(String(expense.date))) {
    errors.date = "Invalid date. Must be a date before today.";
  }

  if (Object.keys(errors).length > 0) {
    throw errors;
  }
}

const isValidTitle = (title: string): boolean =>
  !!(title && title.trim().length > 0 && title.trim().length <= 30);

const isValidDate = (date: string): boolean =>
  !!(date && new Date(date).getTime() < new Date().getTime());

const isValidAmount = (value: string) => {
  const amount = parseFloat(value);

  return !isNaN(amount) && amount > 0;
};
