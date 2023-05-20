import { db } from "~/utils/db.server";
import { Prisma } from "@prisma/client";
import { Expense } from "~/models/Expense";
import { IExpenseDTO, IExpensesRepository } from "./types/IExpensesRepository";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

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

  async remove(id: string): Promise<void> {
    try {
      await db.expense.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        const errorMessage = {
          message: error.message,
          code: error.code,
        };

        console.log(errorMessage);
      }

      throw error;
    }
  }

  async update(id: string, expense: Expense): Promise<void> {
    try {
      await db.expense.update({
        where: {
          id,
        },
        data: expense,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        const errorMessage = {
          message: error.message,
          code: error.code,
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

  async getExpenseById(id: string): Promise<Expense | null> {
    try {
      const expense = await db.expense.findFirst({
        where: {
          id,
        },
      });

      return expense;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        const errorMessage = {
          message: error.message,
          code: error.code,
        };

        console.log(errorMessage);
      }

      throw error;
    }
  }
}

export const expensesRepository = new ExpensesRepository();
