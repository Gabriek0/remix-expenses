import { db } from "~/utils/db.server";

// Validations
import {
  Credentials,
  validateEmailExistence,
} from "~/utils/validations/validation.server";

import { compare, hash } from "bcrypt";

export async function signup({ email, password }: Credentials) {
  await validateEmailExistence(email);

  const password_hashed = await hash(password, 12);
  await db.user.create({
    data: {
      email,
      password: password_hashed,
    },
  });
}

export async function login({ email, password }: Credentials) {
  const credentials = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (!credentials) {
    const error = new Error("User does not exist.");
    error.stack = "USER_NOT_FOUND";

    throw error;
  }

  const isPasswordValid = compare(password, credentials.password);

  if (!isPasswordValid) {
    const error = new Error("Password is invalid.");
    error.stack = "PASSWORD_INVALID";

    throw error;
  }
}
