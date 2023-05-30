import { db } from "~/utils/db.server";
import { Credentials } from "~/utils/validations/validation.server";

export async function signup({ email, password }: Credentials) {
  console.log(password);

  const existingUser = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (existingUser) {
    const error = new Error(
      "A user with the provided email address exists already."
    );

    throw error;
  }
}
