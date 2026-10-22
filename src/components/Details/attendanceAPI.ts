import { api } from "../../shared/api/client";

export async function getAttendance(id: number) {
    const response = await api.get(`/api/meetups/${id}/attendance`);
    return response.data;
}

export async function registerToMeetup(id: number) {
    const response = await api.post(`/api/meetups/${id}/registrations`);
    return response.data;
}

export async function unregisterFromMeetup(id: number) {
    const response = await api.delete(`/api/meetups/${id}/registrations`);
    return response.data;
}