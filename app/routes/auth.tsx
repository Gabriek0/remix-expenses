import { LinksFunction } from "@remix-run/node";

// Components
import AuthForm from "~/components/AuthForm";

// Styles
import styles from "~/styles/auth.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

export default function AuthPage() {
  return <AuthForm />;
}
