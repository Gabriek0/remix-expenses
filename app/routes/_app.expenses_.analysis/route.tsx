// Components
import { json } from "@remix-run/node";
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { Chart, ExpenseStatistics } from "~/components/Expenses";
import { Error as ErrorComponent } from "~/components/Util";
import { expensesRepository } from "~/features/expenses/expenses.server";

// DATA MOCK
import { Expense } from "~/models/Expense";

export const loader = async () => {
  const expenses = await expensesRepository.getAll();

  if (!expenses.length)
    throw json({ error: 404, message: "No expense was found." });

  return expenses;
};

export default function ExpensesAnalysisPage() {
  const expenses = useLoaderData<typeof loader>() as unknown as Expense[];

  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <ErrorComponent>
        <p>{error.data?.message}</p>
        <p>
          I want to add expenses <Link to="/expenses/add">Add</Link>.
        </p>
      </ErrorComponent>
    );
  } else {
    <ErrorComponent>
      <p>No Expense was found.</p>
      <p>
        I want to add expenses <Link to="/expenses/add">Add</Link>.
      </p>
    </ErrorComponent>;
  }
}
