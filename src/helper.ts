export function getFormatedDate(date?: Date): Date {
    let formattedDate = date || new Date();
    formattedDate.setHours(-(formattedDate.getTimezoneOffset() / 60), 0, 0, 0);
    return formattedDate;
}