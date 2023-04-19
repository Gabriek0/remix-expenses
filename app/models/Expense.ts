import { v4 as uuid } from "uuid";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  created_at: Date;
}

export const expenses_data_mock: Expense[] = [
  {
    id: uuid(),
    title: "Expense 1",
    amount: 16.9,
    created_at: new Date(),
  },
  {
    id: uuid(),
    title: "Expense 2",
    amount: 11.15,
    created_at: new Date(),
  },
  {
    id: uuid(),
    title: "Expense 3",
    amount: 35.1,
    created_at: new Date(),
  },
];
