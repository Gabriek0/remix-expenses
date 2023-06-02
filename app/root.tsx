import { LinksFunction, V2_MetaFunction } from "@remix-run/node";

import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useMatches,
  useRouteError,
} from "@remix-run/react";
import { ReactNode, useMemo } from "react";

// Styles
import styles from "~/styles/root.css";
import { Error as ErrorComponent } from "./components/Util";

interface Props {
  children: ReactNode;
}

export const links: LinksFunction = () => {
  return [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: undefined,
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap",
    },
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "Home | RemixExpenses",
    },
    {
      property: "og:title",
      content: "RemixExpenses",
    },
    {
      name: "description",
      content: "RemixExpenses is a application to store your expenses.",
    },
  ];
};

function Document({ children }: Props) {
  const matches = useMatches();

  const isDisabled = matches.some((match) => match.handle?.disableJS);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        {!isDisabled && <Scripts />}
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  const route_error = useMemo(() => {
    if (isRouteErrorResponse(error)) {
      return error;
    }

    if (error instanceof Error) {
      return {
        statusText: "An error occurred",
        data: {
          message: error.message,
        },
      };
    }

    return {
      statusText: "Error unknown",
      data: {
        message: "Something went wrong. Please try again later.",
      },
    };
  }, [error]);

  return (
    <Document>
      <main>
        <ErrorComponent title={route_error.statusText}>
          <p>
            {route_error.data?.message ||
              "Something went wrong. Please try again later."}
          </p>
          <p>
            Back to <Link to="/">safety</Link>.
          </p>
        </ErrorComponent>
      </main>
    </Document>
  );
}
