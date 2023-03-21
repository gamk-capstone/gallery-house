import React from "react";
import SquareFrame from "../frames/SquareFrame";
import LandscapeRectangleFrame from "../frames/LandscapeRectangleFrame";

const SevenImageGalleryWall = () => {
  return (
    <div className="flex justify-center flex-col gap-4">
      <div className="flex justify-center flex-row items-end gap-4">
        <SquareFrame />
        <LandscapeRectangleFrame />
      </div>
      <div className="flex justify-center flex-row items-center gap-4">
        <SquareFrame />
        <SquareFrame />
        <SquareFrame />
      </div>
      <div className="flex justify-center flex-row items-start gap-4">
        <LandscapeRectangleFrame />
        <SquareFrame />
      </div>
    </div>
  );
};
export default SevenImageGalleryWall;
