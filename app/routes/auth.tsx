import { LinksFunction } from "@remix-run/node";

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
  return (
    <>
      <h1>Auth</h1>
    </>
  );
}
