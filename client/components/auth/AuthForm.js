import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";
import { Link } from "react-router-dom";

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
    <div className="flex flex-col items-center gap-8 pt-[3rem]">
      <p className="font-house-regular text-pink text-3xl">
        Login or sign up to start creating your custom gallery wall.
      </p>
      <div className="flex flex-col items-center bg-yellow p-10 gap-4 ">
        <div
          id="loginOptionsContainer"
          className="flex flex-row justify-between items-center gap-4"
        >
          <Link
            to="/login"
            className="text-black font-house-regular text-2xl focus:text-pink hover:text-pink"
          >
            Login
          </Link>
          <p className="text-pink">●</p>
          <Link
            to="/signup"
            className="text-black font-house-regular text-2xl focus:text-pink hover:text-pink"
          >
            Sign Up
          </Link>
        </div>
        <hr className="border-2 w-full border-pink"></hr>
        <form
          onSubmit={handleLoginOrSignUpSubmit}
          name={name}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex flex-col items-center">
            <label htmlFor="username" className="max-w-sm">
              <small className="font-house-regular text-lg">Username:</small>
            </label>
            <input
              name="username"
              type="text"
              className="max-w-sm p-4 font-house-regular text-lg focus:outline-none"
            />
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="password" className="max-w-sm">
              <small className="font-house-regular text-xl">Password:</small>
            </label>
            <input
              name="password"
              type="password"
              className="max-w-sm p-4 font-house-regular text-xl focus:outline-none"
            />
          </div>
          <button type="submit" className="btn-primary">
            {displayName}
          </button>
          {error && <div> {error} </div>}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
