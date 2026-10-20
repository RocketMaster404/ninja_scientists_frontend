import "./MeetingCard.css";
import InfoRow from "./InfoRow/InfoRow";
import { CalendarIcon, PinIcon, UserIcon } from "./Icons/Icons";
import type { Meetup } from "../types/Meetup";
import { formatDate } from "../../../shared/utils/formatDate";

type MeetingCardProps = {
    meetup: Meetup;
};

function MeetingCard({ meetup }: MeetingCardProps) {
    const percent = Math.min(
        (meetup.registrationCount / meetup.capacity) * 100,
        100,
    );

    return (
        <div className="meetingCard">
            <p className="categoryBadge">{meetup.categoryName}</p>

            <div className="titleContainer">
                <h1>{meetup.title}</h1>
            </div>

            <div className="infoContainer">
                <InfoRow icon={<CalendarIcon />}>
                    {formatDate(meetup.startTime)}
                </InfoRow>
                <InfoRow icon={<PinIcon />}>
                    {meetup.location}, {meetup.city}
                </InfoRow>
                <InfoRow icon={<UserIcon />}>Värd: {meetup.host}</InfoRow>
            </div>

            <div className="attendeesContainer">
                <div className="progressTrack">
                    <div
                        className="progressFill"
                        style={{ width: `${percent}%` }}
                    />
                </div>
                <p className="attendeesText">
                    {meetup.registrationCount} av {meetup.capacity} platser
                    anmälda
                </p>
            </div>

            <div className="buttonContainer">
                <button>Läs mer</button>
            </div>
        </div>
    );
}

export default MeetingCard;
