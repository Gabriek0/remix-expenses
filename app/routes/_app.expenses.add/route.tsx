import { Modal } from "~/components/Util";
import { ExpenseForm } from "~/components/Expenses";

import {
  ActionArgs,
  LoaderArgs,
  Request,
  V2_MetaFunction,
} from "@remix-run/node";

import { Expense as ExpenseType } from "~/models/Expense";
import { redirect } from "react-router";
import { expensesRepository } from "~/features/expenses/expenses.server";
import { validateExpenseInput } from "~/utils/validations/validation.server";
import { requireUserSession } from "~/features/auth/auth.server";

type Expense = Omit<ExpenseType, "id" | "created_at">;

export async function loader({ request }: LoaderArgs) {
  return requireUserSession(request as Request);
}

export async function action({ request }: ActionArgs) {
  const userId = await requireUserSession(request as Request);

  const form = Object.fromEntries(await request.formData()) as unknown;
  const data = form as Expense;

  try {
    validateExpenseInput(data);
  } catch (error) {
    return error;
  }

  await expensesRepository.add({
    userId,
    title: data.title,
    amount: String(data.amount),
    date: String(data.date),
  });

  return redirect("..");
}

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Add Expense | RemixExpenses",
    },
  ];
};

export default function ExpensesAddPage() {
  return (
    <Modal>
      <ExpenseForm />
    </Modal>
  );
}
