import React from "react";
import styles from "./EmailTemplate.module.css";

export type props = {
  profile: number;
  from: string;
  email: string;
  subject: string;
  received: Date;
  preview: string;
  attachment: boolean;
};

export type profileType = { id: number; name: string; email: string };
export type emailType = {
  profile: number;
  subject: string;
  received: Date;
  preview: string;
  attachment: boolean;
};

export const EmailTemplate = ({
  profile,
  from,
  email,
  subject,
  received,
  preview,
  attachment,
}: props): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <img src={`/assets/profiles/profile${profile}.jpg`} alt={from} />
      </div>
      <div>
        {from}
        <span className={styles.email}>&lt;{email}&gt;</span>
      </div>
      <div className={styles.received}>
        {received.toString().substring(0, 10)}{" "}
        {new Date(received).getHours().toString()}:
        {("0" + new Date(received).getMinutes().toString()).slice(-2)}
      </div>
      <div className={styles.subject}>
        {subject}
        <div className={styles.attachment}>
          {attachment ? (
            <span className="material-symbols-sharp">attach_file</span>
          ) : null}
        </div>
      </div>
      <div className={styles.preview}>{preview}</div>
    </div>
  );
};
