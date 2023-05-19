import { useMemo } from "react";

import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useMatches,
  useNavigation,
  useParams,
} from "@remix-run/react";

import { Errors } from "~/utils/validations/validation.server";

import { Expense } from "~/models/Expense";

export function ExpenseForm() {
  // Hooks
  const { id } = useParams();
  const { state } = useNavigation();
  const loader_data = useMatches();
  const action_data = useActionData<Errors>();

  // Memo Vars
  const isSubmitting = useMemo(() => state !== "idle", [state]);
  const errors = useMemo(() => Object.values(action_data || []), [action_data]);

  const expense = useMemo(() => {
    const route_data = loader_data.find(
      (data) => data.id === "routes/_app.expenses"
    )?.data as Expense[];

    const data = route_data.find((d) => d.id === id) ?? null;

    if (!data) {
      return {
        amount: "",
        date: "",
        title: "",
      };
    }

    return {
      title: data.title,
      amount: String(data.amount),
      date: String(data.date).slice(0, 10),
    };
  }, [loader_data]);

  // Vars
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10

  return (
    <Form method="post" className="form" id="expense-form">
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          defaultValue={expense.title}
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            defaultValue={expense.amount}
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            defaultValue={expense.date}
            type="date"
            id="date"
            name="date"
            max={today}
            required
          />
        </p>
      </div>

      {errors.length > 0 && (
        <ul>
          {errors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Expense"}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}
