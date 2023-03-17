import React from "react";

const SevenImageGalleryWall = () => {
  return (
    <div className="SevenImageWallParentDiv">
      <div className="SevenImageWallTop">
        <img src="/red.jpeg" className="square" />
        <img src="/red.jpeg" className="landscapeRectangle" />
      </div>
      <div className="SevenImageWallMiddle">
        <img src="/mattisse.jpeg" className="square" />
        <img src="/red.jpeg" className="square" />
        <img src="/red.jpeg" className="square" />
      </div>
      <div className="SevenImageWallBottom">
        <img src="/mattisse.jpeg" className="landscapeRectangle" />
        <img src="/square-art.jpeg" className="square" />
      </div>
    </div>
  );
};
export default SevenImageGalleryWall;
