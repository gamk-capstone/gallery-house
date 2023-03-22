import React from "react";
import SquareFrame from "../frames/SquareFrame";

const SixImageGalleryWall = ({ userArtUrl }) => {
  return (
    <div className="flex justify-center flex-col gap-4">
      <div className="flex justify-center flex-row items-end gap-4">
        <SquareFrame userArtUrl={userArtUrl}/>
        <SquareFrame userArtUrl={userArtUrl}/>
        <SquareFrame userArtUrl={userArtUrl}/>
      </div>
      <div className="flex justify-center flex-row items-start gap-4">
        <SquareFrame userArtUrl={userArtUrl}/>
        <SquareFrame userArtUrl={userArtUrl}/>
        <SquareFrame userArtUrl={userArtUrl}/>
      </div>
    </div>
  );
};
export default SixImageGalleryWall;
