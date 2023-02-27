import React, { forwardRef } from "react";
import styles from "./DashboardSettings.module.css";

import { CustomToggle } from "./../../content/CustomToggle/CustomToggle";

//Redux Imports
import { useAppSelector, useAppDispatch } from "./../../app/hooks";
import { isDarkSelector, toggleDarkMode } from "./../DarkMode/DarkModeSlice";

export type DialogProps = {
  closeDialog: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const DashboardSettings = forwardRef<HTMLDialogElement, DialogProps>(
  (props, ref) => {
    const isDark: boolean = useAppSelector(isDarkSelector);
    const dispatch = useAppDispatch();

    const toggleDarkModeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(toggleDarkMode());
    };

    return (
      <dialog ref={ref} className={styles.Dialog}>
        <div className={styles.Container}>
          <h3 className={styles.ModalTitle}>Settings</h3>
          <div className={styles.Setting}>
            <div>Dark Mode</div>
            <CustomToggle
              checked={isDark}
              onChangeHandler={toggleDarkModeHandler}
            />
          </div>
          <hr className={styles.Divider} />
          <div className={styles.Title}>Email Settings</div>
          <div className={styles.Setting}>
            <div>Notifications</div>
            <CustomToggle checked={true} />
          </div>
          <div className={styles.Setting}>
            <div>Updates</div>
            <CustomToggle checked={true} />
          </div>
          <div className={styles.Setting}>
            <div>Promotions</div>
            <CustomToggle checked={false} />
          </div>
          <div className={styles.RightAlign}>
            <button className="btn" onClick={props.closeDialog}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    );
  }
);
