// Components
import { LoaderArgs, Request, json } from "@remix-run/node";
import {
  Link,
  V2_MetaFunction,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { Chart, ExpenseStatistics } from "~/components/Expenses";
import { Error as ErrorComponent } from "~/components/Util";
import { requireUserSession } from "~/features/auth/auth.server";
import { expensesRepository } from "~/features/expenses/expenses.server";

// DATA MOCK
import { Expense } from "~/models/Expense";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserSession(request as Request);
  const expenses = await expensesRepository.getAll(userId);

  if (!expenses.length)
    throw json({ error: 404, message: "No expense was found." });

  return expenses;
};

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Analysis | RemixExpenses",
    },
  ];
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
      <main>
        <ErrorComponent>
          <p>{error.data?.message}</p>
          <p>
            I want to add expenses <Link to="/expenses/add">Add</Link>.
          </p>
        </ErrorComponent>
      </main>
    );
  } else {
    <main>
      <ErrorComponent>
        <p>No Expense was found.</p>
        <p>
          I want to add expenses <Link to="/expenses/add">Add</Link>.
        </p>
      </ErrorComponent>
      ;
    </main>;
  }
}
