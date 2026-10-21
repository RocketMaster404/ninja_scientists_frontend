export function formatDate(isoString: string): string {
    return new Date(isoString).toLocaleString("sv-SE", {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });
}
