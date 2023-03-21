/******************************************************************

           Name: fetchUrl
    Description: Fetch RSS feed from a url and prepare for manipulation
    Return Type: any
          Props: url: string

******************************************************************/

import parse from "rss-to-json";

//Retrieves a RSS feed and converts it to a JSON object
export function fetchUrl(url: string) {
  return new Promise<{ data: any }>((resolve) => {
    parse(url).then((data) => {
      resolve({ data: data });
    });
  });
}
