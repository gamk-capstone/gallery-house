import React from "react";
import SquareFrame from "../frames/SquareFrame";
import LandscapeRectangleFrame from "../frames/LandscapeRectangleFrame";

/**
 * `SevenImgGalleryWall` component 
 * @returns HTML for gallery wall comprised of seven images
 */

const SevenImageGalleryWall = ({ userArtUrl }) => {

  return (
    <div className="flex justify-center flex-col gap-4">
      <div className="flex justify-center flex-row items-end gap-4">
        <SquareFrame userArtUrl={userArtUrl}/>
        <LandscapeRectangleFrame userArtUrl={userArtUrl}/>
      </div>
      <div className="flex justify-center flex-row items-center gap-4">
        <SquareFrame userArtUrl={userArtUrl}/>
        <SquareFrame userArtUrl={userArtUrl}/>
        <SquareFrame userArtUrl={userArtUrl}/>
      </div>
      <div className="flex justify-center flex-row items-start gap-4">
        <LandscapeRectangleFrame userArtUrl={userArtUrl}/>
        <SquareFrame userArtUrl={userArtUrl}/>
      </div>
    </div>
  );
};
export default SevenImageGalleryWall;
