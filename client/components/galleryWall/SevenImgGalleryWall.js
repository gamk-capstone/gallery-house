import React from "react";
import SquareFrame from "../frames/SquareFrame";
import LandscapeRectangleFrame from "../frames/LandscapeRectangleFrame";

/**
 * `SevenImgGalleryWall` component
 * @returns HTML for gallery wall comprised of seven images
 */

const SevenImageGalleryWall = ({
  userArtUrl,
  filledFrames,
  setFilledFrames,
  etsyImages,
  generate,
}) => {
  console.log("etsyImages", etsyImages);
  return (
    <div className="flex justify-center flex-col gap-4">
      <div className="flex justify-center flex-row items-end gap-4">
        <SquareFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages ? etsyImages[0] : ""}
          generate={generate}
        />
        <LandscapeRectangleFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages ? etsyImages[1] : ""}
          generate={generate}
        />
      </div>
      <div className="flex justify-center flex-row items-center gap-4">
        <SquareFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages ? etsyImages[2] : ""}
          generate={generate}
        />
        <SquareFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages ? etsyImages[3] : ""}
          generate={generate}
        />
        <SquareFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages ? etsyImages[4] : ""}
          generate={generate}
        />
      </div>
      <div className="flex justify-center flex-row items-start gap-4">
        <LandscapeRectangleFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages ? etsyImages[5] : ""}
          generate={generate}
        />
        <SquareFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages ? etsyImages[6] : ""}
          generate={generate}
        />
      </div>
    </div>
  );
};
export default SevenImageGalleryWall;
