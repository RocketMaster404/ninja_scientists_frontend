import { Link } from "react-router-dom";
import type { MyProfileSummary } from "../types/profile";
import "./ProfileMeetupItem.css";

interface Props {
  meetup: MyProfileSummary;
}

const monthShort = (d: Date) =>
  d.toLocaleDateString("sv-SE", { month: "short" }).replace(".", "");
const timeOf = (d: Date) =>
  d.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });

export default function ProfileMeetupItem({ meetup }: Props) {
  // Texten saknar tidszon, så den tolkas som lokal tid
  const start = new Date(meetup.startTime);
  const end = meetup.endTime ? new Date(meetup.endTime) : null;
  const timeText = end ? `${timeOf(start)}–${timeOf(end)}` : timeOf(start);
  const dateText = start.toLocaleDateString("sv-SE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <li className="profile-item">
      <div className="profile-item__date" aria-hidden="true">
        <span className="profile-item__month">{monthShort(start)}</span>
        <span className="profile-item__day">{start.getDate()}</span>
      </div>

      <div className="profile-item__info">
        <h3 className="profile-item__title">
          <Link to={`/details/${meetup.id}`} className="profile-item__link">
            {meetup.title}
          </Link>
        </h3>
        <p className="profile-item__meta">
          <time dateTime={meetup.startTime}>
            {dateText}, {timeText}
          </time>
        </p>
        <p className="profile-item__meta">
          {meetup.location}, {meetup.city}
        </p>
      </div>

      <span className="profile-item__category">{meetup.category}</span>
    </li>
  );
}