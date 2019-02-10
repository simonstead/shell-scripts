import React from "react";
import { Field } from "redux-form";
import renderField from "../../../Shared/InputWithErrors";

export const BasicDetails = () => (
  <>
    <label htmlFor="first_name">First name</label>
    <Field name="first_name" component={renderField} type="text" />
    <label htmlFor="second_name">Second name</label>
    <Field name="second_name" component={renderField} type="text" />
    <label htmlFor="email">Email address</label>
    <Field name="email" component={renderField} type="email" />
    <label htmlFor="phone">Phone number</label>
    <Field name="phone" component={renderField} type="text" />
  </>
);

export default BasicDetails;
