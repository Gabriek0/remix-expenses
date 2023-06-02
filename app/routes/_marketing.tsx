import {
  HeadersFunction,
  LinksFunction,
  LoaderArgs,
  LoaderFunction,
  Request,
} from "@remix-run/node";

import { Outlet } from "@remix-run/react";

// Components
import Header from "~/components/Header";
import { getUserFromSession } from "~/features/auth/auth.server";

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

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  return await getUserFromSession(request as Request);
};

export const headers: HeadersFunction = () => ({
  "Cache-Control": "max-age=3600", // 60 minutes
});

export default function MarketingParentPage() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
