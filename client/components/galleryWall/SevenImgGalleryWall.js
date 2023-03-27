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
  saved,
  savedUrls,
}) => {
  return (
    <div className="flex justify-center flex-col gap-4">
      <div className="flex justify-center flex-row items-end gap-4">
        <SquareFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages ? etsyImages[0] : ""}
          generate={generate}
          saved={saved}
          savedUrls={savedUrls ? savedUrls[0] : ""}
        />
        <LandscapeRectangleFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages ? etsyImages[1] : ""}
          generate={generate}
          saved={saved}
          savedUrls={savedUrls ? savedUrls[1] : ""}
        />
      </div>
      <div className="flex justify-center flex-row items-center gap-4">
        <SquareFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages ? etsyImages[2] : ""}
          generate={generate}
          saved={saved}
          savedUrls={savedUrls ? savedUrls[2] : ""}
        />
        <SquareFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages ? etsyImages[3] : ""}
          generate={generate}
          saved={saved}
          savedUrls={savedUrls ? savedUrls[3] : ""}
        />
        <SquareFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages ? etsyImages[4] : ""}
          generate={generate}
          saved={saved}
          savedUrls={savedUrls ? savedUrls[4] : ""}
        />
      </div>
      <div className="flex justify-center flex-row items-start gap-4">
        <LandscapeRectangleFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages ? etsyImages[5] : ""}
          generate={generate}
          saved={saved}
          savedUrls={savedUrls ? savedUrls[5] : ""}
        />
        <SquareFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages ? etsyImages[6] : ""}
          generate={generate}
          saved={saved}
          savedUrls={savedUrls ? savedUrls[6] : ""}
        />
      </div>
    </div>
  );
};
export default SevenImageGalleryWall;
