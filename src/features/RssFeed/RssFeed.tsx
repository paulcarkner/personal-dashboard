/******************************************************************

           Name: RssFeed
    Description: Creates a list of articles from an RSS feed
    Return Type: JSX.Element
          Props: url: string
  Redux Actions: rssFeedFetchUrl
Redux Selectors: feedSelector: rssFeedType,
                 feedStateSelector: rssFeedStateType

******************************************************************/

import React, { useEffect } from "react";

//Styles
import styles from "./RssFeed.module.css";

//Redux Imports
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { rssFeedType, rssFeedItemType, rssFeedStateType } from "./RssFeedSlice"; //type import
import {
  rssFeedFetchUrl,
  feedSelector,
  feedStateSelector,
} from "./RssFeedSlice"; //action/selector import

//Types
type props = {
  url: string;
};

export const RssFeed: React.FC<props> = ({ url }: props): JSX.Element => {
  const feed: rssFeedType | undefined = useAppSelector(feedSelector);
  const feedState: rssFeedStateType | undefined =
    useAppSelector(feedStateSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(rssFeedFetchUrl(url));
  }, [dispatch, url]);

  return (
    <div
      className={`${styles.rssFeed} customScroll ${
        feedState.status === "loading" ? "loading" : ""
      }`}
    >
      {feed?.items?.map((movie: rssFeedItemType, index: number) => (
        <a
          key={index}
          className={styles.feedLink}
          href={movie.link}
          target="_blank"
          rel="noreferrer"
        >
          <div className={styles.feedImageContainer}>
            <img
              src={
                Array.from(
                  movie.content_encoded.matchAll(
                    /<img\s.*?src=(?:'|")([^'">]+)(?:'|")/gi
                  ),
                  (m) => m[1]
                ).pop()
                //find image and get src value from feed content
              }
              alt="Movie Poster"
            />
          </div>
          <div className={styles.feedText}>
            <div className={styles.feedTitle}>{movie.title}</div>
            <div className={styles.feedDescription}>{movie.description}</div>
          </div>
        </a>
      ))}
    </div>
  );
};
