import React, { useState } from "react";

/**
 * `SquareFrame` component
 * @returns HTML for square frame 
 */

const SquareFrame = ({ userArtUrl, setFilledFrames, filledFrames, etsyImages,
  generate }) => {
  const [selected, setSelected] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(null);

  const updateCount = () => {
    if (!selected) {
      setFilledFrames(filledFrames + 1)
    } else if (selected) {
      setFilledFrames(filledFrames - 1)
    }
  };

  const updateEmptyFrameWithEtsyArt = () => {
    //If not selected, and empty, and user has clicked generate
    if (!generate) {
    } else if (generate && !selected) {
      console.log("GENERATE SQUARE FRAME", generate);
      //setCurrentUrl === estyUrl
    }
  };
  updateEmptyFrameWithEtsyArt();

  return (
    <img
      src={`${selected ? currentUrl : "/white.jpeg"}`}
      className="w-40 h-40 p-3 border-2 border-solid border-[#e2be75] object-cover bg-gradient-to-t from-[#bf953f] via-[#b38728] to-[#fbf5b7] drop-shadow-md shrink" onClick={() => {
        setCurrentUrl(userArtUrl);
        setSelected(!selected);
        updateCount();
      }}
    />
  );
};

export default SquareFrame;
