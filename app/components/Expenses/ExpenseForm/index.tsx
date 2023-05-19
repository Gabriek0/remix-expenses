import { useMemo } from "react";
import { LoaderArgs, json } from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { expensesRepository } from "~/features/expenses/expenses.server";

import { Errors } from "~/utils/validations/validation.server";

import { Expense } from "~/models/Expense";

type ExpenseData = {
  title: string;
  amount: string;
  date: string;
};

export function ExpenseForm() {
  // Hooks
  const { state } = useNavigation();
  const action_data = useActionData<Errors>();
  const loader_data = useLoaderData<Expense>();

  // Memo Vars
  const isSubmitting = useMemo(() => state !== "idle", [state]);
  const errors = useMemo(() => Object.values(action_data || []), [action_data]);

  const expense: ExpenseData = useMemo(() => {
    if (!loader_data) {
      return {
        amount: "",
        date: "",
        title: "",
      };
    }

    return {
      amount: String(loader_data.amount),
      date: String(loader_data.date),
      title: loader_data.title,
    };
  }, [loader_data]);

  console.log(expense);

  // Vars
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10

  return (
    <Form method="post" className="form" id="expense-form">
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          defaultValue={loader_data.title}
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
          <input type="date" id="date" name="date" max={today} required />
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
