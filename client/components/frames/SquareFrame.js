import React, { useEffect, useState } from "react";

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
      //Guard case: Then check if the currentUrl is userArtUrl, if it is set generate false.
      if (currentUrl === userArtUrl) {
        setThisGenerate(false);
      }
    };
    updateFrameStatus();
  }, [currentUrl]);

  useEffect(() => {
    const populateWithEtsyImg = () => {
      //If thisGenerate is true, populate this frame.
      if (thisGenerate) {
        //setCurrentUrl === estyUrl
        setCurrentUrl(etsyImages);
      } else {
        currentUrl === currentUrl;
      }
    };
    populateWithEtsyImg();
  }, [generate]);

  return (
    <img
      src={`${selected || generate ? currentUrl : "/white.jpeg"}`}
      className="w-40 h-40 p-3 border-2 border-solid border-[#e2be75] object-cover bg-gradient-to-t from-[#bf953f] via-[#b38728] to-[#fbf5b7] drop-shadow-md shrink"
      onClick={() => {
        setCurrentUrl(userArtUrl);
        setSelected(!selected);
        updateCount();
      }}
    />
  );
};

export default SquareFrame;
