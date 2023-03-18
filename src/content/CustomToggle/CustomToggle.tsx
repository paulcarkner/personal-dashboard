/******************************************************************

           Name: CustomToggle
    Description: A CSS animated checkbox rendered as a clickable sliding toggle.
    Return Type: JSX.Element
          Props: checked: boolean
                 onChangeHandler?: ChangeEventHandler<HTMLInputElement>
  Redux Actions: (none)
Redux Selectors: (none)

******************************************************************/

import React from "react";

//Styles
import styles from "./CustomToggle.module.css";

//Type Declarations
export type props = {
  checked: boolean;
  onChangeHandler?: React.ChangeEventHandler<HTMLInputElement>;
};

export const CustomToggle = ({
  checked,
  onChangeHandler,
}: props): JSX.Element => {
  return (
    <label className={styles.customToggle}>
      <input
        type="checkbox"
        {...(typeof onChangeHandler === "function"
          ? { onChange: onChangeHandler, checked: checked }
          : { defaultChecked: checked })}
      />
      <div className={styles.customToggleTrack}>
        <div className={styles.customToggleThumb}></div>
      </div>
    </label>
  );
};
