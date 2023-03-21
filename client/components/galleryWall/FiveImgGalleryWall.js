import React from "react";
import LandscapeRectangleFrame from "../frames/LandscapeRectangleFrame";
import SquareFrame from "../frames/SquareFrame";
import PortraitRectangleFrame from "../frames/PortraitRectangleFrame";

/**
 * `FiveImgGalleryWall` component 
 * @returns HTML for gallery wall comprised of five images
 */
const FiveImgGalleryWall = () => {
  return (
    <div className="flex justify-center flex-col gap-4">
      <div className="flex justify-center flex-row items-end gap-4">
        <LandscapeRectangleFrame />
        <SquareFrame />
      </div>
      <div className="flex justify-center flex-row items-start gap-4">
        <LandscapeRectangleFrame />
        <PortraitRectangleFrame />
        <LandscapeRectangleFrame />
      </div>
    </div>
  );
};
export default FiveImgGalleryWall;
