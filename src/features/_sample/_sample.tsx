/*****************

Name: _sample
Description: A sample component with Redux state management
Props: message:string
Output: JSX.Element

*****************/

import React, { useState } from "react";

//Redux Imports
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  sampleAction1,
  sampleAction2,
  sampleAsyncAction,
  sampleTypedThunkAction,
  sampleSelector,
} from "./_sampleSlice";

//Styles
import styles from "./_sample.module.css";

export function Sample({ message }: { message: string }): JSX.Element {
  const count = useAppSelector(sampleSelector);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className={styles.row}>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(sampleAction1())}
        >
          +
        </button>
      </div>
    </div>
  );
}
