import { api } from "../../shared/api/client";
import type { SearchFilters } from "./SearchBar/SearchBar";
import type { Meetup } from "./types/Meetup";

export async function getCategories() {
    const response = await api.get("/api/overview/categories");
    return response.data;
}

export async function getCities() {
    const response = await api.get("/api/overview/cities");
    return response.data;
}


function toIsoDate(d: Date): string {
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${month}-${day}`;
}

const extraDays: Record<string, number> = {
    today: 0,
    week: 6,
    month: 30,
};


export async function searchMeetups(filters: SearchFilters): Promise<Meetup[]> {
    const params: Record<string, string> = {};

    const search = filters.query.trim();
    if (search) params.search = search;
    if (filters.location) params.city = filters.location;
    if (filters.category) params.category = filters.category;

    const days = extraDays[filters.date];
    if (days !== undefined) {
        const start = new Date();
        const end = new Date();
        end.setDate(start.getDate() + days);
        params.startDate = toIsoDate(start);
        params.endDate = toIsoDate(end);
    }

    const response = await api.get<Meetup[]>("/api/overview/searchbar", { params });
    return response.data;
}