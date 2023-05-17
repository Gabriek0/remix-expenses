import { db } from "~/utils/db.server";
import { Prisma } from "@prisma/client";
import { Expense } from "~/models/Expense";
import { IExpenseDTO, IExpensesRepository } from "./types/IExpensesRepository";

class ExpensesRepository implements IExpensesRepository {
  async add({ title, amount, date }: IExpenseDTO): Promise<Expense> {
    try {
      const expense = await db.expense.create({
        data: {
          title,
          amount: +amount,
          date: new Date(date),
        },
      });

      return expense;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const errorMessage = {
          code: error.code,
          message: error.message,
        };

        console.log(errorMessage);
      }

      throw error;
    }
  }

  async getAll(): Promise<Expense[]> {
    try {
      const expenses = await db.expense.findMany({
        orderBy: {
          date: "desc",
        },
      });

      return expenses;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const errorMessage = {
          code: error.code,
          message: error.message,
        };

        console.log(errorMessage);
      }
      throw error;
    }
  }
}

export const expensesRepository = new ExpensesRepository();
