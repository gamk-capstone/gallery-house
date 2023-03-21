import React, { useState } from "react";

const Sofa = () => {
  const [selectedSofa, setSelectedSofa] = useState("sofaBeigeRounded");
  const getSofaForLayout = () => {
    switch (selectedSofa) {
      case "sofaBeigeRounded":
        return <img src="/sofa-beige-rounded.png" className="sofaImage" />;
        break;
      case "sofaTealVelvet":
        return <img src="/sofa-teal-velvet.png" className="sofaImage" />;
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
