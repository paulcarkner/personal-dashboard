/*****************

Name: RssFeed
Description: Creates a list of articles from an RSS feed
Props: *!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!
Output: JSX.Element

*****************/

import React, { useEffect } from "react";

//Redux Imports
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { RssFeedType, RssFeedItemType } from "./RssFeedSlice"; //type import
import { RssFeedFetchUrl, FeedSelector } from "./RssFeedSlice"; //action/selector import

//Styles
import styles from "./RssFeed.module.css";

//Type Declarations
type Props = {
  url: string;
};

export const RssFeed: React.FC<Props> = ({ url }: Props) => {
  const feed: RssFeedType | undefined = useAppSelector(FeedSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(RssFeedFetchUrl(url));
  }, [url]);

  return (
    <div className={`${styles.RssFeed} customScroll`}>
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
