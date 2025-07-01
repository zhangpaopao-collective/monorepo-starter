import dayjs from 'dayjs'

/**
 * Format a given date to a specific format string using day.js
 * @param date - The date to be formatted, can be a Date object, timestamp, or string
 * @param format - The format string, default is 'YYYY-MM-DD HH:mm:ss'
 * @returns The formatted date string
 */
export function formatDate(date: dayjs.ConfigType, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
  return dayjs(date).format(format)
}
