import type { MeetupDetail } from "../types/MeetupDetail";
import "./DetailsTextBox.css";
import { formatDate } from "../../../shared/utils/formatDate";
import { categoryImages } from "./CategoryImages/categoryImages";

interface Props {
    meetup: MeetupDetail;
}

function DetailsTextBox({ meetup }: Props) {
    const image = categoryImages[meetup.categoryName];

    return (
        <div className="details-textbox">
            <div
                className={image ? "details-hero details-hero-image" : "details-hero"}
                style={image ? { backgroundImage: `url(${image})` } : undefined}
            >
                <span className="details-category">{meetup.categoryName}</span>
            </div>

            <h1>{meetup.title}</h1>

            <div className="details-info">
                <p>{formatDate(meetup.startTime)}</p>
                <p>
                    {meetup.city} · {meetup.location}
                </p>
                <p>Värd: {meetup.host}</p>
            </div>

            <h2>Om meetupen</h2>
            <p>{meetup.description}</p>
        </div>
    );
}

export default DetailsTextBox;