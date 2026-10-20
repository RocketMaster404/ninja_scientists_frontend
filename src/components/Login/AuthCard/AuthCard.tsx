import type {ReactNode} from "react";
import {NavLink} from "react-router-dom";
import "./AuthCard.css";

interface AuthCardProps {
    children: ReactNode;
}

export default function AuthCard({children}: AuthCardProps){
    return(
        <div className="auth-card">
            <div className="auth-tabs">
                <NavLink
                to="/register"
                className={({isActive}) => (isActive ? "auth-tab active" : "auth-tab")}
                >
                Registrerar
                </NavLink>

            <NavLink
            to="/"
            end
            className={({isActive}) => (isActive ? "auth-tab active" : "auth-tab")}
            >
                Logga in
            </NavLink>
            </div>
            {children}
        </div>
    );
}