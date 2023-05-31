import { db } from "~/utils/db.server";

// Validations
import {
  Credentials,
  validateEmailExistence,
} from "~/utils/validations/validation.server";

import { compare, hash } from "bcrypt";
import { createCookieSessionStorage } from "@remix-run/node";

const SESSION_SECRET = process.env.SESSION_SECRET as string;

// generate secure cookie
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true, // to client side access cookie
  },
});

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
