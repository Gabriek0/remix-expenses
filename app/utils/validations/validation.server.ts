import { Expense } from "~/models/Expense";

export type Errors = {
  title?: string;
  amount?: string;
  date?: string;
};

export type Credentials = {
  email: string;
  password: string;
};

export function validateExpenseInput(expense: Expense): void {
  let errors: Errors = {};

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
    console.log("Aqui");
    throw errors;
  }
}

export function validateCredentials(credentials: Credentials) {
  let validationErrors: Partial<Credentials> = {};

  if (!isValidEmail(credentials.email)) {
    validationErrors.email = "Invalid email address.";
  }

  if (!isValidPassword(credentials.password)) {
    validationErrors.password =
      "Invalid password. Must be at least 7 characters long.";
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
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

const isValidEmail = (value: string) => value && value.includes("@");
const isValidPassword = (value: string) => value && value.trim().length >= 7;
