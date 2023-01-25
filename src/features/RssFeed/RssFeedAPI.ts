//const { parse } = require("rss-to-json"); //npm "rss-to-json"
import parse from "rss-to-json";
//import { RssFeedType, RssFeedItemType } from "./RssFeedTypes";

//Retrieves a RSS feed and converts it to a JSON object
export function fetchUrl(url: string) {
  return new Promise<{ data: any }>((resolve) => {
    parse(url).then((data) => {
      resolve({ data: data });
    });
  });
}
