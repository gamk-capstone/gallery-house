import React from "react";
import SquareFrame from "../frames/SquareFrame";

/**
 * `SixImgGalleryWall` component 
 * @returns HTML for gallery wall comprised of six images
 */
const SixImgGalleryWall = () => {
  return (
    <div className="flex justify-center flex-col gap-4">
      <div className="flex justify-center flex-row items-end gap-4">
        <SquareFrame />
        <SquareFrame />
        <SquareFrame />
      </div>
      <div className="flex justify-center flex-row items-start gap-4">
        <SquareFrame />
        <SquareFrame />
        <SquareFrame />
      </div>
    </div>
  );
};
export default SixImgGalleryWall;
