import { useState, useEffect } from "react";
import MeetingCard from "../../components/Overview/MeetingCard/MeetingCard";
import SearchBar, {
    type SearchFilters,
} from "../../components/Overview/SearchBar/SearchBar";
import "./OverviewPage.css";
import { getFutureMeetups } from "../../components/Overview/overviewApi";
import type { Meetup } from "../../components/Overview/types/Meetup";
import { matchesDate } from "../../shared/utils/matchesDate";

const emptyFilters: SearchFilters = {
    query: "",
    date: "",
    location: "",
    category: "",
};

function OverviewPage() {
    const [meetups, setMeetups] = useState<Meetup[]>([]);
    const [filters, setFilters] = useState<SearchFilters>(emptyFilters);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getFutureMeetups()
            .then(setMeetups)
            .catch(() =>
                setError("Kunde inte hämta meetups. Försök igen om en stund."),
            )
            .finally(() => setLoading(false));
    }, []);

    const query = filters.query.trim().toLowerCase();
    const visibleMeetups = meetups.filter(
        (m) =>
            (!query || m.title.toLowerCase().includes(query)) &&
            (!filters.location || m.city === filters.location) &&
            (!filters.category || m.categoryName === filters.category) &&
            matchesDate(m.startTime, filters.date),
    );

    return (
        <div>
            <div className="searchbarContainer">
                <SearchBar onSearch={setFilters} />
                {loading && <p>Hämtar meetups…</p>}
                {error && <p>{error}</p>}
                {!loading && !error && visibleMeetups.length === 0 && (
                    <p>Inga meetups matchar din sökning.</p>
                )}
            </div>
            <div className="meetupList">
                {visibleMeetups.map((meetup) => (
                    <MeetingCard key={meetup.title} meetup={meetup} />
                ))}
            </div>
        </div>
    );
}

export default OverviewPage;
