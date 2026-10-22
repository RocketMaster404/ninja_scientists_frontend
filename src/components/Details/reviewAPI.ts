import { api } from "../../shared/api/client";
import type { Review } from "./types/Review";

export async function getReviews(id: number) {
    const response = await api.get(`/api/meetups/${id}/reviews`);
    return response.data;
}

export async function getReviewSummary(id: number) {
    const response = await api.get(`/api/meetups/${id}/reviews/summary`);
    return response.data;
}

export async function createReview(
    meetupId: number,
    rating: number,
    comment: string,
): Promise<Review> {
    const response = await api.post<Review>(`/api/meetups/${meetupId}/reviews`, {
        rating,
        comment,
    });
    return response.data;
}