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
  setGenerate,
}) => {
  console.log("generate in frame", generate);

  const [selected, setSelected] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("/white.jpeg");

  const updateCount = () => {
    if (!selected) {
      setFilledFrames(filledFrames + 1);
    } else if (selected) {
      setFilledFrames(filledFrames - 1);
    }
  };

  const updateFrameStatus = () => {
    //Guard case: First check if the user has selected this frame, if they have
    //Set generate false.
    if (selected) {
      setGenerate(false);
    }
    //Guard case: Then check if the currentUrl is userArtUrl, if it is
    //Set generate false.
    if (currentUrl === userArtUrl) {
      console.log("currentURL", currentUrl);
      setGenerate(false);
    }
  };
  updateFrameStatus();

  useEffect(() => {
    //Otherwise, generate is true. Populate this frame.
    if (generate) {
      //setCurrentUrl === estyUrl
      console.log("single URL", etsyImages[1]);
      setCurrentUrl(etsyImages[1]);
    }
  }, [updateFrameStatus, generate]);

  return (
    <img
      src={`${selected ? currentUrl : "/white.jpeg"}`}
      className="w-60 h-40 p-3 border-2 border-solid border-[#e2be75] object-cover bg-gradient-to-t from-[#bf953f] via-[#b38728] to-[#fbf5b7] drop-shadow-md shrink"
      onClick={() => {
        setCurrentUrl(userArtUrl);
        setSelected(!selected);
        updateCount();
      }}
    />
  );
};

export default LandscapeRectangleFrame;
