import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";
import { Link } from "react-router-dom";
import styles from "../styles/AuthForm.module.css";

/**
 * The `AuthForm` component can be used for Login or Sign Up.
 * Props for Login: name="login", displayName="Login"
 * Props for Sign up: name="signup", displayName="Sign Up"
 **/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  /**
   * `handleLoginOrSignUpSubmit` dispatches a thunk with the user's input, which creates and signs a JWT for the user and encrypts their password.
   * @param {*} evt the user's click on either `Login` or `Sign up`.
   * @returns a signed and verified JWT for the user.
   */
  const handleLoginOrSignUpSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ username, password, method: formName }));
  };

  return (
    //HTML for the Login and Sign up form
    <div className={styles.authPageParentDiv}>
      <p className={styles.authIntroText}>
        Login or sign up to start creating your custom gallery wall.
      </p>
      <div className={styles.authFormContainer}>
        <div className={styles.authFormLinksContainer}>
          <Link to="/login" className={styles.authFormLink}>
            Login
          </Link>
          <p className={styles.authFormDot}>●</p>
          <Link to="/signup" className={styles.authFormLink}>
            Sign Up
          </Link>
        </div>
        <hr className={styles.authFormLine}></hr>
        <form
          onSubmit={handleLoginOrSignUpSubmit}
          name={name}
          className={styles.authFormForm}
        >
          <div className={styles.authFormFieldsContainer}>
            <label htmlFor="username" className={styles.formFieldLabel}>
              <small className={styles.formFieldLabelText}>Username:</small>
            </label>
            <input name="username" type="text" className={styles.formInput} />
          </div>
          <div className={styles.authFormFieldsContainer}>
            <label htmlFor="password" className={styles.formFieldLabel}>
              <small className={styles.formFieldLabelText}>Password:</small>
            </label>
            <input
              name="password"
              type="password"
              className={styles.formInput}
            />
          </div>
          <button type="submit" className={styles.submitBtn}>
            {displayName}
          </button>
          {error && <div> {error} </div>}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
