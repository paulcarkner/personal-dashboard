/******************************************************************

           Name: unixToDateTime
    Description: Converts a time from UNIX time code to JS Date
    Return Type: Date
          Props: unix: number,
                 pffset: number

******************************************************************/

export function unixToDateTime(unix: number, offset: number): Date {
  return new Date((unix + offset + new Date().getTimezoneOffset() * 60) * 1000);
}
