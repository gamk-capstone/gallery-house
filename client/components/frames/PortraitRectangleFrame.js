import React, { useState } from "react";

const PortraitRectangleFrame = ({ userArtUrl }) => {
  const [selected, setSelected] = useState(false)
  const [currentUrl, setCurrentUrl] = useState(null);

  return (
    <img
      src={`${selected ? currentUrl : "/white.jpeg"}`}
      className="w-40 h-60 p-3 border-2 border-solid border-[#e2be75] object-cover bg-gradient-to-t from-[#bf953f] via-[#b38728] to-[#fbf5b7] drop-shadow-md shrink"
      onClick={() => {
        setCurrentUrl(userArtUrl);
        setSelected(!selected);
      }}
    />
  );
};

export default PortraitRectangleFrame;
