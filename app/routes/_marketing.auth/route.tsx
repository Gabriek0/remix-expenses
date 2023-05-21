import { ActionArgs, LinksFunction } from "@remix-run/node";

// Components
import AuthForm from "~/components/AuthForm";

// Styles
import styles from "~/styles/auth.css";

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

  if (mode === "signup") {
  }
  if (mode === "login") {
  }
}

export default function AuthPage() {
  return <AuthForm />;
}
