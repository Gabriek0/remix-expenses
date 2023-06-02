import { LoaderArgs, Request } from "@remix-run/node";
import { requireUserSession } from "~/features/auth/auth.server";
import { expensesRepository } from "~/features/expenses/expenses.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserSession(request as Request);

  return await expensesRepository.getAll(userId);
}
