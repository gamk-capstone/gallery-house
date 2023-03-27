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
      } else {
        currentUrl === currentUrl;
      }
    };
    populateWithEtsyImg();
  }, [generate]);

  // const myRe = /([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#\.]?[\w-]+)*\/?/gm
  // let imageArr = savedUrls.match(myRe)[0]

  // useEffect(() => {
  //   const populateWithSavedImg = () => {
  //     // const savedImageUrl = imageArr[0]
  //     // const savedProductUrl = imageArr[1]
  //     if (saved) {
  //       setCurrentUrl(
  //         imageArr
  //       );
  //     }
  //   };
  //   populateWithSavedImg();
  // }, [saved]);

  return (
    <div>
      {etsyImages && etsyImages.purchaseUrl ? (
        <a href={etsyImages.purchaseUrl}>
          <img
            src={`${
              selected || generate || currentUrl === savedUrls
                ? currentUrl
                : "/white.jpeg"
            }`}
            className={`w-60 h-40 p-3 border-2 border-solid border-[#e2be75] object-cover bg-gradient-to-t from-[#bf953f] via-[#b38728] to-[#fbf5b7] drop-shadow-md shrink`}
            onClick={() => {
              setCurrentUrl(userArtUrl);
              setSelected(!selected);
              updateCount();
            }}
          />
        </a>
      ) : (
        <img
          src={`${selected || generate ? currentUrl : "/white.jpeg"}`}
          className={`w-60 h-40 p-3 border-2 border-solid border-[#e2be75] object-cover bg-gradient-to-t from-[#bf953f] via-[#b38728] to-[#fbf5b7] drop-shadow-md shrink`}
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
