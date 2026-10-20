import {api} from "../../shared/api/client"

export async function getCategories() {
    const response = await api.get("/api/overview/categories");
    return response.data;
}

export async function getCities() {
    const response = await api.get("/api/overview/cities");
    return response.data;
}

export async function getFutureMeetups() {
    const response = await api.get("/api/overview");
    return response.data;
}