import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

/**
 * `Navbar` component
 * @returns the correct Link options based on whether a user is logged in or not.
 */

const NavbarHomepage = () => {
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
          <div className="flex flex-row justify-between items-center pr-16">
            <div className="flex flex-row justify-start items-center gap-32 p-16">
              <img
                src="/gallery-house.png"
                alt="Gallery House logo"
                className="max-w-[20rem]"
              />
              <div className="flex flex-row gap-8">
                {/* The navbar will show these links after a user logs in */}
                <Link to="/home" className="nav-link">
                  Home
                </Link>
                <Link to="/create" className="nav-link">
                  Create
                </Link>
                <Link to="/saved" className="nav-link">
                  Saved Galleries
                </Link>
              </div>
            </div>
            <button
              type="button"
              onClick={logoutAndRedirectHome}
              className="text-black font-house-bold text-3xl focus:text-pink rounded-full border-4 border-solid border-pink hover:text-pink hover:border-black px-4 py-2"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-row justify-start items-center gap-32 p-16">
            <img
              src="/gallery-house.png"
              alt="Gallery House logo"
              className="max-w-[20rem]"
            />
            <div className="flex flex-row gap-8">
              {/* The navbar will show these links before a user logs in and when a user logs out */}
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

export default NavbarHomepage;
