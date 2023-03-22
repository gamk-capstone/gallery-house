import React from "react";

/**
 * `SquareFrame` component
 * @returns HTML for square frame 
 */
const SquareFrame = () => {
  return (
    <img
      src="/white.jpeg"
      className="w-40 h-40 p-3 border-2 border-solid border-[#e2be75] object-cover bg-gradient-to-t from-[#bf953f] via-[#b38728] to-[#fbf5b7] drop-shadow-md shrink"
    />
  );
};

export default SquareFrame;
