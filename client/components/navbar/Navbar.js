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
      <nav>
        {isLoggedIn ? (
          <div className="flex flex-row justify-center gap-4">
            {/* The navbar will show these links after a user logs in */}
            <Link to="/home">Home</Link>
            <Link to="/create">Create</Link>
            <Link to="/saved">Saved Galleries</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-row justify-center gap-4">
            {/* The navbar will show these links before a user logs in and when a user logs out */}
            <Link to="/home">Gallery House</Link>
            <Link to="/create">Create</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
