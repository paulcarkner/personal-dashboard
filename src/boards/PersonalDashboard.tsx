/*****************

Name: PersonalDashboard
Description: Container for the summary board
Props: (none)
Output: JSX.Element

*****************/

import React from "react";

//Styles
import styles from "./BoardStyles.module.css";

//Components
import { Panel } from "./../layout/Panel";
import { RssFeed } from "./../features/RssFeed/RssFeed";
import { Notes } from "./../features/Notes/Notes";
import { DataList } from "./../features/DataList/DataList";
import {
  EmailTemplate,
  profileType,
  emailType,
} from "./../features/DataList/Templates/EmailTemplate";
import {
  CalendarTemplate,
  Props as calendarType,
} from "./../features/DataList/Templates/CalendarTemplate";

//Type Declarations

export class PersonalDashboard extends React.Component {
  render() {
    return (
      <div className={styles.Board}>
        <div className={styles.PanelsContainer}>
          <Panel title="Unread Emails" info="JSON List Template" colSpan={2}>
            <DataList
              url="/sample_data/sample_email_api.json"
              template={EmailTemplate}
              dataProcessor={(data: any) => {
                return [...data.emails]
                  .sort((a: emailType, b: emailType) => {
                    return (
                      new Date(b.received).getTime() -
                      new Date(a.received).getTime()
                    );
                  })
                  .map((e: emailType) => {
                    let profile = data.profiles.find(
                      (p: profileType) => p.id === e.profile
                    );
                    return {
                      profile: e.profile,
                      from: profile.name,
                      email: profile.email,
                      subject: e.subject,
                      received: e.received,
                      preview: e.preview,
                      attachment: e.attachment,
                    };
                  });
              }}
            />
          </Panel>
          <Panel title="7-Day Agenda" info="JSON List Template" rowSpan={2}>
            <DataList
              url="/sample_data/sample_email_api.json"
              template={CalendarTemplate}
              dataProcessor={(data: any) => {
                let lastDate = 0;
                return [...data.schedule]
                  .sort((a: calendarType, b: calendarType) => {
                    return (
                      new Date(a.startTime).getTime() -
                      new Date(b.startTime).getTime()
                    );
                  })
                  .map((e: calendarType) => {
                    let isFirst = false;
                    if (lastDate !== new Date(e.startTime).getDate()) {
                      lastDate = new Date(e.startTime).getDate();
                      isFirst = true;
                    }
                    return {
                      isFirst: isFirst,
                      name: e.name,
                      location: e.location,
                      startTime: e.startTime,
                      duration: e.duration,
                    };
                  });
              }}
            />
          </Panel>
          <Panel title="Personal Notes" info="localStorage Data" rowSpan={2}>
            <Notes category="personal" />
          </Panel>
          <Panel title="Latest Movie Trailers" info="RSS Feed" colSpan={2}>
            <RssFeed url="https://trailers.apple.com/trailers/home/rss/newtrailers.rss" />
          </Panel>
        </div>
      </div>
    );
  }
}
