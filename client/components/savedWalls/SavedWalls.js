import React from "react";
import { useSelector } from "react-redux";

const GalleryWall = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  return <div>{username}'s Saved Galleries! </div>;
};

export default GalleryWall;