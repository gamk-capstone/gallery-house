import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <nav>
        {isLoggedIn ? (
          <div className="flex flex-row justify-center gap-4">
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to="/create">Create</Link>
            <Link to="/saved">Saved Galleries</Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-row justify-center gap-4">
            {/* The navbar will show these links before you log in */}
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
