import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import styles from "../styles/Navbar.module.css";

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
      <nav className={styles.navParent}>
        {isLoggedIn ? (
          <div className={styles.logoLinksContainer}>
            <div className={styles.logoContainer}>
              <Link to="/create">
                <img
                  src="./images/gallery-house.png"
                  alt="Gallery House logo"
                  className={styles.navLogo}
                />
              </Link>
              <div className={styles.linksContainer}>
                {/* The navbar will show these links after a user logs in */}
                <Link to="/home" className={styles.navLink}>
                  Home
                </Link>
                <Link to="/create" className={styles.navLink}>
                  Create
                </Link>
                <Link to="/saved" className={styles.navLink}>
                  Saved Galleries
                </Link>
              </div>
            </div>
            <button
              type="button"
              onClick={logoutAndRedirectHome}
              className={styles.logoutBtn}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className={styles.logoLinksContainerLoggedOut}>
            <div className={styles.logoContainer}>
              <Link to="/home">
                <img
                  src="./images/gallery-house.png"
                  alt="Gallery House logo"
                  className={styles.navLogo}
                />
              </Link>
              <div className={styles.linksContainer}>
                {/* The navbar will show these links before a user logs in and when a user logs out */}
                <Link to="/home" className={styles.navLink}>
                  Home
                </Link>
                <Link to="/login" className={styles.navLink}>
                  Login
                </Link>
                <Link to="/signup" className={styles.navLink}>
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
