import React from "react";
import { useSelector } from "react-redux";

const SavedWall = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div className="galleryWallParentDiv">
      <div>{username}'s Saved Galleries! </div>;
    </div>
  );
};

export default SavedWall;