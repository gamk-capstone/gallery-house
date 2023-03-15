import React from "react";
import { useSelector } from "react-redux";

const GalleryWall = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  return <div>{username}'s Gallery Wall! </div>;
};

export default GalleryWall;
