import {
  Form,
  Link,
  NavLink,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";

// Components
import { Logo } from "~/components/Util";

export function ExpensesHeader() {
  const fetcher = useFetcher();

  const handleSubmit = () =>
    fetcher.submit(null, {
      method: "post",
      action: "/logout",
    });

  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/expenses" end>
              Manage Expenses
            </NavLink>
          </li>
          <li>
            <NavLink to="/expenses/analysis">Analyze Expenses</NavLink>
          </li>
        </ul>
      </nav>
      <nav id="cta-nav">
        <button onClick={handleSubmit} className="cta">
          Logout
        </button>
      </nav>
    </header>
  );
}
