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
      //Guard case: First check if the user has selected this frame, if they have
      //Set generate false.
      // if (selected) {
      //   setThisGenerate(false);
      // }
      //Guard case: Then check if the currentUrl is userArtUrl, if it is
      //Set generate false.
      if (currentUrl === userArtUrl) {
        setThisGenerate(false);
      }
    };
    updateFrameStatus();
  }, [currentUrl]);

  useEffect(() => {
    const populateWithEtsyImg = () => {
      //Otherwise, generate is true. Populate this frame.
      if (thisGenerate) {
        //setCurrentUrl === estyUrl
        setCurrentUrl(etsyImages[1]);
      } else {
        currentUrl === currentUrl;
      }
    };
    populateWithEtsyImg();
  }, [generate]);

  console.log("thisGenerate in frame", thisGenerate);
  console.log("thisCurrentUrl", currentUrl);

  return (
    <img
      src={`${selected || generate ? currentUrl: "/white.jpeg"}`}
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
