// Components
import { Modal } from "~/components/Util";
import { ExpenseForm } from "~/components/Expenses";

import { LoaderArgs, json } from "@remix-run/node";
import { expensesRepository } from "~/features/expenses/expenses.server";

export const loader = async ({ params }: LoaderArgs) => {
  const expenseId = params.id as string;

  const expense = await expensesRepository.getExpenseById(expenseId);

  return json(expense);
};

export default function ExpensesDynamicPage() {
  return (
    <Modal>
      <ExpenseForm />
    </Modal>
  );
}
