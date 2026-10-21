import type { MyProfileSummary } from "../types/profile";
import ProfileMeetupItem from "../ProfileMeetupItem/ProfileMeetupItem";

interface Props {
  meetups: MyProfileSummary[];
}

function PreviousMeetupsCard({ meetups }: Props) {
  return (
    <section className="profile-card" aria-labelledby="previous-meetups-title">
      <h2 id="previous-meetups-title" className="profile-card__title">
        Tidigare meetups
      </h2>

      {meetups.length === 0 ? (
        <p className="profile-card__empty">Du har inga tidigare meetups ännu.</p>
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

export default PreviousMeetupsCard;