import type { Meetup } from "../types/Meetup";

export const mockMeetups: Meetup[] = [
    {
        title: "Bygg en robot med Arduino",
        description:
            "Nybörjarvänlig workshop där alla bygger en enkel robot som undviker hinder. Material finns på plats.",
        startTime: "2026-10-23T18:00:00",
        endTime: "2026-10-23T21:00:00",
        location: "Makerspace Varberg",
        city: "Varberg",
        host: "Omar Hassan",
        capacity: 10,
        categoryId: 4,
        categoryName: "Programmering",
        registrationCount: 3,
    },
    {
        title: "AI och maskininlärning för nybörjare",
        description:
            "Vad är egentligen AI? Vi går igenom grunderna och bygger en liten modell tillsammans.",
        startTime: "2026-11-06T18:00:00",
        endTime: "2026-11-06T20:00:00",
        location: "Tech Hub, Drottninggatan 30",
        city: "Stockholm",
        host: "Johan Berg",
        capacity: 30,
        categoryId: 4,
        categoryName: "Programmering",
        registrationCount: 2,
    },
    {
        title: "Ninja-fysik: rörelse och balans",
        description:
            "Vi utforskar tyngdpunkt, rörelsemängd och balans genom lekfulla övningar i ninja-anda.",
        startTime: "2026-11-15T16:00:00",
        endTime: "2026-11-15T18:00:00",
        location: "Folkets Hus, Sal B",
        city: "Malmö",
        host: "Erik Johansson",
        capacity: 16,
        categoryId: 2,
        categoryName: "Fysik",
        registrationCount: 2,
    },
    {
        title: "Fermentering och mikrobiologi",
        description:
            "Hur fungerar surdeg, kombucha och kimchi? Vi lär oss vetenskapen bakom och provsmakar.",
        startTime: "2026-11-30T17:00:00",
        endTime: "2026-11-30T20:00:00",
        location: "Matlabbet, Linnégatan 5",
        city: "Göteborg",
        host: "Anna Lindqvist",
        capacity: 14,
        categoryId: 1,
        categoryName: "Kemi",
        registrationCount: 1,
    },
];
