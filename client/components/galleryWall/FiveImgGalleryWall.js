import React from "react";

const FiveImageGalleryWall = () => {
  return (
    <div className="FiveImageWallParentDiv">
      <div className="FiveImageWallTop">
        <img src="/red.jpeg" className="landscapeRectangle" />
        <img src="/red.jpeg" className="square" />
      </div>
      <div className="FiveImageWallBottom">
        <img src="/red.jpeg" className="landscapeRectangle" />
        <img src="/red.jpeg" className="portraitRectangle" />
        <img src="/red.jpeg" className="landscapeRectangle" />
      </div>
    </div>
  );
};
export default FiveImageGalleryWall;
