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
    <div className="flex flex-col items-center pt-[3rem]">
      <div className="flex flex-col items-center gap-6 bg-yellow w-[80%] p-40">
        <h1 className="font-logo-font text-dark-pink text-7xl w-[90%]">
          So much color, so little time.
        </h1>
        <p className="font-house-regular-italic text-dark-pink text-2xl w-[90%]">
          We match your art to complimentary pieces from Esty sellers, allowing
          you to seamlessly create custom gallery walls informed by color
          theory.
        </p>
        <button
          onClick={navigateToLogin}
          className="py-2 px-4 text-dark-pink font-house-regular text-2xl max-w-[10rem] rounded-full border-4 border-dark-pink hover:border-black hover:text-black"
        >
          Start Creating
        </button>
      </div>
    </div>
  );
};

export default Home;
