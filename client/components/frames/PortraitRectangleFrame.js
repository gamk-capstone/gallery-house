import React, { useState } from "react";

/**
 * `PortraitRectangleFrame` component
 * @returns HTML for rectangular portrait frame
 */

const PortraitRectangleFrame = ({ userArtUrl, setFilledFrames, filledFrames }) => {
  const [selected, setSelected] = useState(false)
  const [currentUrl, setCurrentUrl] = useState(null);

  const updateCount = () => {
    if (!selected) {
      setFilledFrames(filledFrames + 1)
    } else if (selected) {
      setFilledFrames(filledFrames - 1)
    }
  };

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
