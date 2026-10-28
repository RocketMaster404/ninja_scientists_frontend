import "./AttendeeBox.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../shared/context/AuthContext";
import AttendeeProgress from "../../../shared/components/AttendeeProgress/AttendeeProgress";
import type { Attendance } from "../types/Attendance";
import {
    getAttendance,
    registerToMeetup,
    unregisterFromMeetup,
} from "../attendanceAPI";

interface Props {
    meetupId: number;
}

function AttendeeBox({ meetupId }: Props) {
    const { user, loading } = useAuth();
    const [attendance, setAttendance] = useState<Attendance | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getAttendance(meetupId).then((data) => setAttendance(data));
    }, [meetupId]);

    async function handleRegister() {
        setIsLoading(true);
        try {
            setAttendance(await registerToMeetup(meetupId));
        } catch {
            alert("Det gick inte att anmäla dig. Försök igen.");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleUnregister() {
        setIsLoading(true);
        try {
            setAttendance(await unregisterFromMeetup(meetupId));
        } catch {
            alert("Det gick inte att avanmäla dig.");
        } finally {
            setIsLoading(false);
        }
    }

    if (!attendance) {
        return null;
    }

    return (
        <div className="attendee-box">
            <h2>
                {user && attendance.isRegistered && !attendance.isCompleted ? (
                    <span className="attendee-title-registered">
                        <span className="attendee-check">✓</span> Anmäld
                    </span>
                ) : (
                    "Anmälan"
                )}
            </h2>

            <AttendeeProgress
                registered={attendance.registeredCount}
                capacity={attendance.capacity}
            />

            {attendance.isCompleted && <button disabled>Genomförd</button>}

            {!attendance.isCompleted && !loading && !user && (
                <Link to="/" className="attendee-login">
                    Logga in för att anmäla dig
                </Link>
            )}

            {!attendance.isCompleted && user && attendance.isRegistered && (
                <button
                    className="attendee-unregister"
                    onClick={handleUnregister}
                    disabled={isLoading}
                >
                    {isLoading ? "Avanmäler..." : "Avanmäl"}
                </button>
            )}

            {!attendance.isCompleted &&
                user &&
                !attendance.isRegistered &&
                attendance.isFull && <button disabled>Fullt</button>}

            {!attendance.isCompleted &&
                user &&
                !attendance.isRegistered &&
                !attendance.isFull && (
                    <button onClick={handleRegister} disabled={isLoading}>
                        {isLoading ? "Anmäler..." : "Anmäl dig"}
                    </button>
                )}
        </div>
    );
}

export default AttendeeBox;
