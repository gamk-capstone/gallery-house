import React, { useState } from "react";
import FiveImageGalleryWall from "./FiveImgGalleryWall";
import SixImageGalleryWall from "./SixImgGalleryWall";
import SevenImageGalleryWall from "./SevenImgGalleryWall";
import EightImageGalleryWall from "./EightImgGalleryWall";
import Sofa from "./Sofa";

const GalleryWall = () => {
  const [selectedNumPhotos, setSelectedNumPhotos] = useState("5");

  const getNumberForLayout = () => {
    switch (selectedNumPhotos) {
      case "5":
        return <FiveImageGalleryWall />;
        break;
      case "6":
        return <SixImageGalleryWall />;
        break;
      case "7":
        return <SevenImageGalleryWall />;
        break;
      case "8":
        return <EightImageGalleryWall />;
    }
  };

  return (
    <div className="galleryWallParentDiv">
      {getNumberForLayout()}
      <Sofa />
      <>
        <label htmlFor="numberOfPhotos">
          Choose the number of photos for your gallery wall:
        </label>
        <select
          name="numberOfPhotos"
          id="numberOfPhotos"
          onChange={(e) => setSelectedNumPhotos(e.target.value)}
        >
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
        </select>
      </>
    </div>
  );
};

export default GalleryWall;
