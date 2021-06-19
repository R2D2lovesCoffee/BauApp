export function getFormatedDate(date?: Date): Date {
    let formattedDate = date || new Date();
    formattedDate.setHours(-(formattedDate.getTimezoneOffset() / 60), 0, 0, 0);
    return formattedDate;
}

export function isWeekend(date?: Date): boolean {
    let actualDate = getFormatedDate(date);
    const dayOfWeek = actualDate.getDay();
    return dayOfWeek === 6 || dayOfWeek === 0;
}