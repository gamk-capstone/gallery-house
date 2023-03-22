import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';

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
    <div>
      <form onSubmit={handleLoginOrSignUpSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && <div> {error} </div>}
      </form>
    </div>
  );
};

export default AuthForm;
