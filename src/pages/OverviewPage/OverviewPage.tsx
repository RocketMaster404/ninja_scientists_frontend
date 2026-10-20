import { useState,useEffect } from "react";
import MeetingCard from "../../components/Overview/MeetingCard/MeetingCard";
import SearchBar from "../../components/Overview/SearchBar/SearchBar";
import "./OverviewPage.css";
import { getFutureMeetups } from "../../components/Overview/overviewApi";
import type { Meetup } from "../../components/Overview/types/Meetup";

function OverviewPage() {
    const [meetups, setMeetups] = useState<Meetup[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

useEffect(() => {
        getFutureMeetups()
            .then(setMeetups)
            .catch(() => setError("Kunde inte hämta meetups. Försök igen om en stund."))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <SearchBar />
            <div className="meetupList">
                {meetups.map((meetup) => (
                    <MeetingCard key={meetup.title} meetup={meetup} />
                ))}
            </div>
        </div>
    );
}

export default OverviewPage;
