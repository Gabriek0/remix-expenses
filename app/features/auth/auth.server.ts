import { db } from "~/utils/db.server";

// Validations
import {
  Credentials,
  validateEmailExistence,
} from "~/utils/validations/validation.server";

import { compare, hash } from "bcrypt";
import { Request, createCookieSessionStorage, redirect } from "@remix-run/node";

const SESSION_SECRET = process.env.SESSION_SECRET as string;

// generate secure cookie
const sessionStorage = createCookieSessionStorage({
  cookie: {
    // name: "_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true, // to client side access cookie
  },
});

async function createUserSession(userId: string, path: string) {
  const session = await sessionStorage.getSession();

  session.set("userId", userId);

  // let's redirect user to expenses and send cookie data in Set-Cookie
  return redirect(path, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function getUserFromSession(request: Request) {
  const userId = request.headers.get("Cookie");

  return userId ? userId : null;
}

export async function signup({ email, password }: Credentials) {
  await validateEmailExistence(email);

  const password_hashed = await hash(password, 12);

  const credentials = await db.user.create({
    data: {
      email,
      password: password_hashed,
    },
  });

  return createUserSession(credentials.id, "/expenses");
}

export async function login({ email, password }: Credentials) {
  const credentials = await db.user.findFirst({
    where: {
      email,
    },
  });

  console.log(credentials);

  if (!credentials) {
    const error = new Error("User does not exist.");
    error.stack = "USER_NOT_FOUND";

    throw error;
  }

  const isPasswordValid = await compare(password, credentials.password);

  if (!isPasswordValid) {
    const error = new Error("Password is invalid.");
    error.stack = "PASSWORD_INVALID";

    throw error;
  }

  return await createUserSession(credentials.id, "/expenses");
}
