import React from "react";
import shared from "../../Shared/styles.scss";

export const renderField = ({
  input,
  type,
  meta: { touched, error, warning },
  theme,
  ...rest
}) => (
  <>
    {type === "textarea" ? (
      <textarea {...input} type={type} />
    ) : (
      <input {...input} type={type} {...rest} />
    )}
    {touched &&
      ((error && (
        <span
          className={shared.FormError}
          style={{ background: theme === "dark" ? "white" : "" }}
        >
          <i className="fas fa-exclamation-triangle" />
          {error}
        </span>
      )) ||
        (warning && (
          <span
            className={shared.FormWarning}
            style={{ background: theme === "dark" ? "white" : "" }}
          >
            <i className="fas fa-exclamation" />
            {warning}
          </span>
        )))}
  </>
);

export default renderField;
