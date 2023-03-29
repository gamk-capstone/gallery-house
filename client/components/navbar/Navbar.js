import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

/**
 * `Navbar` component
 * @returns the correct Link options based on whether a user is logged in or not.
 */

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          <div className="logoLinksContainer">
            <div className="logoContainer">
              <img
                src="/gallery-house.png"
                alt="Gallery House logo"
                className="navLogo"
              />
              <div className="linksContainer">
                {/* The navbar will show these links after a user logs in */}
                <Link to="/home" className="navLink">
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
          <div className="logoLinksContainerLoggedOut">
            <div className="logoContainer">
              <img
                src="/gallery-house.png"
                alt="Gallery House logo"
                className="navLogo"
              />
              <div className="linksContainer">
                {/* The navbar will show these links before a user logs in and when a user logs out */}
                <Link to="/home" className="navLink">
                  Home
                </Link>
                <Link to="/login" className="navLink">
                  Login
                </Link>
                <Link to="/signup" className="navLink">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
