import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import { me } from "./store";
import Home from "../components/home/Home";
import GalleryWall from "../components/galleryWall/GalleryWall";
import SavedWalls from "../components/savedWalls/SavedWalls";
import SavedWall from "../components/savedWall/SavedWall";
import Toolbar from "../components/toolbar/Toolbar";
import SaveWallForm from "../components/saveWallForm/index";
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

          {/* The /saveForm route brings a user to `SavedWallForm` component*/}
          <Route path="/saveForm" element={<SaveWallForm />} />

          {/* The /saved route brings a user to the `SavedWalls` component */}
          <Route path="/saved" element={<SavedWalls />} />

          {/* The /saved/:wallId route brings a user to the `SavedWalls` component */}
          <Route path="/saved/:wallId" element={<SavedWall />} />
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
