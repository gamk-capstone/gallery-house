import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { me } from './store';
import Home from "../components/home/Home"
import GalleryWall from "../components/galleryWall/GalleryWall"
import SavedWalls from "../components/savedWalls/SavedWalls"

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
          <Route path="/*" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/gallery" element={<GalleryWall />} />
          <Route path="/saved" element={<SavedWalls />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/*"
            element={<Home />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
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
