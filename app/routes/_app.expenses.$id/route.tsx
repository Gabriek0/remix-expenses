// Components
import { Modal } from "~/components/Util";
import { ExpenseForm } from "~/components/Expenses";

import { ActionArgs, LoaderArgs, Request, redirect } from "@remix-run/node";
import { expensesRepository } from "~/features/expenses/expenses.server";
import { Expense } from "~/models/Expense";
import { validateExpenseInput } from "~/utils/validations/validation.server";
import { requireUserSession } from "~/features/auth/auth.server";
import { V2_MetaFunction } from "@remix-run/react";

/*
export const loader = async ({ params }: LoaderArgs) => {
  const expenseId = params.id as string;

  const expense = await expensesRepository.getExpenseById(expenseId);

  return json(expense);
};
*/

export const loader = async ({ request }: LoaderArgs) => {
  return await requireUserSession(request as Request);
};

export const action = async ({ params, request }: ActionArgs) => {
  const id = params.id as string;
  const isPatch = request.method === "PATCH";

  if (!isPatch) {
    await expensesRepository.remove(id);

    return { expense_id: id };
  }

  // i'm putting data as unknown first to the after transform in Expense model
  const data = Object.fromEntries(
    await request.formData()
  ) as unknown as Expense;

  const expense: Expense = {
    ...data,
    amount: Number(data.amount),
    date: new Date(data.date),
  };

  try {
    validateExpenseInput(expense);
  } catch (error) {
    console.log(error);

    return error;
  }

  await expensesRepository.update(id, expense);

  // if response was success return to the expenses list
  return redirect("..");
};

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Add Expense | RemixExpenses",
    },
  ];
};

export default function ExpensesDynamicPage() {
  return (
    <Modal>
      <ExpenseForm />
    </Modal>
  );
}
