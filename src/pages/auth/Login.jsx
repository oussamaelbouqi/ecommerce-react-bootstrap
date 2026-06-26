import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import "./Auth.css";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = login(form);

    if (!result.ok) {
      toast.error(result.message);
      return;
    }

    toast.success("Welcome back.");
    navigate(from, { replace: true });
  };

  return (
    <div className="auth-page">
      <div className="container">
        <form className="auth-shell" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <p>Access your profile, checkout, and order history.</p>

          <div className="mb-3">
            <label className="form-label" htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              className="form-control"
              value={form.email}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, email: event.target.value }))
              }
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              className="form-control"
              value={form.password}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, password: event.target.value }))
              }
              required
            />
          </div>

          <button className="auth-submit" type="submit">
            Login
          </button>
          <p className="mt-4 mb-0">
            New customer?{" "}
            <Link className="auth-link" to="/register">
              Create account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
