import { Outlet } from "react-router-dom";
import Header from "../Header";
import Roll from "../Roll/Roll";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="app-shell">
      <Header />
      <div className="app-content">
        <Outlet />
      </div>
      <Roll />
    </div>
  );
}