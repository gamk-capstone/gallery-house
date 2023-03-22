import React from "react";
import SquareFrame from "../frames/SquareFrame";
import LandscapeRectangleFrame from "../frames/LandscapeRectangleFrame";

/**
 * `SevenImgGalleryWall` component 
 * @returns HTML for gallery wall comprised of seven images
 */

const SevenImageGalleryWall = ({ userArtUrl, filledFrames, setFilledFrames }) => {

  return (
    <div className="flex justify-center flex-col gap-4">
      <div className="flex justify-center flex-row items-end gap-4">
        <SquareFrame userArtUrl={userArtUrl} filledFrames={ filledFrames } setFilledFrames={ setFilledFrames }/>
        <LandscapeRectangleFrame userArtUrl={userArtUrl} filledFrames={ filledFrames } setFilledFrames={ setFilledFrames }/>
      </div>
      <div className="flex justify-center flex-row items-center gap-4">
        <SquareFrame userArtUrl={userArtUrl} filledFrames={ filledFrames } setFilledFrames={ setFilledFrames }/>
        <SquareFrame userArtUrl={userArtUrl} filledFrames={ filledFrames } setFilledFrames={ setFilledFrames }/>
        <SquareFrame userArtUrl={userArtUrl} filledFrames={ filledFrames } setFilledFrames={ setFilledFrames }/>
      </div>
      <div className="flex justify-center flex-row items-start gap-4">
        <LandscapeRectangleFrame userArtUrl={userArtUrl} filledFrames={ filledFrames } setFilledFrames={ setFilledFrames }/>
        <SquareFrame userArtUrl={userArtUrl} filledFrames={ filledFrames } setFilledFrames={ setFilledFrames }/>
      </div>
    </div>
  );
};
export default SevenImageGalleryWall;
