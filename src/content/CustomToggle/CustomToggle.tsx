import React from "react";
import styles from "./CustomToggle.module.css";

export type Props = {
  checked: boolean;
  onChangeHandler?: React.ChangeEventHandler<HTMLInputElement>;
};

export const CustomToggle = ({
  checked,
  onChangeHandler,
}: Props): JSX.Element => {
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
