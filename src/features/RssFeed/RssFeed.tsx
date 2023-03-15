/*****************

Name: RssFeed
Description: Creates a list of articles from an RSS feed
Props: url: string;
Output: JSX.Element

*****************/

import React, { useEffect } from "react";

//Redux Imports
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { RssFeedType, RssFeedItemType, RssFeedStateType } from "./RssFeedSlice"; //type import
import {
  RssFeedFetchUrl,
  FeedSelector,
  FeedStateSelector,
} from "./RssFeedSlice"; //action/selector import

//Styles
import styles from "./RssFeed.module.css";

//Type Declarations
type Props = {
  url: string;
};

export const RssFeed: React.FC<Props> = ({ url }: Props): JSX.Element => {
  const feed: RssFeedType | undefined = useAppSelector(FeedSelector);
  const feedState: RssFeedStateType | undefined =
    useAppSelector(FeedStateSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(RssFeedFetchUrl(url));
  }, [dispatch, url]);

  return (
    <div
      className={`${styles.RssFeed} customScroll ${
        feedState.status === "loading" ? "loading" : ""
      }`}
    >
      {feed?.items?.map((movie: RssFeedItemType, index: number) => (
        <a
          key={index}
          className={styles.FeedLink}
          href={movie.link}
          target="_blank"
          rel="noreferrer"
        >
          <div className={styles.FeedImageContainer}>
            <img
              src={Array.from(
                movie.content_encoded.matchAll(
                  /<img\s.*?src=(?:'|")([^'">]+)(?:'|")/gi
                ),
                (m) => m[1]
              ).pop()}
              alt="Movie Poster"
            />
          </div>
          <div className={styles.FeedText}>
            <div className={styles.FeedTitle}>{movie.title}</div>
            <div className={styles.FeedDescription}>{movie.description}</div>
          </div>
        </a>
      ))}
    </div>
  );
};
