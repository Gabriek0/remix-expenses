import { LinksFunction, MetaFunction } from "@remix-run/node";
import { Outlet, V2_MetaFunction } from "@remix-run/react";
import { ExpensesHeader } from "~/components/Expenses";

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

export default function ExpensesParentPage() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />
    </>
  );
}
