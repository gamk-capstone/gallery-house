import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";
import { Link } from "react-router-dom";
// import "./auth.css";

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
    <div className="authPageParentDiv">
      <p className="authIntroText">
        Login or sign up to start creating your custom gallery wall.
      </p>
      <div className="authFormContainer">
        <div className="authFormLinksContainer">
          <Link to="/login" className="authFormLink">
            Login
          </Link>
          <p className="authFormDot">●</p>
          <Link to="/signup" className="authFormLink">
            Sign Up
          </Link>
        </div>
        <hr className="authFormLine"></hr>
        <form
          onSubmit={handleLoginOrSignUpSubmit}
          name={name}
          className="authFormForm"
        >
          <div className="authFormFieldsContainer">
            <label htmlFor="username" className="formFieldLabel">
              <small className="formFieldLabelText">Username:</small>
            </label>
            <input name="username" type="text" className="formInput" />
          </div>
          <div className="authFormFieldsContainer">
            <label htmlFor="password" className="formFieldLabel">
              <small className="formFieldLabelText">Password:</small>
            </label>
            <input name="password" type="password" className="formInput" />
          </div>
          <button type="submit" className="submitBtn">
            {displayName}
          </button>

          {error && <div> {error} </div>}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
