//Imported tools/libraries
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//Imported Components
import FiveImgGalleryWall from "../galleryWall/FiveImgGalleryWall";
import SixImgGalleryWall from "../galleryWall/SixImgGalleryWall";
import SevenImgGalleryWall from "../galleryWall/SevenImgGalleryWall";
import EightImgGalleryWall from "../galleryWall/EightImgGalleryWall";

//Imported Files
import {
  fetchSingleWallAsync,
  selectSavedWall,
} from "../savedWall/savedWallSlice";

/**
 * SavedWall component
 */
const SavedWall = () => {
  const dispatch = useDispatch();
  const { wallId } = useParams();

  //redux state
  const { id } = useSelector((state) => state.auth.me);
  const username = useSelector((state) => state.auth.me.username);
  const wall = useSelector(selectSavedWall);

  //local state that is used in this component
  const [saved, setSaved] = useState(true);
  const [savedUrls, setSavedUrls] = useState(null);
  const [generate, setGenerate] = useState(null);

  const { images, createdAt } = wall;
  const [numberOfImages, setNumberOfImages] = useState("5");

  //`fillFramesWithSavedImgs` is a react hook that dispatched a thunk `fetchSingleWallAsync` and return the data for this saved wall.
  useEffect(() => {
    const fillFramesWithSavedImgs = async () => {
      await dispatch(fetchSingleWallAsync({ userId: id, wallId: wallId }));
    };
    fillFramesWithSavedImgs();
  }, [dispatch]);

  //a second hook updates the local state with images from thunk
  useEffect(() => {
    setSaved(true);
    setSavedUrls(images);
    setGenerate(true);
  }, [images]);

  //a third hook updates the local state for number of images
  useEffect(() => {
    if (images) {
      setNumberOfImages(images.length);
      if (images.map((i) => i.includes("gamkgalleryhouse"))) {
        setNumberOfImages(images.length - 1);
      }
    }
  }, [images]);

  //--------------------------------------------------
  //#region Layout
  //--------------------------------------------------

  console.log("IMAGES", images);
  console.log("NUMBER OF IMAGES", numberOfImages);
  console.log("savedUrls", savedUrls);

  /**
   * `getNumberForLayout` configures the correct layout based on the number of images in this saved wall.
   */

  const getNumberForLayout = () => {
    if (numberOfImages === 5)
      return (
        <FiveImgGalleryWall
          saved={saved}
          savedUrls={savedUrls}
          generate={generate}
        />
      );
    if (numberOfImages === 6) {
      return (
        <SixImgGalleryWall
          saved={saved}
          savedUrls={savedUrls}
          generate={generate}
        />
      );
    }
    if (numberOfImages === 7) {
      return (
        <SevenImgGalleryWall
          saved={saved}
          savedUrls={savedUrls}
          generate={generate}
        />
      );
    }
    if (numberOfImages === 8) {
      return (
        <EightImgGalleryWall
          saved={saved}
          savedUrls={savedUrls}
          generate={generate}
        />
      );
    }
  };

  //#endregion Layout

  const updateCreatedAt = () => {
    if (createdAt){
      return `${wall.createdAt.slice(5, 7)}/${wall.createdAt.slice(8, 10)}/${wall.createdAt.slice(0, 4)}`;
    }
  };

  return (
    <div className="">
      {getNumberForLayout()}
      {wall ? (
        <div>
          {wall.name ? (
            <h2>Name: {wall.name}</h2>
          ) : (
            <div>This wall doesn't have a name</div>
          )}
          <p>Created on: {updateCreatedAt()}</p>
          <p> Created by: {username}</p>
        </div>
      ) : (
        <div>Oops, this wall doesn't exist!</div>
      )}
    </div>
  );
};

export default SavedWall;
