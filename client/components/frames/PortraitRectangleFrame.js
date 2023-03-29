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
      {etsyImages && !selected ? (
        <div>
          <img
            src={`${selected || generate ? currentUrl : "./images/white.jpeg"}`}
            className={styles.portraitRectangle}
            onClick={() => {
              if (userArtUrl) {
                setCurrentUrl(userArtUrl);
                setSelected(!selected);
                updateCount();
              }
            }}
          />
          <section className="img-buttons">
            <a href={purchaseUrl} target="_blank">
              <button>Nav</button>
            </a>
            <button
              onClick={() => {
                setThisGenerate(!thisGenerate);
                setSelected(!selected);
              }}
            >
              Lock/Unlock
            </button>
            <button onClick={handleSave}>Like</button>
          </section>
        </div>
      ) : (
        <img
          src={`${selected || generate ? currentUrl : "./images/white.jpeg"}`}
          className={styles.portraitRectangle}
          onClick={() => {
            if (userArtUrl) {
              setCurrentUrl(userArtUrl);
              setSelected(!selected);
              updateCount();
            }
          }}
        />
      )}
    </div>
  );
};

export default PortraitRectangleFrame;
