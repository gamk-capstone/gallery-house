import React from "react";

const FiveImageGalleryWall = () => {
  return (
    <div className="flex justify-center flex-col gap-1">
      <div className="flex justify-center flex-row items-end gap-1">
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
