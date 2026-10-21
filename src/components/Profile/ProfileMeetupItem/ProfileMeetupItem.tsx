import { useState } from "react";
import { Link } from "react-router-dom";
import type { MyProfileSummary } from "../types/profile";
import { formatDate } from "../../../shared/utils/formatDate";
import ReviewModal from "../ReviewModal/ReviewModal";
import "./ProfileMeetupItem.css";

interface Props {
  meetup: MyProfileSummary;
  reviewable?: boolean; // true bara för tidigare meetups
}

// Månad som kort text i datumrutan: "okt", inte "okt."
const monthShort = (d: Date) =>
  d.toLocaleDateString("sv-SE", { month: "short" }).replace(".", "");

const timeOf = (d: Date) =>
  d.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });

export default function ProfileMeetupItem({ meetup, reviewable = false }: Props) {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewed, setReviewed] = useState(meetup.hasReviewed);

  // Texten saknar tidszon, så den tolkas som lokal tid
  const start = new Date(meetup.startTime);
  const end = meetup.endTime ? new Date(meetup.endTime) : null;
  const endText = end ? `–${timeOf(end)}` : "";

  return (
    <li className="profile-item">
      <div className="profile-item__date" aria-hidden="true">
        <span className="profile-item__month">{monthShort(start)}</span>
        <span className="profile-item__day">{start.getDate()}</span>
      </div>

      <div className="profile-item__info">
        <h3 className="profile-item__title">
          <Link to={`/meetups/${meetup.id}`} className="profile-item__link">
            {meetup.title}
          </Link>
        </h3>
        <p className="profile-item__meta">
          <time dateTime={meetup.startTime}>
            {formatDate(meetup.startTime)}
            {endText}
          </time>
        </p>
        <p className="profile-item__meta">
          {meetup.location}, {meetup.city}
        </p>
      </div>

      <span className="profile-item__category">{meetup.category}</span>

      {reviewable &&
        (reviewed ? (
          <span className="profile-item__reviewed">✓ Recenserad</span>
        ) : (
          <button
            type="button"
            className="btn profile-item__review-btn"
            aria-haspopup="dialog"
            aria-label={`Recensera ${meetup.title}`}
            onClick={() => setReviewOpen(true)}
          >
            Recensera
          </button>
        ))}

      {reviewOpen && (
        <ReviewModal
          meetupId={meetup.id}
          meetupTitle={meetup.title}
          onClose={() => setReviewOpen(false)}
          onReviewed={() => setReviewed(true)}
        />
      )}
    </li>
  );
}