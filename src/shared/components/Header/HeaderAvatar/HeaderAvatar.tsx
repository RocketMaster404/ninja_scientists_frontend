// src/shared/components/Header/HeaderAvatar/HeaderAvatar.tsx
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./HeaderAvatar.css";

export default function HeaderAvatar() {
  const { user, logout } = useAuth();
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

  if (!user) return null;

  async function handleLogout() {
    setOpen(false);
    await logout();
    navigate("/");
  }

  const initial = (user.firstName?.[0] ?? user.email?.[0] ?? "?").toUpperCase();
  const fullName = `${user.firstName} ${user.lastName}`.trim() || user.email;

  return (
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
  );
}