import { Link } from "react-router-dom";
import type { MyProfileSummary } from "../types/profile";
import ProfileMeetupItem from "../ProfileMeetupItem/ProfileMeetupItem";

interface Props {
  meetups: MyProfileSummary[];
}

function MyRegisterCard({ meetups }: Props) {
  return (
    <section className="profile-card" aria-labelledby="my-registrations-title">
      <h2 id="my-registrations-title" className="profile-card__title">
        Mina anmälningar
      </h2>

      {meetups.length === 0 ? (
        <p className="profile-card__empty">
          Du är inte anmäld till några kommande meetups.{" "}
          <Link to="/overview">Hitta en meetup</Link>
        </p>
      ) : (
        <ul className="profile-card__list">
          {meetups.map((m) => (
            <ProfileMeetupItem key={m.id} meetup={m} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default MyRegisterCard;