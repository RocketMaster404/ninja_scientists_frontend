export interface Attendance {
    meetupId: number;
    capacity: number;
    registeredCount: number;
    isFull: boolean;
    isCompleted: boolean;
    isRegistered: boolean;
}