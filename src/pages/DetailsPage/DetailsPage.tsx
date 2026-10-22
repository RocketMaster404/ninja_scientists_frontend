import "./DetailsPage.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DetailsTextBox from "../../components/Details/DetailsTextBox/DetailsTextBox";
import ReviewCard from "../../components/Details/ReviewCard/ReviewCard";
import AttendeeBox from "../../components/Details/AttandeeBox/AttendeeBox";
import type { MeetupDetail } from "../../components/Details/types/MeetupDetail";
import { getMeetingDetails } from "../../components/Details/detailAPI";

function DetailsPage() {
    const { id } = useParams();
    const [meetup, setMeetup] = useState<MeetupDetail | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) {
            return;
        }

        getMeetingDetails(Number(id))
            .then((data) => setMeetup(data))
            .catch(() => setError("Meetupen kunde inte hämtas."));
    }, [id]);

    if (error) {
    return (
        <div className="details-error">
            <h1>Meetupen hittades inte</h1>
            <p>Den kanske har tagits bort, eller så är adressen fel.</p>
            <Link to="/overview" className="details-error-button">
                Tillbaka till meetups
            </Link>
        </div>
    );
}

    if (!meetup) {
        return <p>Laddar...</p>;
    }

    return (
    <div className="details-page">
        <Link to="/overview" className="details-back">
            ‹ Tillbaka till alla meetups
        </Link>

        <div className="details-columns">
            <div className="details-body">
                <DetailsTextBox meetup={meetup} />
                <ReviewCard meetupId={meetup.id} />
            </div>
            <aside className="details-side">
                <AttendeeBox meetupId={meetup.id} />
            </aside>
        </div>
    </div>
);
}

export default DetailsPage;
