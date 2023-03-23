import React, { useState } from "react";

/**
 * `PortraitRectangleFrame` component
 * @returns HTML for rectangular portrait frame
 */

const PortraitRectangleFrame = ({ userArtUrl, setFilledFrames, filledFrames, etsyImages,
  generate }) => {
  const [selected, setSelected] = useState(false)
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
    } else if (generate && !selected && currentUrl === "/white.jpeg" || currentUrl === null) {
      console.log("GENERATE PORTRAIT-RECTANGLE FRAME", generate);
      //setCurrentUrl === estyUrl
    }
  };
  updateEmptyFrameWithEtsyArt();

  return (
    <img
      src={`${selected ? currentUrl : "/white.jpeg"}`}
      className="w-40 h-60 p-3 border-2 border-solid border-[#e2be75] object-cover bg-gradient-to-t from-[#bf953f] via-[#b38728] to-[#fbf5b7] drop-shadow-md shrink"
      onClick={() => {
        setCurrentUrl(userArtUrl);
        setSelected(!selected);
        updateCount();
      }}
    />
  );
};

export default PortraitRectangleFrame;
