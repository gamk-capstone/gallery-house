import React, { useState } from "react";
import { useSelector } from "react-redux";

const GalleryWall = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      <p>{username}'s Gallery Wall! </p>
    </div>
  );
};

export default GalleryWall;
