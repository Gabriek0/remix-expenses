import { Expense } from "@prisma/client";
import {
  HeadersFunction,
  LinksFunction,
  LoaderArgs,
  LoaderFunction,
  Request,
  json,
} from "@remix-run/node";
import { Link, Outlet, V2_MetaFunction, useLoaderData } from "@remix-run/react";
import { useMemo } from "react";
import { FaDownload, FaPlus } from "react-icons/fa";

// Components
import { ExpensesList } from "~/components/Expenses";
import { requireUserSession } from "~/features/auth/auth.server";
import { expensesRepository } from "~/features/expenses/expenses.server";

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

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const userId = await requireUserSession(request as Request);

  const expenses = await expensesRepository.getAll(userId);

  return json(expenses, {
    headers: {
      "Cache-Control": "max-age=3",
    },
  });
};

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
  "Cache-Control": loaderHeaders.get("Cache-Control") as string,
});

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Expenses | RemixExpenses",
    },
  ];
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
