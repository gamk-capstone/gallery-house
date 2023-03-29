import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSavedEtsyArtAsync } from "../savedEtsyArt/savedEtsyArtSlice";

/**
 * `LandscapeRectangleFrame` component
 * @returns HTML for rectanglar landscape frame
 */

const LandscapeRectangleFrame = ({
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
  const [currentUrl, setCurrentUrl] = useState("/white.jpeg");
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

  return (
    <div>
      {etsyImages && etsyImages.purchaseUrl ? (
        <div>
          <img
            src={`${selected || generate ? currentUrl : "/white.jpeg"}`}
            className={`w-60 h-40 p-3 border-2 border-solid border-[#e2be75] object-cover bg-gradient-to-t from-[#bf953f] via-[#b38728] to-[#fbf5b7] drop-shadow-md shrink`}
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
          src={`${selected || generate ? currentUrl : "/white.jpeg"}`}
          className={`w-60 h-40 p-3 border-2 border-solid border-[#e2be75] object-cover bg-gradient-to-t from-[#bf953f] via-[#b38728] to-[#fbf5b7] drop-shadow-md shrink`}
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

export default LandscapeRectangleFrame;
