import { Form, Link, useFetcher } from "@remix-run/react";
import { Expense } from "~/models/Expense";

interface Props {
  expense_item: ExpenseItem;
}

type ExpenseItem = Omit<Expense, "created_at">;

export function ExpenseListItem({ expense_item }: Props) {
  const fetcher = useFetcher();

  // open a modal when delete expense item

  function deleteExpenseItemHandler() {
    const isConfirmed = confirm(
      "Are you sure you want to delete this Expense?"
    );

    if (!isConfirmed) return;

    // the first arg is data
    fetcher.submit(null, {
      method: "delete",
      action: `/expenses/${expense_item.id}`,
    });
  }

  if (fetcher.state === "submitting") {
    return (
      <article className="expense-item locked">
        <p>Deleting...</p>
      </article>
    );
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{expense_item.title}</h2>
        <p className="expense-amount">${expense_item.amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        <Link to={expense_item.id as string}>Edit</Link>
      </menu>
    </article>
  );
}
