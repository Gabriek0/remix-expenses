import { Link, NavLink, useLoaderData } from "@remix-run/react";

// Components
import { Logo } from "~/components/Util";

function Header() {
  const userId = useLoaderData<string | null>();

  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
        </ul>
      </nav>
      <nav id="cta-nav">
        <ul>
          <li>
            {userId ? (
              <button className="cta-alt">Logout</button>
            ) : (
              <Link to="/auth" className="cta">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
