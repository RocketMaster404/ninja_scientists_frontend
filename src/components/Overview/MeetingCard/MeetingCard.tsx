import "./MeetingCard.css";
import InfoRow from "./InfoRow/InfoRow";
import { CalendarIcon, PinIcon, UserIcon } from "./Icons/Icons";
import type { Meetup } from "../types/Meetup";
import { formatDate } from "../../../shared/utils/formatDate";
import AttendeeProgress from "../../../shared/components/AttendeeProgress/AttendeeProgress";
import { useNavigate } from "react-router-dom";

type MeetingCardProps = {
    meetup: Meetup;
};

function MeetingCard({ meetup }: MeetingCardProps) {
    const navigate = useNavigate();

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

            <AttendeeProgress
                registered={meetup.registrationCount}
                capacity={meetup.capacity}
            />

            <div className="buttonContainer">
                <button onClick={() => navigate(`/meetups/${meetup.id}`)}>
                    Läs mer
                </button>
            </div>
        </div>
    );
}

export default MeetingCard;
