import { Expense } from "~/models/Expense";

export type IExpenseDTO = {
  title: string;
  amount: string;
  date: string;
};

export interface IExpensesRepository {
  add(expense: IExpenseDTO): Promise<Expense>;
}