import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSavedEtsyArtAsync,
  deleteSavedEtsyArtByUrlAsync,
} from "../savedEtsyArt/savedEtsyArtSlice";
import styles from "../styles/PortraitRectangleFrame.module.css";

/**
 * `PortraitRectangleFrame` component
 * @returns HTML for rectangular portrait frame
 */

const PortraitRectangleFrame = ({
  userArtUrl,
  setFilledFrames,
  filledFrames,
  etsyImages,
  generate,
  saved,
  savedUrls,
  setImageUrl
}) => {
  //--------------------------------------------------
  //#region Local State
  //--------------------------------------------------
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth.me);
  const [selected, setSelected] = useState(false);
  const [purchaseUrl, setPurchaseUrl] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("/images/white.jpeg");
  const [thisGenerate, setThisGenerate] = useState(true);
  const [locked, setLocked] = useState(false);
  const [liked, setLiked] = useState(false);

  //#endregion Local State

  /**
   * `updateCount` properly iterates the `filledFrames` state based on if this frame is selected
   */
  const updateCount = () => {
    if (!selected) {
      setFilledFrames(filledFrames + 1);
    } else if (selected) {
      setFilledFrames(filledFrames - 1);
    }
  };

  /**
   * `handleSave` creates a new instance of SavedEtsyArt associated with the user
   */
  const handleSave = () => {
    dispatch(
      createSavedEtsyArtAsync({
        imageUrl: currentUrl,
        purchaseUrl: purchaseUrl,
        userId: id,
        etsyId: etsyImages.id
      })
    );
  };

  const handleDelete = () => {
    dispatch(
      deleteSavedEtsyArtByUrlAsync({
        userId: id,
        etsyId: etsyImages.id
      })
    );
  };

  //hook that toggles the `thisGenerate` state to false if this frame contains a user's art. Dependent on `currentUrl` state.
  useEffect(() => {
    const updateFrameStatus = () => {
      //Guard case: If the currentUrl is userArtUrl, set thisGenerate false.
      if (currentUrl === userArtUrl) {
        setThisGenerate(false);
      }
    };
    updateFrameStatus();
  }, [currentUrl]);

  //hook that sets the `currentUrl` and `purchaseUrl` with the etsyImages. Depended on `generate` state.
  useEffect(() => {
    const populateWithEtsyImg = () => {
      //If thisGenerate is true, populate this frame.
      if (thisGenerate && etsyImages) {
        //setCurrentUrl === estyImageUrl
        setCurrentUrl(etsyImages.imageUrl);
        setPurchaseUrl(etsyImages.purchaseUrl);
      } else {
        currentUrl === currentUrl;
      }
    };
    populateWithEtsyImg();
  }, [generate]);

  //hook that populates the frame with saved art. Dependent on `saveUrls` state.
  useEffect(() => {
    if (savedUrls) {
      const myRe =
        /([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#\.]?[\w-]+)*\/?/gm;
      setCurrentUrl(savedUrls.match(myRe)[0]);
      setPurchaseUrl(savedUrls.match(myRe)[1]);
    }
    setSelected(false);
  }, [savedUrls]);

  return (
    <div>
      {etsyImages ? (
        !selected ? (
          <div
            className={
              currentUrl === "./images/white.jpeg"
                ? styles.container
                : `${styles.container} ${styles.filled}`
            }
          >
            <img
              src={`${
                selected || generate ? currentUrl : "./images/white.jpeg"
              }`}
              className={
                currentUrl === "./images/white.jpeg"
                  ? styles.portraitRectangle
                  : `${styles.portraitRectangle} ${styles.filled}`
              }
              onClick={() => {
                if (userArtUrl) {
                  setCurrentUrl(userArtUrl);
                  setSelected(!selected);
                  updateCount();
                  setImageUrl(null);
                }
              }}
            />
            <section className={styles.buttons}>
              <a href={purchaseUrl} target="_blank">
                <button>
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                </button>
              </a>
              <button
                onClick={() => {
                  setThisGenerate(!thisGenerate);
                  setSelected(!selected);
                  setLocked(!locked);
                }}
              >
                <span className="material-symbols-outlined">
                  {locked ? "lock" : "lock_open"}
                </span>
              </button>
              <button
                onClick={() => {
                  if (liked) {
                    handleDelete();
                  } handleSave();
                  setLiked(!liked);
                }}
              >
                <span className="material-symbols-outlined">
                  {liked ? "heart_broken" : "favorite"}
                </span>
              </button>
            </section>
          </div>
        ) : (
          <div
            className={
              currentUrl === "./images/white.jpeg"
                ? styles.container
                : `${styles.container} ${styles.filled}`
            }
          >
            <img
              src={`${
                selected || generate ? currentUrl : "./images/white.jpeg"
              }`}
              className={
                currentUrl === "./images/white.jpeg"
                  ? styles.portraitRectangle
                  : `${styles.portraitRectangle} ${styles.filled}`
              }
              onClick={() => {
                if (userArtUrl) {
                  setCurrentUrl(userArtUrl);
                  setSelected(!selected);
                  updateCount();
                  setImageUrl(null);
                  
                }
              }}
            />
            <section className={styles.buttons}>
              <a href={purchaseUrl} target="_blank">
                <button>
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                </button>
              </a>
              <button
                onClick={() => {
                  setThisGenerate(!thisGenerate);
                  setSelected(!selected);
                }}
              >
                <span
                  className="material-symbols-outlined"
                  onClick={() => setLocked(!locked)}
                >
                  {locked ? "lock" : "lock_open"}
                </span>
              </button>
              <button
                onClick={() => {
                  if (liked) {
                    handleDelete();
                  } handleSave();
                  setLiked(!liked);
                }}
              >
                <span className="material-symbols-outlined">
                  {liked ? "heart_broken" : "favorite"}
                </span>
              </button>
            </section>
          </div>
        )
      ) : (
        <div className={styles.container}>
          <img
            src={`${selected || generate ? currentUrl : "./images/white.jpeg"}`}
            className={
              currentUrl === "./images/white.jpeg"
                ? styles.portraitRectangle
                : `${styles.portraitRectangle} ${styles.filled}`
            }
            onClick={() => {
              if (userArtUrl) {
                setCurrentUrl(userArtUrl);
                setSelected(!selected);
                updateCount();
                setImageUrl(null);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PortraitRectangleFrame;
