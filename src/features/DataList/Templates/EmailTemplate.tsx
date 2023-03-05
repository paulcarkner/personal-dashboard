import React from "react";
import styles from "./EmailTemplate.module.css";

export type Props = {
  profile: number;
  from: string;
  subject: string;
  received: Date;
  preview: string;
  attachment: Boolean;
};

export const EmailTemplate = ({
  profile,
  from,
  subject,
  received,
  preview,
  attachment,
}: Props): JSX.Element => {
  return (
    <div className={styles.Container}>
      <div className={styles.Profile}>
        <img src={`/assets/profiles/profile${profile}.jpg`} alt={from} />
      </div>
      <div className={styles.From}>{from}</div>
      <div className={styles.Received}>
        {received.toString().substring(0, 10)}
      </div>
      <div className={styles.Subject}>
        {subject}
        <div className={styles.Attachment}>
          {attachment ? (
            <span className="material-symbols-sharp">attach_file</span>
          ) : null}
        </div>
      </div>
      <div className={styles.Preview}>{preview}</div>
    </div>
  );
};
