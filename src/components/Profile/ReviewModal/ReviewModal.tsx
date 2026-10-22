import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import axios from "axios";
import { useAuth } from "../../../shared/context/AuthContext";
import { createReview } from "../../Details/reviewAPI";
import "./ReviewModal.css";

interface Props {
  meetupId: number;
  meetupTitle: string;
  onClose: () => void;
  onReviewed: () => void;
}

const MAX_COMMENT = 2000;

// Backend skickar felet som vanlig text, t.ex. "Du har redan recenserat den här träffen."
function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data;
    if (typeof data === "string" && data) return data;
    if (err.response?.status === 401)
      return "Du måste vara inloggad för att recensera.";
  }
  return "Något gick fel. Försök igen.";
}

export default function ReviewModal({
  meetupId,
  meetupTitle,
  onClose,
  onReviewed,
}: Props) {
  const { user } = useAuth();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authorName = user?.firstName?.trim() || "Anonym";

  // Öppnar dialogen som modal: bakgrund, Esc och fokusfälla ingår
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (rating === 0) {
      setError("Välj ett betyg mellan 1 och 5 stjärnor.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await createReview(meetupId, rating, comment.trim());
      onReviewed();
      onClose();
    } catch (err) {
      setError(getErrorMessage(err));
      setSubmitting(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="review-modal"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        // Klick på bakgrunden (själva dialog-elementet) stänger
        if (e.target === e.currentTarget && !submitting) onClose();
      }}
    >
      <form className="review-modal__form" onSubmit={handleSubmit}>
        <h2 id={titleId} className="review-modal__title">
          Recensera meetup
        </h2>
        <p className="review-modal__meetup">{meetupTitle}</p>

        <p className="review-modal__author">
          {authorName}
          <span className="review-modal__verified">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              role="img"
              aria-label="Verifierad deltagare"
            >
              <circle cx="12" cy="12" r="11" fill="var(--success)" />
              <path
                d="M7 12.5l3.2 3.2L17 8.9"
                fill="none"
                stroke="#fff"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Verifierad deltagare
          </span>
        </p>

        <fieldset className="review-modal__stars">
          <legend>Betyg</legend>
          <div
            className="review-modal__star-row"
            onMouseLeave={() => setHover(0)}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <label
                key={n}
                className={`review-modal__star ${
                  n <= (hover || rating) ? "review-modal__star--on" : ""
                }`}
                onMouseEnter={() => setHover(n)}
              >
                <input
                  type="radio"
                  name="rating"
                  value={n}
                  checked={rating === n}
                  onChange={() => setRating(n)}
                  className="review-modal__star-input"
                  aria-label={`${n} av 5 stjärnor`}
                />
                <span aria-hidden="true">★</span>
              </label>
            ))}
          </div>
          <p className="review-modal__rating-text">
            {rating === 0 ? "Inget betyg valt" : `Valt betyg: ${rating} av 5`}
          </p>
        </fieldset>

        <div className="review-modal__field">
          <label htmlFor="review-comment">Kommentar (valfri)</label>
          <textarea
            id="review-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={MAX_COMMENT}
            rows={5}
            placeholder="Berätta hur det var…"
          />
          <span className="review-modal__counter">
            {comment.length} / {MAX_COMMENT}
          </span>
        </div>

        {error && (
          <div role="alert" className="alert alert-error">
            {error}
          </div>
        )}

        <div className="review-modal__actions">
          <button
            type="button"
            className="btn"
            onClick={onClose}
            disabled={submitting}
          >
            Avbryt
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? "Skickar…" : "Skicka recension"}
          </button>
        </div>
      </form>
    </dialog>
  );
}
