import React from "react";
import LandscapeRectangleExtraWideFrame from "../frames/LandscapeRectangleExtraWideFrame";
import PortraitRectangleFrame from "../frames/PortraitRectangleFrame";
import SquareLargeFrame from "../frames/SquareLargeFrame";

/**
 * `EightImgGalleryWall`component 
 * @returns HTML for gallery wall comprised of eight images
 */

const EightImgGalleryWall = ({ userArtUrl }) => {
  return (
    <div className="flex justify-center flex-col gap-4">
      <div className="flex justify-center flex-row items-end gap-4">
        <LandscapeRectangleExtraWideFrame userArtUrl={userArtUrl}/>
        <SquareLargeFrame userArtUrl={userArtUrl}/>
        <PortraitRectangleFrame userArtUrl={userArtUrl}/>
        <LandscapeRectangleExtraWideFrame userArtUrl={userArtUrl}/>
      </div>
      <div className="flex justify-center flex-row items-start gap-4">
        <LandscapeRectangleExtraWideFrame userArtUrl={userArtUrl}/>
        <PortraitRectangleFrame userArtUrl={userArtUrl}/>
        <SquareLargeFrame userArtUrl={userArtUrl}/>
        <LandscapeRectangleExtraWideFrame userArtUrl={userArtUrl}/>
      </div>
    </div>
  );
};
export default EightImgGalleryWall;
