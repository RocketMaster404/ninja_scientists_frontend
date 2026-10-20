// src/shared/components/Header/Header.tsx
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

export default function Header() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Stäng dropdownen vid klick utanför eller Escape
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  async function handleLogout() {
    setOpen(false);
    await logout();
    navigate("/");
  }

  const initial = (user?.firstName?.[0] ?? user?.email?.[0] ?? "?").toUpperCase();
  const fullName = user ? `${user.firstName} ${user.lastName}`.trim() || user.email : "";

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo" aria-label="Meetly startsida">
          <svg width="34" height="24" viewBox="0 0 34 24" aria-hidden="true">
            <circle cx="12" cy="12" r="11" fill="var(--buttons)" />
            <circle cx="22" cy="12" r="11" fill="var(--warning)" opacity="0.9" />
          </svg>
          <span>Meetly</span>
        </Link>

        <nav className="header-nav">
          <NavLink to="/overview" className="header-link">
            Meetups
          </NavLink>

          {loading ? null : user ? (
            <div className="header-menu" ref={menuRef}>
              <button
                type="button"
                className="header-avatar"
                onClick={() => setOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label="Öppna användarmeny"
              >
                {initial}
              </button>

              {open && (
                <div className="header-dropdown" role="menu">
                  <div className="header-dropdown-name">{fullName}</div>
                  <Link to="/profile" role="menuitem" onClick={() => setOpen(false)}>
                    Min profil
                  </Link>
                  <button type="button" role="menuitem" onClick={handleLogout}>
                    Logga ut
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/" end className="header-link">
              Logga in
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}