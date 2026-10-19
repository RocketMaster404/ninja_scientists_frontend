import MeetingCard from "../../components/Overview/MeetingCard/MeetingCard";
import SearchBar from "../../components/Overview/SearchBar/SearchBar";
import "./OverviewPage.css";
import { mockMeetups } from "../../components/Overview/FakeData/mockMeetups";

function OverviewPage() {
    return (
        <div>
            <SearchBar />
            <div className="meetupList">
                {mockMeetups.map((meetup) => (
                    <MeetingCard key={meetup.title} meetup={meetup} />
                ))}
            </div>
        </div>
    );
}

export default OverviewPage;
