import { LinksFunction } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
import { FaDownload, FaPlus } from "react-icons/fa";

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
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>

          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        <ExpensesList expenses={expenses_data_mock} />
      </main>
    </>
  );
}
