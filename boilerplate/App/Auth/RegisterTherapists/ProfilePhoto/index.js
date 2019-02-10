import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { renderField } from "../../../Shared/InputWithErrors";
import shared from "../../../Shared/styles.scss";
import Dropzone from "react-dropzone";
import { uploadFiles } from "../../../App/api";
import styles from "./styles.scss";

const ImageUpload = ({
  input,
  type,
  meta: { touched, error, warning },
  images,
  ...rest
}) => (
  <>
    {touched &&
      ((error && (
        <span className={shared.FormError} {...rest}>
          <i className="fas fa-exclamation-triangle" />
          {error}
        </span>
      )) ||
        (warning && (
          <span className={shared.FormWarning}>
            <i className="fas fa-exclamation" />
            {warning}
          </span>
        )))}
    <Dropzone
      accept="image/png, image/jpg, image/jpeg"
      multiple={false}
      method="POST"
      name={"profile_photo"}
      maxSize={2000000}
    >
      {images && images.length > 0 ? (
        images
      ) : (
        <div>
          <p>
            <span>Upload</span> or drag images here
          </p>
        </div>
      )}
    </Dropzone>
  </>
);

const ImageComponent = ({ onImageSelect }) => (
  <label htmlFor="profile-photo" className={styles.ChooseImage}>
    Choose file
    <input
      name="profile-photo"
      id="profile-photo"
      type="file"
      accept=".jpg, .png, .jpeg"
      onChange={onImageSelect}
    />
  </label>
);

export const ProfilePhoto = ({
  imageToShow,
  onImageSelect,
  history,
  onSubmit
}) => (
  <form className={styles.ProfilePhoto}>
    <h1>Take a photo</h1>
    <img src={imageToShow} />
    <Field
      name="profile_photo"
      component={ImageComponent}
      onImageSelect={onImageSelect}
    />
    <button
      className={shared.OrangeButton}
      type="submit"
      onClick={e => {
        e.preventDefault();
        onSubmit(history);
      }}
    >
      Upload
    </button>
    <Link to={"/account-setup"}>skip for now</Link>{" "}
  </form>
);

const changeImage = event => dispatch =>
  dispatch({
    type: "CHANGE_IMAGE",
    payload: URL.createObjectURL(event.target.files[0])
  });

const uploadPhoto = history => (dispatch, getState) => {
  const file = document.querySelector('input[type="file"]').files[0];
  const body = new FormData();
  body.append("file", file);
  dispatch({
    type: "UPLOAD_PHOTO",
    payload: uploadFiles({
      url: "/profile-photo",
      token: getState().auth.token,
      body
    }).then(responseData => {
      // if has come from /register/therapists/phone, push to /account-setup
      // else
      debugger;
      history.push("/account");
      return responseData;
    })
  });
};

const mapStateToProps = ({ images, profile }) => ({
  imageToShow: images || profile.image_url
});
const Form = reduxForm({ form: "photo" })(ProfilePhoto);
const FormWithRouter = withRouter(Form);

export default connect(
  mapStateToProps,
  { onImageSelect: changeImage, onSubmit: uploadPhoto }
)(FormWithRouter);
