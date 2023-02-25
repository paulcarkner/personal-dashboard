import React, { forwardRef } from "react";
import styles from "./AccountSettings.module.css";

export type DialogProps = {
  closeDialog: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const AccountSettings = forwardRef<HTMLDialogElement, DialogProps>(
  (props, ref) => {
    const handleLogOutClick = () => {
      alert("This feature is for demonstration purposes only.");
    };

    return (
      <dialog ref={ref} className={styles.Dialog}>
        <div className={styles.Container}>
          <button className={styles.Close} onClick={props.closeDialog}>
            &times;
          </button>
          <img
            className={styles.Image}
            src="/assets/profile_image.jpg"
            alt="Profile Image"
          />
          <div>
            <div>Paul</div>
            <div className={styles.Email}>paul@dash-y.xyz</div>
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
