import { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

// Components
import { ExpensesList } from "~/components/Expenses";
import { expenses_data_mock } from "~/models/Expense";

// Styles
import styles from "~/styles/expenses.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

export default function ExpensesPage() {
  return (
    <>
      <Outlet />
      <main>
        <ExpensesList expenses={expenses_data_mock} />
      </main>
    </>
  );
}
