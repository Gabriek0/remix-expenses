import { ExpenseListItem } from "~/components/Expenses";
import { Expense } from "~/models/Expense";

interface Props {
  expenses: Expense[];
}

export function ExpensesList({ expenses }: Props) {
  return (
    <ol id="expenses-list">
      {expenses.map((expense) => (
        <li key={expense.id}>
          <ExpenseListItem
            expense_item={{
              id: expense.id,
              amount: expense.amount,
              title: expense.title,
              date: expense.date,
            }}
          />
        </li>
      ))}
    </ol>
  );
}
