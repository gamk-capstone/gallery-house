import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";

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
    <div className="flex flex-col items-center pt-8">
      <form
        onSubmit={handleLoginOrSignUpSubmit}
        name={name}
        className="flex flex-col items-center bg-red-600 p-10 gap-4"
      >
        <div className="flex flex-col items-center">
          <label htmlFor="username" className="max-w-sm">
            <small>Username:</small>
          </label>
          <input name="username" type="text" className="max-w-sm p-4" />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="password" className="max-w-sm">
            <small>Password:</small>
          </label>
          <input name="password" type="password" className="max-w-sm p-4" />
        </div>
        <button type="submit" className="bg-slate-700 max-w-[5rem]">
          {displayName}
        </button>

        {error && <div> {error} </div>}
      </form>
    </div>
  );
};

export default AuthForm;
