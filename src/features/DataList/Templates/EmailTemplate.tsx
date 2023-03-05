import React from "react";
import styles from "./EmailTemplate.module.css";

export type Props = {
  profile: number;
  from: string;
  email: string;
  subject: string;
  received: Date;
  preview: string;
  attachment: Boolean;
};

export type profileType = { id: number; name: string; email: string };
export type emailType = {
  profile: number;
  subject: string;
  received: Date;
  preview: string;
  attachment: Boolean;
};

export const EmailTemplate = ({
  profile,
  from,
  email,
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
      <div className={styles.From}>
        {from}
        <span className={styles.Email}>&lt;{email}&gt;</span>
      </div>
      <div className={styles.Received}>
        {received.toString().substring(0, 10)}{" "}
        {new Date(received).getHours().toString()}:
        {("0" + new Date(received).getMinutes().toString()).slice(-2)}
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
