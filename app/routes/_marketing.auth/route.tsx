import { ActionArgs, LinksFunction, redirect } from "@remix-run/node";
import { FaBreadSlice } from "react-icons/fa";

// Components
import AuthForm from "~/components/AuthForm";
import { login, signup } from "~/features/auth/auth.server";

// Styles
import styles from "~/styles/auth.css";
import {
  Credentials,
  validateCredentials,
} from "~/utils/validations/validation.server";

type Mode = "signup" | "login";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

export async function action({ request }: ActionArgs) {
  // const credentials = Object.fromEntries(await request.formData());

  // here we get search params from our current url
  const search_params = new URL(request.url).searchParams;
  const mode = search_params.get("mode") as Mode;

  const credentials = Object.fromEntries(
    await request.formData()
  ) as unknown as Credentials;

  try {
    validateCredentials(credentials);
  } catch (err) {
    console.log(err);

    return err;
  }

  try {
    if (mode === "signup") {
      return await signup(credentials);
    }
    if (mode === "login") {
      return await login(credentials);
    }
  } catch (err) {
    if (err instanceof Error) {
      switch (err.stack) {
        case "EMAIL_ALREADY_EXISTS":
          return { credentials: err.message };
        case "USER_NOT_FOUND":
          return { credentials: err.message };
        case "PASSWORD_INVALID":
          return { credentials: err.message };
        default:
          break;
      }
    }
  }

  return null;
}

export default function AuthPage() {
  return <AuthForm />;
}
