export interface Meetup {
    id: number
    title: string;
    description: string;
    startTime: string;
    endTime: string | null;
    location: string;
    city: string;
    host: string;
    capacity: number;
    categoryId: number;
    categoryName: string;
    registrationCount: number;
}