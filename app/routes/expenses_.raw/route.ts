import { LoaderArgs, Request, V2_MetaFunction } from "@remix-run/node";
import { requireUserSession } from "~/features/auth/auth.server";
import { expensesRepository } from "~/features/expenses/expenses.server";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Raw | RemixExpenses",
    },
  ];
};

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserSession(request as Request);

  return await expensesRepository.getAll(userId);
}
