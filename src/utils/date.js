export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const getFormattedTime = (date) => {
    const hour = date.getHours()
    const Min = date.getMinutes()

    const timeFormat = `${(24 - hour) < 12 ? 'PM' : 'AM'}`

    return `
    ${hour > 12 ? (hour - 12 < 10 ? `0${hour - 12}` : hour - 12) : hour < 10 ? hour === 0 ? `12` : `0${hour - 12}` : hour}:${Min >= 10 ? Min : `0${Min}`} ${timeFormat}`
}

export const getFormattedPostDate = (date, requiresTime = false) => {
    date = new Date(date)
    let time = getFormattedTime(date)
    return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()} ${requiresTime ? `At ${time}` : ""}`
}
