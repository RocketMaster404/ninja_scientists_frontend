export interface Review {
    id: number;
    authorName: string;
    rating: number;
    comment: string | null;
    createdAt: string;
}

export interface ReviewSummary {
    averageRating: number;
    totalReviews: number;
}