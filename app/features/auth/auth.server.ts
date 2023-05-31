import { db } from "~/utils/db.server";
import { Credentials } from "~/utils/validations/validation.server";

import { hash } from "bcrypt";

export async function signup({ email, password }: Credentials) {
  const existingUser = await db.user.findFirst({
    where: {
      email,
    },
  });

  const password_hashed = await hash(password, 12);

  if (existingUser) {
    const error = new Error(
      "A user with the provided email address exists already."
    );

    error.stack = "EMAIL_ALREADY_EXISTS";

    throw error;
  }

  await db.user.create({
    data: {
      email,
      password: password_hashed,
    },
  });
}
