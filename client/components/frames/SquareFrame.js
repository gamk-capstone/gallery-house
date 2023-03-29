import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSavedEtsyArtAsync } from "../savedEtsyArt/savedEtsyArtSlice";

/**
 * `SquareFrame` component
 * @returns HTML for square frame
 */

const SquareFrame = ({
  userArtUrl,
  setFilledFrames,
  filledFrames,
  etsyImages,
  generate,
  saved,
  savedUrls,
}) => {
  //--------------------------------------------------
  //#region Local State
  //--------------------------------------------------
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth.me);
  const [selected, setSelected] = useState(false);
  const [purchaseUrl, setPurchaseUrl] = useState(null);
  const [thisGenerate, setThisGenerate] = useState(true);
  const [currentUrl, setCurrentUrl] = useState("./images/white.jpeg");

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
        // currentUrl === currentUrl;
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
      {purchaseUrl ? (
        <div>
          <img
            src={`${selected || generate ? currentUrl : "./images/white.jpeg"}`}
            className="square"
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
            <button onClick={() => setThisGenerate(!thisGenerate)}>
              Lock/Unlock
            </button>
            <button onClick={handleSave}>Like</button>
          </section>
        </div>
      ) : (
        <img
          src={`${selected || generate ? currentUrl : "./images/white.jpeg"}`}
          className="square"
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

export default SquareFrame;
