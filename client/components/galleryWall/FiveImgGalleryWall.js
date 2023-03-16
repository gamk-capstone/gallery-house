import React from "react";

const FiveImageGalleryWall = () => {
  return (
    <div className="FiveImageWallParentDiv">
      <div className="FiveImageWallTop">
        <img src="/red.jpeg" className="fiveImg1" />
        <img src="/red.jpeg" className="fiveImg2" />
      </div>
      <div className="FiveImageWallBottom">
        <img src="/red.jpeg" className="fiveImg3" />
        <img src="/red.jpeg" className="fiveImg4" />
        <img src="/red.jpeg" className="fiveImg5" />
      </div>
    </div>
  );
};
export default FiveImageGalleryWall;
