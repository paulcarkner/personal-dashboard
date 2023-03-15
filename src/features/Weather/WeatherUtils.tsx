//convert UNIX time code to DateTime
export function UNIXtoDateTime(unix: number, offset: number): Date {
  return new Date((unix + offset) * 1000);
}
