import "./MeetingCard.css";
import InfoRow from "./InfoRow/InfoRow";
import { CalendarIcon, PinIcon, UserIcon } from "./Icons/Icons";

export interface MeetingData {
  category: string;
  title: string;
  date: string;
  location: string;
  host: string;
  attendees: number;
  capacity: number;
}

function MeetingCard() {
  const data: MeetingData = {
    category: "Kategori",
    title: "Titel",
    date: "2026-10-19",
    location: "Plats",
    host: "Värd",
    attendees: 12,
    capacity: 20,
  };

  const percent = Math.min((data.attendees / data.capacity) * 100, 100);

  return (
    <div className="meetingCard">
      <p className="categoryBadge">{data.category}</p>

      <div className="titleContainer">
        <h1>{data.title}</h1>
      </div>

      <div className="infoContainer">
        <InfoRow icon={<CalendarIcon />}>{data.date}</InfoRow>
        <InfoRow icon={<PinIcon />}>{data.location}</InfoRow>
        <InfoRow icon={<UserIcon />}>Värd: {data.host}</InfoRow>
      </div>

      <div className="attendeesContainer">
        <div className="progressTrack">
          <div className="progressFill" style={{ width: `${percent}%` }} />
        </div>
        <p className="attendeesText">
          {data.attendees} av {data.capacity} platser anmälda
        </p>
      </div>

      <div className="buttonContainer">
        <button>Läs mer</button>
      </div>
    </div>
  );
}

export default MeetingCard;