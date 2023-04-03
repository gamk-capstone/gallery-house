import React from "react";
import LandscapeRectangleFrame from "../frames/LandscapeRectangleFrame";
import SquareFrame from "../frames/SquareFrame";
import PortraitRectangleFrame from "../frames/PortraitRectangleFrame";
import styles from "../styles/XImgGalleryWall.module.css";

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
  saved,
  savedUrls,
  savedPurchaseUrl
}) => {
  return (
    <div className={styles.frameLayoutParentDiv}>
      <div className={styles.frameLayoutTopRow}>
        <LandscapeRectangleFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages ? etsyImages[0] : ""}
          generate={generate}
          saved={saved}
          savedUrls={savedUrls ? savedUrls[0] : ""}
          savedPurchaseUrl={savedPurchaseUrl}
        />
        <SquareFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages ? etsyImages[1] : ""}
          generate={generate}
          saved={saved}
          savedUrls={savedUrls ? savedUrls[1] : ""}
          savedPurchaseUrl={savedPurchaseUrl}
        />
      </div>
      <div className={styles.frameLayoutBottomRow}>
        <LandscapeRectangleFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages ? etsyImages[2] : ""}
          generate={generate}
          saved={saved}
          savedUrls={savedUrls ? savedUrls[2] : ""}
          savedPurchaseUrl={savedPurchaseUrl}
        />
        <PortraitRectangleFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages ? etsyImages[3] : ""}
          generate={generate}
          saved={saved}
          savedUrls={savedUrls ? savedUrls[3] : ""}
          savedPurchaseUrl={savedPurchaseUrl}
        />
        <LandscapeRectangleFrame
          userArtUrl={userArtUrl}
          filledFrames={filledFrames}
          setFilledFrames={setFilledFrames}
          etsyImages={etsyImages ? etsyImages[4] : ""}
          generate={generate}
          saved={saved}
          savedUrls={savedUrls ? savedUrls[4] : ""}
          savedPurchaseUrl={savedPurchaseUrl}
        />
      </div>
    </div>
  );
};
export default FiveImgGalleryWall;
