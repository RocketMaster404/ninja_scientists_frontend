export type DateFilter = "" | "today" | "week" | "month";

const daysAhead: Record<Exclude<DateFilter, "">, number> = {
    today: 1,
    week: 7,
    month: 31,
};

export function matchesDate(startTime: string, filter: string): boolean {
    if (!filter) return true;

    const days = daysAhead[filter as Exclude<DateFilter, "">];
    if (!days) return true;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const end = new Date(today);
    end.setDate(today.getDate() + days);

    const start = new Date(startTime);
    return start >= today && start < end;
}
