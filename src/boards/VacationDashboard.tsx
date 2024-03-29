/******************************************************************

           Name: VacationDashboard
    Description: Dashboard for vacation panels
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
import { DateCountDown } from "./../features/DateCountDown/DateCountDown";
import GoogleMap from "./../features/GoogleMap/GoogleMap";
import { ImageLink } from "./../features/ImageLink/ImageLink";
import { GoalChart } from "./../features/DataChart/DataChartGoal";
import { Notes } from "./../features/Notes/Notes";
import { CurrentWeather } from "./../features/Weather/Weather";

export class VacationDashboard extends React.Component {
  render() {
    return (
      <div className={styles.board}>
        <div className={styles.miniPanelsContainer}>
          <Panel title="Days Until Trip" info="Date Count Down">
            <DateCountDown dueDate={new Date("2023-08-15")} />
          </Panel>
          <Panel title="Vacation Savings" info="JSON Data Chart">
            <GoalChart
              url="/sample_data/sample_bank_api.json"
              dataProcessor={(data: any) => {
                return {
                  value: data.accounts["0048394_482904757"].funds,
                  valueText:
                    "$" +
                    data.accounts["0048394_482904757"].funds
                      .toFixed(2)
                      .replace(/(\d)(?=(\d{3})+\.\d{2}$)/g, `$1,`), //currency w/ commas, 2 decimals
                  goal: 5000,
                  goalText: "$5,000",
                };
              }}
            />
          </Panel>
          <Panel title="Hotel Website" info="Image Link">
            <ImageLink
              imgUrl="/assets/hotel_logo.jpg"
              linkUrl="https://www.hilton.com/en/hotels/lrmdohh-hilton-la-romana-an-all-inclusive-adult-only-resort/"
            />
          </Panel>
        </div>
        <div className={styles.panelsContainer}>
          <Panel title="Vacation Notes" info="localStorage Data">
            <Notes category="vacation" />
          </Panel>
          <Panel title="Destination" info="Google Map">
            {/* Santo Domingo, Domincan Republic */}
            <GoogleMap lng={-69.9316065} lat={18.486021} zoom={10} />
          </Panel>
          <Panel title="Current Weather (Dominican Republic)" info="API JSON">
            <CurrentWeather
              lat={18.5001}
              lon={-69.9886}
              location="Santo Domingo"
            />
          </Panel>
        </div>
      </div>
    );
  }
}
