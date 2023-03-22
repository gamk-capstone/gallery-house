import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import { me } from "./store";
import Home from "../components/home/Home";
import GalleryWall from "../components/galleryWall/GalleryWall";
import SavedWall from "../components/savedWall/SavedWall";
import User from "../components/user/User";
/**
 * The `AppRoutes` component defines the routes in Gallery House, based on whether a user is logged in or not.
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        //A logged in user's routes:
        <Routes>
          {/* When a user logs in, they are automatically brought to the `Create` tab (`GalleryWall` component) */}
          <Route path="/*" element={<GalleryWall />} />

          {/* The /home route brings a user to the Gallery House landing page (`Home` component) */}
          <Route path="/home" element={<Home />} />

          {/* The /create route brings a user to their `GalleryWall` component */}
          <Route path="/create" element={<GalleryWall />} />

          {/* The /saved route brings a user to the `SavedWall` component */}
          <Route path="/saved" element={<SavedWall />} />

          {/* The /users/:id route brings a user to the `User` component */}
          <Route path="/users/:id" element={<User />} />
        </Routes>
      ) : (
        //A guest (or logged-out) user's routes:
        <Routes>
          {/* A guest is brought to the Gallery House landing page (`Home` component) */}
          <Route path="/*" element={<Home />} />
          {/* The /login route brings a user to the `AuthForm` component (method login) */}
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          {/* The /signup route brings a user to the `AuthForm` component (method login) */}
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
