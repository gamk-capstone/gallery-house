import React from "react";

const SixImageGalleryWall = () => {
  return (
    <div className="SixImageWallParentDiv">
      <div className="SixImageWallTop">
        <img src="/white.jpeg" className="square" />
        <img src="/white.jpeg" className="square" />
        <img src="/white.jpeg" className="square" />
      </div>
      <div className="SixImageWallBottom">
        <img src="/white.jpeg" className="square" />
        <img src="/white.jpeg" className="square" />
        <img src="/white.jpeg" className="square" />
      </div>
    </div>
  );
};
export default SixImageGalleryWall;
