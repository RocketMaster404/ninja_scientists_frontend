import { Link } from "react-router-dom";
import "./HeroText.css";

export default function HeroText() {
 return (
    <section className="hero">
      <span className="hero-badge">Träffar för nyfikna</span>
      <h1>Hitta din nästa meetup.</h1>
      <p className="hero-lead">
        Bläddra bland kommande träffar, anmäl dig på ett par klick och håll koll på
        dina anmälningar på ett och samma ställe.
      </p>
      <ul className="hero-checklist">
        <li>Sök och filtrera bland meetups</li>
        <li>Anmäl dig direkt från webben</li>
        <li>Avregistrera dig när planerna ändras</li>
      </ul>
      <Link to="/meetups" className="btn btn-accent">
        Se kommande meetups
      </Link>
    </section>
  );
}
