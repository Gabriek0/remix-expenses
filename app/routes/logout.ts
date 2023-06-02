import { ActionArgs, Request, json } from "@remix-run/node";

import { destroyUserSession } from "~/features/auth/auth.server";

export const action = async ({ request }: ActionArgs) => {
  const method = request.method;

  if (method !== "POST") {
    throw json(
      {
        message: "Invalid request method",
      },
      {
        status: 400,
      }
    );
  }

  return destroyUserSession(request as Request);
};
