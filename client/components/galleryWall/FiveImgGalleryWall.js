import React, { useState } from "react";
import LandscapeRectangleFrame from "../frames/LandscapeRectangleFrame";
import SquareFrame from "../frames/SquareFrame";
import PortraitRectangleFrame from "../frames/PortraitRectangleFrame";

/**
 * `FiveImgGalleryWall` component 
 * @returns HTML for gallery wall comprised of five images
 */

const FiveImgGalleryWall = ({ userArtUrl, filledFrames, setFilledFrames }) => {

  return (
    <div className="flex justify-center flex-col gap-4">
      <div className="flex justify-center flex-row items-end gap-4">
        <LandscapeRectangleFrame userArtUrl={userArtUrl} filledFrames={ filledFrames } setFilledFrames={ setFilledFrames }/>
        <SquareFrame userArtUrl={userArtUrl} filledFrames={ filledFrames } setFilledFrames={ setFilledFrames }/>
      </div>
      <div className="flex justify-center flex-row items-start gap-4">
        <LandscapeRectangleFrame userArtUrl={userArtUrl} filledFrames={ filledFrames } setFilledFrames={ setFilledFrames }/>
        <PortraitRectangleFrame userArtUrl={userArtUrl} filledFrames={ filledFrames } setFilledFrames={ setFilledFrames }/>
        <LandscapeRectangleFrame userArtUrl={userArtUrl} filledFrames={ filledFrames } setFilledFrames={ setFilledFrames }/>
      </div>
    </div>
  );
};
export default FiveImgGalleryWall;
