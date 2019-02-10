import React from "react";
import { Field } from "redux-form";

export const Password = () => (
  <>
    <label htmlFor="password">Enter a password for your account</label>
    <Field name="password" component="input" type="password" />
    <label htmlFor="confirm_password">Confirm your password</label>
    <Field name="confirm_password" component="input" type="password" />
  </>
);

export default Password;
