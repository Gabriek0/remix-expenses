import { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

// Styles
import styles from "~/styles/expenses.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

export default function ExpensesPage() {
  return (
    <main>
      <p>Shared element!</p>
      <Outlet />
    </main>
  );
}
