/******************************************************************

           Name: ImageLink
    Description: Displays a clickable image link
    Return Type: JSX.Element
          Props: imgUrl: string,
                 linkUrl: string
  Redux Actions: (none)
Redux Selectors: (none)

******************************************************************/

import React from "react";

//Styles
import styles from "./ImageLink.module.css";

//Types
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
