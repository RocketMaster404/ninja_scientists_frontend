import { useEffect, useRef, useState } from "react";
import "./roll.css";

const SECRET = "ninja";

export default function Roll() {
  const [open, setOpen] = useState(false);
  const typed = useRef("");

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      // Ignorera när man skriver i ett fält, annars triggas den av t.ex. "scroll" i en text
      const target = event.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key.length !== 1) return;

      // Spara bara de senaste tecknen
      typed.current = (typed.current + event.key.toLowerCase()).slice(-SECRET.length);

      if (typed.current === SECRET) {
        typed.current = "";
        setOpen(true);
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (!open) return null;

  return (
    <div className="rickroll-backdrop" onClick={() => setOpen(false)}>
      <iframe
        className="rickroll-video"
        src="https://www.youtube.com/embed/ZBGmxZnYC_g?autoplay=1"
        title="Rickroll"
        allow="autoplay; encrypted-media"
        allowFullScreen
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}