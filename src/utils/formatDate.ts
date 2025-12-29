export function formatDate(date: Date) {
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}