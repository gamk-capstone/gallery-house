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
      {/* {getSofaForLayout()}
      <label for="sofaSelection">Choose your furniture:</label>
      <input type="radio" onClick={setSelectedSofa("sofaBeigeRounded")}>
        Modern Rounded Sofa
      </input>
      <input type="radio" onClick={setSelectedSofa("sofaTealVelvet")}>
        Mid Century Modern Velevet Sofa
      </input> */}
      <img src="/sofa-beige-rounded.png" className="sofaImage" />
    </>
  );
};

export default Sofa;
