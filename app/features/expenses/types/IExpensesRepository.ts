import { Expense } from "~/models/Expense";

export type IExpenseDTO = {
  title: string;
  amount: string;
  date: string;
};

export interface IExpensesRepository {
  add(expense: IExpenseDTO): Promise<Expense>;
  update(id: string, expense: Expense): Promise<void>;
  remove(id: string): Promise<void>;
  getAll(): Promise<Expense[]>;
  getExpenseById(id: string): Promise<Expense | null>;
}
