import { api } from "../../shared/api/client";
import { addDays, parseIsoDate, toIsoDate } from "../../shared/utils/isoDate";
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

export async function searchMeetups(filters: SearchFilters): Promise<Meetup[]> {
    const params: Record<string, string> = {};

    const search = filters.query.trim();
    if (search) params.search = search;
    if (filters.location) params.city = filters.location;
    if (filters.category) params.category = filters.category;

    if (filters.date) {
        const chosen = parseIsoDate(filters.date);
        const today = parseIsoDate(toIsoDate(new Date()));

        let start = addDays(chosen, -filters.dateRange);
        const end = addDays(chosen, filters.dateRange);

        if (start < today && end >= today) start = today;

        params.startDate = toIsoDate(start);
        params.endDate = toIsoDate(end);
    }

    const response = await api.get<Meetup[]>("/api/overview/searchbar", {
        params,
    });
    return response.data;
}
