import React from "react";

const EightImageGalleryWall = () => {
  return (
    <div className="EightImageWallParentDiv">
      <div className="EightImageWallTop">
        <img src="/white.jpeg" className="landscapeRectangleExtraWide" />
        <img src="/white.jpeg" className="squareLarge" />
        <img src="/white.jpeg" className="portraitRectangle" />
        <img src="/white.jpeg" className="landscapeRectangleExtraWide" />
      </div>
      <div className="EightImageWallBottom">
        <img src="/white.jpeg" className="landscapeRectangleExtraWide" />
        <img src="/white.jpeg" className="portraitRectangle" />
        <img src="/white.jpeg" className="squareLarge" />
        <img src="/white.jpeg" className="landscapeRectangleExtraWide" />
      </div>
    </div>
  );
};
export default EightImageGalleryWall;
