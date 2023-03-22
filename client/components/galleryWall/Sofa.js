import React, { useState } from "react";

/**
 * `Sofa` component 
 * @returns HTML for select sofa image
 */
const Sofa = () => {
  const [selectedSofa, setSelectedSofa] = useState("sofaBeigeRounded");

  /**
   * `getSofaForLayout` switches the imageUrl of the sofa based on a user's input.
   * @returns HTML for the correct sofa image 
   */
  const getSofaForLayout = () => {
    switch (selectedSofa) {
      case "sofaBeigeRounded":
        return <img src="/sofa-beige-rounded.png" className="max-w-[900px]" />;
        break;
      case "sofaTealVelvet":
        return <img src="/sofa-teal-velvet.png" className="max-w-[900px]" />;
    }
  };
  return (
    <>
      {getSofaForLayout()}
      <label htmlFor="sofaSelection">Choose your furniture:</label>
      <label htmlFor="sofaBeigeRounded">Sofa Beige Rounded</label>
      <input
        type="radio"
        onChange={() => setSelectedSofa("sofaBeigeRounded")}
        checked={selectedSofa === "sofaBeigeRounded"}
      />
      <label htmlFor="sofaTealVelvet">Mid Century Modern Velevet Sofa</label>
      <input
        type="radio"
        onChange={() => setSelectedSofa("sofaTealVelvet")}
        checked={selectedSofa === "sofaTealVelvet"}
      />
    </>
  );
};

export default Sofa;
