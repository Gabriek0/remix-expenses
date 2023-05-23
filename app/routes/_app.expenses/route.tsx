import { Expense } from "@prisma/client";
import { LinksFunction, LoaderFunction, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { useMemo } from "react";
import { FaDownload, FaPlus } from "react-icons/fa";

// Components
import { ExpensesList } from "~/components/Expenses";
import { expensesRepository } from "~/features/expenses/expenses.server";
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

export const loader: LoaderFunction = async () => {
  const expenses = await expensesRepository.getAll();

  return json(expenses);
};

export default function ExpensesPage() {
  const expenses = useLoaderData<typeof loader>() as Expense[];

  const hasExpenses = useMemo(
    () => expenses && expenses.length > 0,
    [expenses]
  );

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
        {hasExpenses ? (
          <ExpensesList expenses={expenses} />
        ) : (
          <section id="no-expenses">
            <h1>No expenses found</h1>
            <p>
              Start <Link to="add">adding some</Link> today.
            </p>
          </section>
        )}
      </main>
    </>
  );
}
