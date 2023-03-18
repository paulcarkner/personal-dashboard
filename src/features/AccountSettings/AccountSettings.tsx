/******************************************************************

           Name: AccountSettings
    Description: Dialog pop-up for changing account settings (demonstration only)
    Return Type: JSX.Element (HTMLDialogElement) with ref
          Props: closeDialog: (event: React.MouseEvent<HTMLButtonElement>) => void
                 ref: React forwardRef 
  Redux Actions: (none)
Redux Selectors: (none)

******************************************************************/

import React, { forwardRef } from "react";

//Styles
import styles from "./AccountSettings.module.css";

//Types
export type dialogProps = {
  closeDialog: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const AccountSettings = forwardRef<HTMLDialogElement, dialogProps>(
  (props, ref) => {
    const handleLogOutClick = () => {
      alert("This feature is for demonstration purposes only.");
    };

    return (
      <dialog ref={ref} className={styles.dialog}>
        <div className={styles.container}>
          <button className={styles.close} onClick={props.closeDialog}>
            &times;
          </button>
          <img
            className={styles.image}
            src="/assets/profile_image.jpg"
            alt="Profile Avatar"
          />
          <div>
            <div>Paul</div>
            <div className={styles.email}>paul@dash-y.xyz</div>
          </div>
          <div>
            <button className="btn" onClick={handleLogOutClick}>
              Log Out
            </button>
          </div>
        </div>
      </dialog>
    );
  }
);
