import React from "react";
import styles from "./ImageLink.module.css";

type Props = {
  imgUrl: string;
  linkUrl: string;
};

export const ImageLink = ({ imgUrl, linkUrl }: Props): JSX.Element => {
  return (
    <div className={styles.Container}>
      <a href={linkUrl} target="_blank" rel="noreferrer">
        <img src={imgUrl} alt="" />
      </a>
    </div>
  );
};
