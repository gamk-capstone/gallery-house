import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import { me } from "./store";
import Home from "../components/home/Home";
import GalleryWall from "../components/galleryWall/GalleryWall";
import SavedWall from "../components/savedWall/SavedWall";
import User from "../components/user/User";
import Toolbar from "../components/toolbar/Toolbar";
/**
 * COMPONENT
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
        <Routes>
          <Route path="/*" element={<GalleryWall />} />
          <Route path="/home" element={<Home />} />
          <Route path="/gallery" element={<GalleryWall />} />
          <Route path="/saved" element={<SavedWall />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          <Route path="/create" element={<GalleryWall />} />
          <Route path="/toolbartest" element={<Toolbar />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
