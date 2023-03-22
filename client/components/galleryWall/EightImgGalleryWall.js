import React from "react";
import LandscapeRectangleExtraWideFrame from "../frames/LandscapeRectangleExtraWideFrame";
import PortraitRectangleFrame from "../frames/PortraitRectangleFrame";
import SquareLargeFrame from "../frames/SquareLargeFrame";

/**
 * `EightImgGalleryWall`component 
 * @returns HTML for gallery wall comprised of eight images
 */

const EightImgGalleryWall = ({ userArtUrl, filledFrames, setFilledFrames }) => {
  return (
    <div className="flex justify-center flex-col gap-4">
      <div className="flex justify-center flex-row items-end gap-4">
        <LandscapeRectangleExtraWideFrame userArtUrl={userArtUrl} filledFrames={ filledFrames } setFilledFrames={ setFilledFrames }/>
        <SquareLargeFrame userArtUrl={userArtUrl} filledFrames={ filledFrames } setFilledFrames={ setFilledFrames }/>
        <PortraitRectangleFrame userArtUrl={userArtUrl} filledFrames={ filledFrames } setFilledFrames={ setFilledFrames }/>
        <LandscapeRectangleExtraWideFrame userArtUrl={userArtUrl} filledFrames={ filledFrames } setFilledFrames={ setFilledFrames }/>
      </div>
      <div className="flex justify-center flex-row items-start gap-4">
        <LandscapeRectangleExtraWideFrame userArtUrl={userArtUrl} filledFrames={ filledFrames } setFilledFrames={ setFilledFrames }/>
        <PortraitRectangleFrame userArtUrl={userArtUrl} filledFrames={ filledFrames } setFilledFrames={ setFilledFrames }/>
        <SquareLargeFrame userArtUrl={userArtUrl} filledFrames={ filledFrames } setFilledFrames={ setFilledFrames }/>
        <LandscapeRectangleExtraWideFrame userArtUrl={userArtUrl} filledFrames={ filledFrames } setFilledFrames={ setFilledFrames }/>
      </div>
    </div>
  );
};
export default EightImgGalleryWall;
