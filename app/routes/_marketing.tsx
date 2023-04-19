import { LinksFunction } from "@remix-run/node";

import { Outlet } from "@remix-run/react";

// Components
import Header from "~/components/Header";

// Styles
import styles from "~/styles/marketing.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

export default function MarketingParentPage() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
