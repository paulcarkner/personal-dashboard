//convert UNIX time code to DateTime
export function unixToDateTime(unix: number, offset: number): Date {
  return new Date((unix + offset + new Date().getTimezoneOffset() * 60) * 1000);
}
