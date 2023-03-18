/******************************************************************

           Name: PersonalDashboard
    Description: Dashboard for personal panels
    Return Type: JSX.Element
          Props: (none)
  Redux Actions: (none)
Redux Selectors: (none)

******************************************************************/

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
  props as calendarType,
} from "./../features/DataList/Templates/CalendarTemplate";

export class PersonalDashboard extends React.Component {
  render() {
    return (
      <div className={styles.board}>
        <div className={styles.panelsContainer}>
          <Panel title="Unread Emails" info="JSON List Template" colSpan={2}>
            <DataList
              url="/sample_data/sample_email_api.json"
              template={EmailTemplate}
              dataProcessor={(data: any) => {
                return [...data.emails] //clone for manipulations
                  .sort((a: emailType, b: emailType) => {
                    return (
                      new Date(b.received).getTime() -
                      new Date(a.received).getTime()
                    );
                  }) //sort emails by date
                  .map((e: emailType) => {
                    let profile = data.profiles.find(
                      (p: profileType) => p.id === e.profile
                    ); //get profile details
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
                return [...data.schedule] //clone for manipulations
                  .sort((a: calendarType, b: calendarType) => {
                    return (
                      new Date(a.startTime).getTime() -
                      new Date(b.startTime).getTime()
                    );
                  }) //sort emails by date
                  .map((e: calendarType) => {
                    let isFirst = false;
                    //mark the first item on each day so template knows to add date before it
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
