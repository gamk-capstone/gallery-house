import React from "react";
import FiveImgGalleryWall from "../galleryWall/FiveImgGalleryWall";
/**
 * `Home` component
 * @returns HTML for the Gallery House landing page
 */
const Home = () => {
  return (
    <div className="grid grid-rows-1 justify-items-center">
      <div className="font-house-font text-3xl">
        Gallery{" "}
        <span className="font-house-font font-light text-3xl text-pink-700">
          ·
        </span>{" "}
        House
      </div>
      <div className="grid grid-rows-2 justify-items-center">
        <FiveImgGalleryWall className="row-start-1 row-span-1"></FiveImgGalleryWall>
        <img
          src="/sofa-beige-rounded.png"
          className="row-start-2 row-span-1 max-w-[900px]"
        />
      </div>
    </div>
  );
};

export default Home;
