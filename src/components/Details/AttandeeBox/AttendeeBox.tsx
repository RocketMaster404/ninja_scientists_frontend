import "./AttendeeBox.css";
import { useEffect, useState } from "react";
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
            alert("Du måste vara inloggad för att anmäla dig.");
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

    const percent = Math.min(
        (attendance.registeredCount / attendance.capacity) * 100,
        100,
    );

    return (
        <div className="attendee-box">
            <h2>Anmälan</h2>

            <div className="attendee-track">
                <div
                    className="attendee-fill"
                    style={{ width: `${percent}%` }}
                />
            </div>
            <p className="attendee-text">
                {attendance.registeredCount} av {attendance.capacity} platser
                anmälda
            </p>
            {attendance.isCompleted && <button disabled>Genomförd</button>}
            {!attendance.isCompleted && attendance.isRegistered && (
                <>
                    <button disabled>Anmäld</button>
                    <button
                        className="attendee-unregister"
                        onClick={handleUnregister}
                        disabled={isLoading}
                    >
                        {isLoading ? "Avanmäler..." : "Avanmäl"}
                    </button>
                </>
            )}

            {!attendance.isCompleted &&
                !attendance.isRegistered &&
                attendance.isFull && <button disabled>Fullt</button>}

            {!attendance.isCompleted &&
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
