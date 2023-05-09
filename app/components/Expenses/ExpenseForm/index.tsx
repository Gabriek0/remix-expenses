import { Form, Link, useActionData } from "@remix-run/react";
import { useEffect, useMemo } from "react";
import { action } from "~/routes/_app.expenses.add/route";
import { Errors } from "~/utils/validations/validation.server";

export function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10

  const action_data = useActionData<Errors>();
  const errors = useMemo(() => Object.values(action_data || []), [action_data]);

  return (
    <Form method="post" className="form" id="expense-form">
      <p>
        <label htmlFor="title">Expense Title</label>
        <input type="text" id="title" name="title" required maxLength={30} />
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
        <button>Save Expense</button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}
