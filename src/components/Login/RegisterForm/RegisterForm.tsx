import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../shared/api/auth";
import "../LoginForm/LoginForm.css";

const emptyForm = { firstName: "", lastName: "", email: "", password: "" };

export default function RegisterForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
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

    const result = await registerUser(form);

    if (result.success) {
      // Tillbaka till inloggningen med ett grönt meddelande
      navigate("/", { state: { registered: true } });
      return;
    }

    setErrors(result.errors);
    setLoading(false);
  }

  return (
    <>
      <h2 className="form-title">Skapa konto</h2>

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
        <label htmlFor="firstName">Förnamn</label>
        <input
          id="firstName"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          maxLength={50}
          required
        />

        <label htmlFor="lastName">Efternamn</label>
        <input
          id="lastName"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          maxLength={50}
          required
        />

        <label htmlFor="email">E-post</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="namn@blank.se"
          value={form.email}
          onChange={handleChange}
          maxLength={256}
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          title="Ange en e-postadress med @ och en domän, till exempel namn@blank.se"
          required
        />

        <label htmlFor="password">Lösenord</label>
        <input
          id="password"
          name="password"
          type="password"
          minLength={6}
          value={form.password}
          onChange={handleChange}
          required
        />

        <p className="form-link">
          Har du redan ett konto? <Link to="/">Logga in</Link>
        </p>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Skapar konto..." : "Registrera"}
        </button>
      </form>
    </>
  );
}
