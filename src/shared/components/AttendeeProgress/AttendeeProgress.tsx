import "./AttendeeProgress.css";

interface Props {
    registered: number;
    capacity: number;
}

function AttendeeProgress({ registered, capacity }: Props) {
    const percent =
        capacity > 0 ? Math.min((registered / capacity) * 100, 100) : 0;

    return (
        <div className="attendee-progress">
            <div className="attendee-progress-track">
                <div
                    className="attendee-progress-fill"
                    style={{ width: `${percent}%` }}
                />
            </div>
            <p className="attendee-progress-text">
                {registered} av {capacity} platser anmälda
            </p>
        </div>
    );
}

export default AttendeeProgress;