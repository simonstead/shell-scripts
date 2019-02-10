import React from "react";
import { Field } from "redux-form";

export const PhoneCallTimeSelection = () => (
  <>
    <label htmlFor="phone_call_time">When are you free for a phone call?</label>

    <label>
      Tomorrow morning{" "}
      <Field
        name="phone_call_time"
        component="input"
        type="radio"
        value="tomorrow_morning"
      />
    </label>
    <label>
      Tomorrow evening{" "}
      <Field
        name="phone_call_time"
        component="input"
        type="radio"
        value="tomorrow_evening"
      />
    </label>
    <label>
      Thursday morning{" "}
      <Field
        name="phone_call_time"
        component="input"
        type="radio"
        value="thursday_morning"
      />
    </label>
    <label>
      Thursday evening{" "}
      <Field
        name="phone_call_time"
        component="input"
        type="radio"
        value="thursday_morning"
      />
    </label>
    <label>
      I do not want a phone call with a therapist
      <Field
        name="phone_call_time"
        component="input"
        type="radio"
        value="no_call"
      />
    </label>
  </>
);

export default PhoneCallTimeSelection;
