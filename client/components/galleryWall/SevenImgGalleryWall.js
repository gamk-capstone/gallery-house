import React from "react";

const SevenImageGalleryWall = () => {
  return (
    <div className="SevenImageWallParentDiv">
      <div className="SevenImageWallTop">
        <img src="/red.jpeg" className="square" />
        <img src="/red.jpeg" className="landscapeRectangle" />
      </div>
      <div className="SevenImageWallMiddle">
        <img src="/red.jpeg" className="square" />
        <img src="/red.jpeg" className="square" />
        <img src="/red.jpeg" className="square" />
      </div>
      <div className="SevenImageWallBottom">
        <img src="/red.jpeg" className="landscapeRectangle" />
        <img src="/red.jpeg" className="square" />
      </div>
    </div>
  );
};
export default SevenImageGalleryWall;
