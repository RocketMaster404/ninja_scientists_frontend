// src/shared/components/Header/Header.tsx
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import HeaderAvatar from "./HeaderAvatar/HeaderAvatar";
import "./Header.css";

export default function Header() {
    const { user, loading } = useAuth();

    return (
        <header className="header">
            <div className="header-inner">
                <Link
                    to={user ? "/overview" : "/"}
                    className="header-logo"
                    aria-label="Meetly startsida"
                >
                    <svg
                        width="34"
                        height="24"
                        viewBox="0 0 34 24"
                        aria-hidden="true"
                    >
                        <circle cx="12" cy="12" r="11" fill="var(--buttons)" />
                        <circle
                            cx="22"
                            cy="12"
                            r="11"
                            fill="var(--warning)"
                            opacity="0.9"
                        />
                    </svg>
                    <span>Meetly</span>
                </Link>

                <nav className="header-nav">
                    <NavLink to="/overview" className="header-link">
                        Meetups
                    </NavLink>

                    {loading ? null : user ? (
                        <HeaderAvatar />
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
