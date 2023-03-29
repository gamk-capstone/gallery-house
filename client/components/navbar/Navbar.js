import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

/**
 * `Navbar` component
 * @returns the correct Link options based on whether a user is logged in or not.
 */

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //redux state
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  /**
   * `logoutAndRedirectHome` dispatches a logout action (removing a user's token from local storage) and navigates a user to the
   * Gallery House landing page
   */
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/home");
  };

  return (
    <div>
      <nav className="navParent">
        {isLoggedIn ? (
          <div className="flex flex-row justify-between items-center pr-16">
            <div className="flex flex-row justify-start items-center gap-32 p-16">
              {/* The navbar will show these links after a user logs in */}
              <Link to="/create">
                <img
                  src="/gallery-house.png"
                  alt="Gallery House logo"
                  className="max-w-[20rem]"
                />
              </Link>
              <div className="flex flex-row gap-8">
                <Link to="/home" className="nav-link">
                  Home
                </Link>
                <Link to="/create" className="navLink">
                  Create
                </Link>
                <Link to="/saved" className="navLink">
                  Saved Galleries
                </Link>
              </div>
            </div>
            <button
              type="button"
              onClick={logoutAndRedirectHome}
              className="logoutBtn"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-row justify-start items-center gap-32 p-16">
            {/* The navbar will show these links before a user logs in and when a user logs out */}
            <Link to="/home">
              <img
                src="/gallery-house.png"
                alt="Gallery House logo"
                className="max-w-[20rem]"
              />
            </Link>
            <div className="flex flex-row gap-8">
              <Link to="/home" className="nav-link">
                Home
              </Link>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
