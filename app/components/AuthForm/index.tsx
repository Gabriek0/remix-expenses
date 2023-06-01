import { useMemo } from "react";

// React Icons
import { FaLock, FaUserPlus } from "react-icons/fa";

import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";

import { action } from "~/routes/_marketing.auth/route";

export default function AuthForm() {
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();

  const action_data = useActionData<typeof action>();

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

  const errors = useMemo(() => Object.values(action_data || []), [action_data]);

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

      {errors.length > 0 && (
        <ul>
          {errors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      <div className="form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Authenticating..." : button_caption}
        </button>
        <Link to={`${authMode === "login" ? "?mode=signup" : "?mode=login"}`}>
          {authMode === "login"
            ? "Create a new user"
            : "Login with existing user"}
        </Link>
      </div>
    </Form>
  );
}
