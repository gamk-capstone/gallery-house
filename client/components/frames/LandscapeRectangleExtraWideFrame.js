import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSavedEtsyArtAsync,
  deleteSavedEtsyArtByUrlAsync,
} from "../savedEtsyArt/savedEtsyArtSlice";
import styles from "../styles/LandscapeRectangleExtraWideFrame.module.css";

/**
 * `LandscapeRectangleExtraWideFrame` component
 * @returns HTML for rectangular ex-wide landscape frame
 */

const LandscapeRectangleExtraWideFrame = ({
  userArtUrl,
  setFilledFrames,
  filledFrames,
  etsyImages,
  generate,
  savedUrls,
  savedPurchaseUrl
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
        etsyId: etsyImages.id,
      })
    );
  };

  const handleDelete = () => {
    dispatch(
      deleteSavedEtsyArtByUrlAsync({
        userId: id,
        etsyId: etsyImages.id,
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
  }, [currentUrl, locked]);

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
          //When etsyImages and !selected
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
                  ? styles.landscapeExtraWide
                  : `${styles.landscapeExtraWide} ${styles.filled}`
              }
              onClick={() => {
                if (userArtUrl) {
                  setCurrentUrl(userArtUrl);
                  setPurchaseUrl(savedPurchaseUrl);
                  setSelected(!selected);
                  setThisGenerate(!thisGenerate);//>>
                  updateCount();
                }
              }}
            />
            <section className={styles.buttons}>
              <a href={purchaseUrl} target="_blank">
                <button>
                  <img
                    src="./images/icons/cart-icon.png"
                    className={styles.icon}
                  />
                </button>
              </a>
              <button
                onClick={() => {
                  //Lock/Unlocked" button it toggles the "thisGenerate" state so frame won't re-generate if the user likes the image
                  setSelected(!selected);
                  setLocked(!locked);
                  setThisGenerate(!thisGenerate);//>>
                }}
              >
                {locked ? (
                  <img
                    src="./images/icons/lock-icon.png"
                    className={styles.icon}
                  />
                ) : (
                  <img
                    src="./images/icons/unlock-icon.png"
                    className={styles.icon}
                  />
                )}
              </button>
              <button
                onClick={() => {
                  if (liked) {
                    handleDelete();
                  }
                  handleSave();
                  setLiked(!liked);
                }}
              >
                {liked ? (
                  <img
                    src="./images/icons/unlike-icon.png"
                    className={styles.icon}
                  />
                ) : (
                  <img
                    src="./images/icons/like-icon.png"
                    className={styles.icon}
                  />
                )}
              </button>
            </section>
          </div>
        ) : (
          //When etsyImages and selected
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
                  ? styles.landscapeExtraWide
                  : `${styles.landscapeExtraWide} ${styles.filled}`
              }
              onClick={() => {
                if (userArtUrl) {
                  setCurrentUrl(userArtUrl);
                  setPurchaseUrl(savedPurchaseUrl);
                  setSelected(!selected);
                  updateCount();
                  setThisGenerate(!thisGenerate);
                }
              }}
            />
            <section className={styles.etsyArtButtons}>
          <a href={purchaseUrl} target="_blank">
                <button>
                  <img
                    src="./images/icons/cart-icon.png"
                    className={styles.icon}
                  />
                </button>
              </a>
              <button
                onClick={() => {
                  if (liked) {
                    handleDelete();
                  }
                  handleSave();
                  setLiked(!liked);
                }}
              >
                {liked ? (
                  <img
                    src="./images/icons/unlike-icon.png"
                    className={styles.icon}
                  />
                ) : (
                  <img
                    src="./images/icons/like-icon.png"
                    className={styles.icon}
                  />
                )}
              </button>
          <button className={styles.clearButton} onClick={() => {
                setCurrentUrl("/images/white.jpeg");
                setThisGenerate(true);
                setSelected(false);
              }}>x</button>
              </section>
          </div>
        )
      ) : (
        selected ? (
        //When !etsyImages
        <div className={styles.container}>
          <img
            src={`${selected || generate ? currentUrl : "./images/white.jpeg"}`}
            className={
              currentUrl === "./images/white.jpeg"
                ? styles.landscapeExtraWide
                : `${styles.landscapeExtraWide} ${styles.filled}`
            }
            onClick={() => {
              if (userArtUrl) {
                setCurrentUrl(userArtUrl);
                setPurchaseUrl(savedPurchaseUrl);
                setSelected(!selected);
                updateCount();
                setThisGenerate(false);
                setLocked(true);
              }
            }}
          />
          <section className={styles.etsyArtButtons}>
          <a href={purchaseUrl} target="_blank">
                <button>
                  <img
                    src="./images/icons/cart-icon.png"
                    className={styles.icon}
                  />
                </button>
              </a>
          <button className={styles.clearButton} onClick={() => {
                setCurrentUrl("/images/white.jpeg");
                setThisGenerate(true);
                setSelected(false);
              }}>x</button>
              </section>
        </div>
        ) : (
          <div className={styles.containerEmpty}>
          <img
            src={`${selected || generate ? currentUrl : "./images/white.jpeg"}`}
            className={
              currentUrl === "./images/white.jpeg"
                ? styles.landscapeExtraWide
                : `${styles.landscapeExtraWide} ${styles.filled}`
            }
            onClick={() => {
              if (userArtUrl) {
                setCurrentUrl(userArtUrl);
                setPurchaseUrl(savedPurchaseUrl);
                setSelected(!selected);
                updateCount();
                setThisGenerate(false);
                setLocked(true);
              }
            }}
          />
        </div>
        )
      )}
    </div>
  );
};

export default LandscapeRectangleExtraWideFrame;
