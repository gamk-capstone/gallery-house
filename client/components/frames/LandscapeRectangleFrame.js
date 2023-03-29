import React, { useEffect, useState } from "react";

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
            className="landscapeRectangle"
            onClick={() => {
              setCurrentUrl(userArtUrl);
              setSelected(!selected);
              updateCount();
            }}
          />
          <section className="img-buttons">
            <a href={purchaseUrl}>
              <button>Nav</button>
            </a>
            <button onClick={() => setThisGenerate(!thisGenerate)}>
              Lock/Unlock
            </button>
          </section>
        </div>
      ) : (
        <img
          src={`${selected || generate ? currentUrl : "/white.jpeg"}`}
          className="landscapeRectangle"
          onClick={() => {
            setCurrentUrl(userArtUrl);
            setSelected(!selected);
            updateCount();
          }}
        />
      )}
    </div>
  );
};

export default LandscapeRectangleFrame;
