import React from "react";
import LandscapeRectangleExtraWideFrame from "../frames/LandscapeRectangleExtraWideFrame";
import PortraitRectangleFrame from "../frames/PortraitRectangleFrame";
import SquareLargeFrame from "../frames/SquareLargeFrame";

const EightImageGalleryWall = () => {
  return (
    <div className="flex justify-center flex-col gap-4">
      <div className="flex justify-center flex-row items-end gap-4">
        <LandscapeRectangleExtraWideFrame />
        <SquareLargeFrame />
        <PortraitRectangleFrame />
        <LandscapeRectangleExtraWideFrame />
      </div>
      <div className="flex justify-center flex-row items-start gap-4">
        <LandscapeRectangleExtraWideFrame />
        <PortraitRectangleFrame />
        <SquareLargeFrame />
        <LandscapeRectangleExtraWideFrame />
      </div>
    </div>
  );
};
export default EightImageGalleryWall;
