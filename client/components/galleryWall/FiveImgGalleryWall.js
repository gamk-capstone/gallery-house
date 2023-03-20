import React from "react";

const FiveImageGalleryWall = () => {
  return (
    <div className="FiveImageWallParentDiv">
      <div className="FiveImageWallTop">
        <img src="/white.jpeg" className="landscapeRectangle" />
        <img src="/white.jpeg" className="square" />
      </div>
      <div className="FiveImageWallBottom">
        <img src="/white.jpeg" className="landscapeRectangle" />
        <img src="/white.jpeg" className="portraitRectangle" />
        <img src="/white.jpeg" className="landscapeRectangle" />
      </div>
    </div>
  );
};
export default FiveImageGalleryWall;
