import type { ReactNode } from "react";
import "./InfoRow.css";

interface InfoRowProps {
  icon: ReactNode;
  children: ReactNode;
}

function InfoRow({ icon, children }: InfoRowProps) {
  return (
    <p className="infoRow">
      <span className="infoRow__icon" aria-hidden="true">
        {icon}
      </span>
      {children}
    </p>
  );
}

export default InfoRow;