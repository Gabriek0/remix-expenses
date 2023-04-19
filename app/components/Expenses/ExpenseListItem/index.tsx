import { Link } from "@remix-run/react";
import { Expense } from "~/models/Expense";

interface Props {
  expense_item: ExpenseItem;
}

type ExpenseItem = Omit<Expense, "created_at">;

export function ExpenseListItem({ expense_item }: Props) {
  function deleteExpenseItemHandler() {
    // tbd
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{expense_item.title}</h2>
        <p className="expense-amount">${expense_item.amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        <button onClick={deleteExpenseItemHandler}>Delete</button>
        <Link to={expense_item.id}>Edit</Link>
      </menu>
    </article>
  );
}
