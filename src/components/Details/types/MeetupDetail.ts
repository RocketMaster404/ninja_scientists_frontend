export interface MeetupDetail {
    id: number;
    title: string;
    description: string;
    startTime: string;
    endTime: string | null;
    location: string;
    city: string;
    host: string;
    categoryName: string;
}
