import React from "react";

const SixImageGalleryWall = () => {
  return (
    <div className="SixImageWallParentDiv">
      <div className="SixImageWallTop">
        <img src="/red.jpeg" className="square" />
        <img src="/red.jpeg" className="square" />
        <img src="/red.jpeg" className="square" />
      </div>
      <div className="SixImageWallBottom">
        <img src="/red.jpeg" className="square" />
        <img src="/red.jpeg" className="square" />
        <img src="/red.jpeg" className="square" />
      </div>
    </div>
  );
};
export default SixImageGalleryWall;
