import React from "react";
import SquareFrame from "../frames/SquareFrame";

/**
 * `SixImgGalleryWall` component
 * @returns HTML for gallery wall comprised of six images
 */

const SixImageGalleryWall = ({ userArtUrl, filledFrames, setFilledFrames, etsyImages, generate }) => {
  return (
    <div className="flex justify-center flex-col gap-4">
      <div className="flex justify-center flex-row items-end gap-4">
        <SquareFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={`${etsyImages ? etsyImages[0] : ""}`}
          generate={generate}
        />
        <SquareFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={`${etsyImages ? etsyImages[1] : ""}`}
          generate={generate}
        />
        <SquareFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={`${etsyImages ? etsyImages[2] : ""}`}
          generate={generate}
        />
      </div>
      <div className="flex justify-center flex-row items-start gap-4">
        <SquareFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={`${etsyImages ? etsyImages[3] : ""}`}
          generate={generate}
        />
        <SquareFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={`${etsyImages ? etsyImages[4] : ""}`}
          generate={generate}
        />
        <SquareFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={`${etsyImages ? etsyImages[5] : ""}`}
          generate={generate}
        />
      </div>
    </div>
  );
};
export default SixImageGalleryWall;
