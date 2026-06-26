import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import "./Auth.css";

function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    const result = register(form);
    if (!result.ok) {
      toast.error(result.message);
      return;
    }

    toast.success("Account created.");
    navigate("/profile");
  };

  return (
    <div className="auth-page">
      <div className="container">
        <form className="auth-shell" onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <p>Save your wishlist, cart, and orders locally on this device.</p>

          <div className="mb-3">
            <label className="form-label" htmlFor="register-name">
              Full name
            </label>
            <input
              id="register-name"
              className="form-control"
              value={form.name}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, name: event.target.value }))
              }
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="register-email">
              Email
            </label>
            <input
              id="register-email"
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
            <label className="form-label" htmlFor="register-password">
              Password
            </label>
            <input
              id="register-password"
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
            Register
          </button>
          <p className="mt-4 mb-0">
            Already registered?{" "}
            <Link className="auth-link" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
