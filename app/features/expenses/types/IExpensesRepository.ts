import { Expense } from "~/models/Expense";

export type IExpenseDTO = {
  userId: string;
  title: string;
  amount: string;
  date: string;
};

export interface IExpensesRepository {
  add(expense: IExpenseDTO): Promise<Expense>;
  update(id: string, expense: Expense): Promise<void>;
  remove(id: string): Promise<void>;
  getAll(id: string): Promise<Expense[]>;
  getExpenseById(id: string): Promise<Expense | null>;
}
