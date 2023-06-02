import { db } from "~/utils/db.server";
import { Prisma } from "@prisma/client";
import { Expense } from "~/models/Expense";
import { IExpenseDTO, IExpensesRepository } from "./types/IExpensesRepository";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

class ExpensesRepository implements IExpensesRepository {
  async add({ title, amount, date, userId }: IExpenseDTO): Promise<Expense> {
    try {
      const expense = await db.expense.create({
        data: {
          title,
          amount: +amount,
          date: new Date(date),
          User: { connect: { id: userId } },
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

      throw new Error("Failed to add expense.");
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

      throw new Error("Failed to remove expense.");
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

      throw new Error("Failed to update expense.");
    }
  }

  async getAll(userId: string): Promise<Expense[]> {
    try {
      const expenses = await db.expense.findMany({
        where: {
          userId,
        },
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
      throw new Error("Faile to get all expenses.");
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

      throw new Error(`Failed to get expense with id: ${id}.`);
    }
  }
}

export const expensesRepository = new ExpensesRepository();
