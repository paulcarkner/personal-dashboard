import React from "react";
import styles from "./ImageLink.module.css";

type props = {
  imgUrl: string;
  linkUrl: string;
};

export const ImageLink = ({ imgUrl, linkUrl }: props): JSX.Element => {
  return (
    <div className={styles.container}>
      <a href={linkUrl} target="_blank" rel="noreferrer">
        <img src={imgUrl} alt="" />
      </a>
    </div>
  );
};
