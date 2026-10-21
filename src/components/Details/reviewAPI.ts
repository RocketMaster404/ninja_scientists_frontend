import { api } from "../../shared/api/client";

export async function getReviews(id: number) {
    const response = await api.get(`/api/meetups/${id}/reviews`);
    return response.data;
}

export async function getReviewSummary(id: number) {
    const response = await api.get(`/api/meetups/${id}/reviews/summary`);
    return response.data;
}