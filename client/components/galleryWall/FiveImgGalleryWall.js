import React from "react";
import LandscapeRectangleFrame from "../frames/LandscapeRectangleFrame";
import SquareFrame from "../frames/SquareFrame";
import PortraitRectangleFrame from "../frames/PortraitRectangleFrame";

const FiveImageGalleryWall = ({ userArtUrl }) => {
  return (
    <div className="flex justify-center flex-col gap-4">
      <div className="flex justify-center flex-row items-end gap-4">
        <LandscapeRectangleFrame userArtUrl={userArtUrl}/>
        <SquareFrame userArtUrl={userArtUrl}/>
      </div>
      <div className="flex justify-center flex-row items-start gap-4">
        <LandscapeRectangleFrame userArtUrl={userArtUrl}/>
        <PortraitRectangleFrame userArtUrl={userArtUrl}/>
        <LandscapeRectangleFrame userArtUrl={userArtUrl}/>
      </div>
    </div>
  );
};
export default FiveImageGalleryWall;