import { useState, useEffect } from "react";
import axios from "axios";
import MeetingCard from "../../components/Overview/MeetingCard/MeetingCard";
import SearchBar, {
    type SearchFilters,
} from "../../components/Overview/SearchBar/SearchBar";
import "./OverviewPage.css";
import { searchMeetups } from "../../components/Overview/overviewApi";
import type { Meetup } from "../../components/Overview/types/Meetup";

const emptyFilters: SearchFilters = {
    query: "",
    date: "",
    dateRange: 0,
    location: "",
    category: "",
};

function OverviewPage() {
    const [meetups, setMeetups] = useState<Meetup[]>([]);
    const [filters, setFilters] = useState<SearchFilters>(emptyFilters);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    function handleSearch(newFilters: SearchFilters) {
        setLoading(true);
        setError(null);
        setFilters(newFilters);
    }

    useEffect(() => {
        let cancelled = false;

        searchMeetups(filters)
            .then((data) => {
                if (!cancelled) setMeetups(data);
            })
            .catch((err) => {
                if (cancelled) return;

                const message =
                    axios.isAxiosError(err) &&
                    typeof err.response?.data === "string" &&
                    err.response.data
                        ? err.response.data
                        : "Kunde inte hämta meetups. Försök igen om en stund.";
                setMeetups([]);
                setError(message);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [filters]);

    return (
        <div>
            <div className="searchbarContainer">
                <SearchBar onSearch={handleSearch} />
                {loading && <p>Hämtar meetups…</p>}
                {error && <p>{error}</p>}
                {!loading && !error && meetups.length === 0 && (
                    <p>Inga meetups matchar din sökning.</p>
                )}
            </div>
            <div className="meetupList">
                {meetups.map((meetup) => (
                    <MeetingCard key={meetup.id} meetup={meetup} />
                ))}
            </div>
        </div>
    );
}

export default OverviewPage;
