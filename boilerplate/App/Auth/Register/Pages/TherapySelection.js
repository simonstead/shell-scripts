import React from "react";
import { Field } from "redux-form";

const therapyOptions = [
  {
    value: "None",
    label: "I'm not sure yet"
  },
  {
    value: "CBT",
    label: "Cognitive Behavioural Therapy (CBT)"
  },
  {
    value: "EMDR",
    label: "Eye movement desensitisation and reprocessing (EMDR)"
  },
  {
    value: "CAT",
    label: "Cognitive Analytic Therapy (CAT)"
  },
  {
    value: "PP",
    label: "Psychodynamic Psychotherapy "
  },
  {
    value: "FT",
    label: "Family Therapy"
  },
  {
    value: "NET",
    label: "Narrative Exposure Therapy"
  },
  {
    value: "AT",
    label: "Art Therapy"
  },
  {
    value: "ACT",
    label: "Acceptance and Commitment Therapy (ACT)"
  },
  {
    value: "CFT",
    label: "Compassion Focused Therapy (CFT)"
  },
  {
    value: "PIP",
    label: "Parent Infant Psychotherapy"
  },
  {
    value: "VIG",
    label: "Video Interactive Guidance (VIG)"
  },
  {
    value: "ST",
    label: "Scheme Therapy"
  },
  {
    value: "M",
    label: "Mindfulness"
  },
  {
    value: "PCC",
    label: "Person Centred Counselling"
  },
  {
    value: "other",
    label: "I know what I need, but it's not here"
  }
];

export const TherapySelection = () => (
  <>
    <label htmlFor="therapy_selection">
      Do you know what therapy you need?
    </label>
    <p>Choose one from the list below</p>
    <Field name="therapy_selection" component="select">
      {therapyOptions.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </Field>
  </>
);

export default TherapySelection;
