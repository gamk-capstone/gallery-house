import React from "react";
import { useNavigate } from "react-router-dom";
/**
 * `Home` component
 * @returns HTML for the Gallery House landing page
 */
const Home = () => {
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="homeParentContainer">
      <div className="boxContainer">
        <h1 className="homeH1">So much color, so little time.</h1>
        <h2 className="homeH2">
          We match your art to complimentary pieces from Esty sellers, allowing
          you to seamlessly create custom gallery walls informed by color
          theory.
        </h2>
        <button onClick={navigateToLogin} className="startCreatingBtn">
          Start Creating
        </button>
      </div>
    </div>
  );
};

export default Home;
