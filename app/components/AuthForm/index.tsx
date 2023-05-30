import { useMemo } from "react";

// React Icons
import { FaLock, FaUserPlus } from "react-icons/fa";

import { Form, Link, useNavigation, useSearchParams } from "@remix-run/react";

export default function AuthForm() {
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();

  const authMode = useMemo(
    () => searchParams.get("mode") || "login",
    [searchParams]
  );

  const isSubmitting = useMemo(
    () => navigation.state !== "idle",
    [navigation.state]
  );

  const button_caption = useMemo(
    () => (authMode === "login" ? "Login" : "Create User"),
    [authMode]
  );

  return (
    <Form method="post" className="form" id="auth-form">
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
        <button disabled={isSubmitting}>
          {isSubmitting ? "Authenticating..." : button_caption}
        </button>
        <Link to={`${authMode === "login" ? "?mode=signup" : "?mode=login"}`}>
          {authMode === "login"
            ? "Login with existing user"
            : "Create a new user"}
        </Link>
      </div>
    </Form>
  );
}
