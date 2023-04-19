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
          <ExpenseListItem title={expense.title} amount={expense.amount} />
        </li>
      ))}
    </ol>
  );
}
