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

import styles from "../styles/SavedWall.module.css";

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
  const [sofa, setSofa] = useState("sofaBeigeRounded");

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
      setSofa(images[images.length - 1]);
      if (images.map((i) => i.includes("gamkgalleryhouse"))) {
        setNumberOfImages(images.length - 1);
      }
    }
  }, [images]);

  //--------------------------------------------------
  //#region Layout
  //--------------------------------------------------

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

  const getSofaForLayout = () => {
    switch (sofa) {
      case "sofaBeigeRounded":
        return (
          <img
            src="/images/sofa-beige-rounded.png"
            className={styles.sofaImage}
          />
        );
        break;
      case "sofaTealVelvet":
        return (
          <img
            src="/images/sofa-teal-velvet.png"
            className={styles.sofaImage}
          />
        );
      case "blackLeather":
        return (
          <img src="/images/black-leather.png" className={styles.sofaImage} />
        );
      case "blueVelvet":
        return (
          <img src="/images/blue-velvet.png" className={styles.sofaImage} />
        );
      case "blushVelvet":
        return (
          <img src="/images/blush-velvet.png" className={styles.sofaImage} />
        );
      case "ovalTable":
        return (
          <img src="/images/oval-table.png" className={styles.sofaImage} />
        );
      case "rectangleTable":
        return (
          <img
            src="/images/dining-table-rectangle.png"
            className={styles.sofaImage}
          />
        );
    }
  };

  const updateCreatedAt = () => {
    if (createdAt) {
      return `${wall.createdAt.slice(5, 7)}/${wall.createdAt.slice(
        8,
        10
      )}/${wall.createdAt.slice(0, 4)}`;
    }
  };

  return (
    <div>
      {wall ? (
        <div>
          {wall.name ? (
            <div className={styles.parentDiv}>
              <div className={styles.wallInfo}>
                <h2 className={styles.savedWallName}>{wall.name}</h2>
                <div className={styles.createdInfo}>
                  <p className={styles.updateText}>
                    Created on {updateCreatedAt()} by {username}.
                  </p>
                </div>
                <hr className={styles.hr} />
              </div>
              <div className={styles.sofaFramesContainer}>
                {getNumberForLayout()}
                {getSofaForLayout()}
              </div>
            </div>
          ) : (
            <div className={styles.parentDiv}>
              <div className={styles.wallInfo}>
                <h2 className={styles.savedWallNoName}>
                  This wall doesn't have a name
                </h2>
                <div className={styles.createdInfo}>
                  <p className={styles.updateText}>
                    Created on {updateCreatedAt()} by {username}.
                  </p>
                </div>
                <hr className={styles.hr} />
              </div>
              <div className={styles.sofaFramesContainer}>
                {getNumberForLayout()}
                {getSofaForLayout()}
              </div>
            </div>
          )}
        </div>
      ) : (
        <h2 className={styles.savedWallNoName}>
          Oops, this wall doesn't exist!
        </h2>
      )}
    </div>
  );
};

export default SavedWall;
