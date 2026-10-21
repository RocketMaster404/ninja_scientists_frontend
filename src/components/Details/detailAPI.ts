import { api } from "../../shared/api/client";

export async function getMeetingDetails(id: number) {
    const response = await api.get(`/api/meetups/${id}/details`);
    return response.data;
}
