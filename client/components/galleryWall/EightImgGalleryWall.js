import React from "react";
import LandscapeRectangleExtraWideFrame from "../frames/LandscapeRectangleExtraWideFrame";
import PortraitRectangleFrame from "../frames/PortraitRectangleFrame";
import SquareLargeFrame from "../frames/SquareLargeFrame";

/**
 * `EightImgGalleryWall`component
 * @returns HTML for gallery wall comprised of eight images
 */

const EightImgGalleryWall = ({
  userArtUrl,
  filledFrames,
  setFilledFrames,
  etsyImages,
  generate,
}) => {
  return (
    <div className="flex justify-center flex-col gap-4">
      <div className="flex justify-center flex-row items-end gap-4">
        <LandscapeRectangleExtraWideFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages[0]}
          generate={generate}
        />
        <SquareLargeFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages[1]}
          generate={generate}
        />
        <PortraitRectangleFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages[2]}
          generate={generate}
        />
        <LandscapeRectangleExtraWideFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages[3]}
          generate={generate}
        />
      </div>
      <div className="flex justify-center flex-row items-start gap-4">
        <LandscapeRectangleExtraWideFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages[4]}
          generate={generate}
        />
        <PortraitRectangleFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages[5]}
          generate={generate}
        />
        <SquareLargeFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages[6]}
          generate={generate}
        />
        <LandscapeRectangleExtraWideFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages[7]}
          generate={generate}
        />
      </div>
    </div>
  );
};
export default EightImgGalleryWall;
