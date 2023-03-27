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
      <div className="flex flex-col bg-yellow w-[60%] p-40">
        <h1 className="font-logo-font text-dark-pink text-7xl">
          So much color, so little time.
        </h1>
        <p className="font-house-regular-italic text-dark-pink text-2xl">
          We match your art to complimentary pieces from Esty sellers so that
          you can seamlessly create beautiful custom gallery walls informed by
          color theory
        </p>
        <button
          onClick={navigateToLogin}
          className="py-2 px-4 text-dark-pink font-house-regular text-xl rounded-full border-4 border-dark-pink hover:border-pink hover:text-pink"
        >
          Start Creating
        </button>
      </div>
    </div>
  );
};

export default Home;
