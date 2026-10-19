import MeetingCard from "../../components/Overview/MeetingCard/MeetingCard";
import SearchBar from "../../components/Overview/SearchBar/SearchBar";
import "./OverviewPage.css";

function OverviewPage() {
    return (
        <div>
            <SearchBar />
            <MeetingCard />
        </div>
    );
}

export default OverviewPage;
