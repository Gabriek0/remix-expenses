import { ActionArgs, LinksFunction, redirect } from "@remix-run/node";

// Components
import AuthForm from "~/components/AuthForm";
import { signup } from "~/features/auth/auth.server";

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

  if (mode === "signup") {
    try {
      await signup(credentials);
      return redirect("/expenses");
    } catch (err) {
      if (err instanceof Error) {
        if (err.stack === "EMAIL_ALREADY_EXISTS")
          return { credentials: err.message };
      }

      return null;
    }
  }

  if (mode === "login") {
  }
}

export default function AuthPage() {
  return <AuthForm />;
}
