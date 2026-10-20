// import "./DetailsPage.css";

// function DetailsPage() {
//   return <div>DetailsPage</div>;
// }

// export default DetailsPage;

// TESTDATA, ta bort sen och sätt det som är ovan:
import DetailsTextBox from "../../components/Details/DetailsTextBox/DetailsTextBox";
import type { MeetupDetail } from "../../components/Details/types/MeetupDetail";

const testMeetup: MeetupDetail = {
    id: 1,
    title: "After work: React för nybörjare",
    description: "Här skriver värden en beskrivning av meetupen.",
    startTime: "2026-11-03T18:00:00",
    endTime: null,
    location: "Lindholmen",
    city: "Göteborg",
    host: "Sara L.",
    categoryName: "Teknik",
};

function DetailsPage() {
    return <DetailsTextBox meetup={testMeetup} />;
}

export default DetailsPage;
