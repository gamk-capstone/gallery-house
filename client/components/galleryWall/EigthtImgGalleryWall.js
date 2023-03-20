import React from "react";

const EightImageGalleryWall = () => {
  return (
    <div className="EightImageWallParentDiv">
      <div className="EightImageWallTop">
        <img src="/red.jpeg" className="landscapeRectangleExtraWide" />
        <img src="/red.jpeg" className="squareLarge" />
        <img src="/red.jpeg" className="portraitRectangle" />
        <img src="/red.jpeg" className="landscapeRectangleExtraWide" />
      </div>
      <div className="EightImageWallBottom">
        <img src="/red.jpeg" className="landscapeRectangleExtraWide" />
        <img src="/red.jpeg" className="portraitRectangle" />
        <img src="/red.jpeg" className="squareLarge" />
        <img src="/red.jpeg" className="landscapeRectangleExtraWide" />
      </div>
    </div>
  );
};
export default EightImageGalleryWall;
