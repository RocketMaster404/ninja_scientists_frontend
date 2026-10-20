// src/components/Login/LoginForm/LoginForm.tsx
import { useState, type ChangeEvent, type SyntheticEvent} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../shared/context/AuthContext";
import "./LoginForm.css";

export default function LoginForm() {
  const { user, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Sätts av registreringssidan när kontot just skapats
  const justRegistered =
    (location.state as { registered?: boolean } | null)?.registered === true;

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrors([]);

    const result = await login(form.email, form.password);
    if (result.success){
      navigate("/overview");
      return
    }
    
    setErrors(result.errors)
    setLoading(false);
  }

  return (
    <>
      <h2 className="form-title">Välkommen tillbaka</h2>

      {justRegistered && !user && (
        <div className="alert alert-success" role="status">
          Ditt konto är skapat! Logga in med dina uppgifter.
        </div>
      )}

      {errors.length > 0 && (
        <div className="alert alert-error" role="alert">
          <ul>
            {errors.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="email">E-post</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="namn@blank.se"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Lösenord</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {/* Länken mellan lösenordet och inloggningsknappen */}
        <p className="form-link">
          Inget konto? <Link to="/register">Registrera dig</Link>
        </p>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Loggar in..." : "Logga in"}
        </button>
      </form>

      {user && (
        <div className="alert alert-success" role="status">
          Du är inloggad. Kul att se dig igen!
          <br />
          <Link to="/overview">Gå till meetups</Link>
        </div>
      )}
    </>
  );
}