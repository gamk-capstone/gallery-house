import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSavedEtsyArtAsync } from "../savedEtsyArt/savedEtsyArtSlice";
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
}) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth.me);
  const [selected, setSelected] = useState(false);
  const [purchaseUrl, setPurchaseUrl] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("./images/white.jpeg");
  const [thisGenerate, setThisGenerate] = useState(true);
  const [locked, setLocked] = useState(false);
  const [liked, setLiked] = useState(false);

  const updateCount = () => {
    if (!selected) {
      setFilledFrames(filledFrames + 1);
    } else if (selected) {
      setFilledFrames(filledFrames - 1);
    }
  };

  //Creates a new instance of SavedEtsyArt associated with the user
  const handleSave = () => {
    dispatch(
      createSavedEtsyArtAsync({
        imageUrl: currentUrl,
        purchaseUrl: purchaseUrl,
        userId: id,
      })
    );
  };

  useEffect(() => {
    const updateFrameStatus = () => {
      //Guard case: If the currentUrl is userArtUrl, set thisGenerate false.
      if (currentUrl === userArtUrl) {
        setThisGenerate(false);
      }
    };
    updateFrameStatus();
  }, [currentUrl]);

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

  useEffect(() => {
    if (savedUrls) {
      const myRe =
        /([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#\.]?[\w-]+)*\/?/gm;
      setCurrentUrl(savedUrls.match(myRe)[0]);
    }
    setSelected(false);
  }, [savedUrls]);

  console.log(savedUrls, "PORTRAIT RECTANGLE");
  console.log(currentUrl, "currentUrl PORTRAIT RECTANGLE");
  console.log(generate, "generate PORTRAIT RECTANGLE");
  console.log(selected, "selected PORTRAIT RECTANGLE");

  return (
    <div>
      {etsyImages ? (
        !selected ? (
          <div className={
            currentUrl === "./images/white.jpeg"
              ? styles.container
              : `${styles.container} ${styles.filled}`
          }>
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
                  setLocked(!locked)
                }}
              >
                <span className="material-symbols-outlined">{ locked ? "lock" : "lock_open"}</span>
              </button>
              <button onClick={() => {
                handleSave();
                setLiked(!liked);
              }}>
                <span className="material-symbols-outlined">{ liked ? "heart_broken" : "favorite"}</span>
              </button>
            </section>
          </div>
        ) : (
          <div className={
            currentUrl === "./images/white.jpeg"
              ? styles.container
              : `${styles.container} ${styles.filled}`
          }>
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
                <span className="material-symbols-outlined" onClick={() => setLocked(!locked)}>{ locked ? "lock" : "lock_open"}</span>
              </button>
              <button onClick={handleSave}>
                <span className="material-symbols-outlined">favorite</span>
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
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PortraitRectangleFrame;
