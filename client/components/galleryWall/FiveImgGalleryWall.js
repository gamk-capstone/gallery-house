import React, { useState } from "react";
import LandscapeRectangleFrame from "../frames/LandscapeRectangleFrame";
import SquareFrame from "../frames/SquareFrame";
import PortraitRectangleFrame from "../frames/PortraitRectangleFrame";

/**
 * `FiveImgGalleryWall` component
 * @returns HTML for gallery wall comprised of five images
 */

const FiveImgGalleryWall = ({
  userArtUrl,
  filledFrames,
  setFilledFrames,
  etsyImages,
  generate,
}) => {

  console.log("etsyImages", etsyImages)
  return (
    <div className="flex justify-center flex-col gap-4">
      <div className="flex justify-center flex-row items-end gap-4">
        <LandscapeRectangleFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages ? etsyImages[0] : ""}
          generate={generate}
        />
        <SquareFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages[1]}
          generate={generate}
        />
      </div>
      <div className="flex justify-center flex-row items-start gap-4">
        <LandscapeRectangleFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages[2]}
          generate={generate}
        />
        <PortraitRectangleFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages[3]}
          generate={generate}
        />
        <LandscapeRectangleFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages[4]}
          generate={generate}
        />
      </div>
    </div>
  );
};
export default FiveImgGalleryWall;
