import { useMemo } from "react";

// React Icons
import { FaLock, FaUserPlus } from "react-icons/fa";

import { Link, useSearchParams } from "@remix-run/react";

export default function AuthForm() {
  const [searchParams] = useSearchParams();

  const authMode = useMemo(
    () => searchParams.get("mode") || "login",
    [searchParams]
  );

  return (
    <form method="post" className="form" id="auth-form">
      <div className="icon-img">
        {authMode === "login" ? <FaLock /> : <FaUserPlus />}
      </div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
      </p>
      <div className="form-actions">
        <button>{authMode === "login" ? "Login" : "Create User"}</button>
        <Link to={`${authMode === "login" ? "?mode=signup" : "?mode=login"}`}>
          {authMode === "login"
            ? "Log in with existing user"
            : "Create a new user"}
        </Link>
      </div>
    </form>
  );
}
