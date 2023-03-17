import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import { me } from "./store";
import Home from "../components/home/Home";
import GalleryWall from "../components/galleryWall/GalleryWall";
import SavedWalls from "../components/savedWalls/SavedWalls";
import FiveImageGalleryWall from "../components/galleryWall/FiveImgGalleryWall";
import SixImageGalleryWall from "../components/galleryWall/SixImgGalleryWall";
import SevenImageGalleryWall from "../components/galleryWall/SevenImgGalleryWall";
import EightImageGalleryWall from "../components/galleryWall/EigthtImgGalleryWall";
import User from "../components/user/User";

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
          <Route path="/saved" element={<SavedWalls />} />
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
          <Route path="/fiveimagewall" element={<FiveImageGalleryWall />} />
          <Route path="/siximagewall" element={<SixImageGalleryWall />} />
          <Route path="/sevenimagewall" element={<SevenImageGalleryWall />} />
          <Route path="/eightimagewall" element={<EightImageGalleryWall />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
