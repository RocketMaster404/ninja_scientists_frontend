import type { MeetupDetail } from "../types/MeetupDetail";
import "./DetailsTextBox.css";

interface Props{
  meetup: MeetupDetail
}

function DetailsTextBox({ meetup } : Props) {
  return(
  <div className="details-textbox">
    <span className="details-category">{meetup.categoryName}</span>
      <h1>{meetup.title}</h1>
      <div className="details-info">
        <p>{meetup.startTime}</p>
        <p>{meetup.city}  · {meetup.location}</p>
        <p>Värd: {meetup.host}</p>
      </div>
      <h2>Om meetupen</h2>
        <p>{meetup.description}</p>
    </div>
  )
}

export default DetailsTextBox;
