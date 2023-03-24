import React from "react";
/**
 * `Home` component
 * @returns HTML for the Gallery House landing page
 */
const Home = () => {
  return (
    <div className="flex flex-col items-center pt-[3rem]">
      <div className="flex flex-col bg-yellow w-[60%] p-40">
        <h1 className="font-logo-font text-dark-pink text-7xl">
          So much color, so little time.
        </h1>
        <p className="font-house-regular-italic text-dark-pink text-xl">
          We match your art to complimentary pieces from Esty sellers so that
          you can seamlessly create beautiful custom gallery walls informed by
          color theory
        </p>
        <button>Start Creating</button>
      </div>
    </div>
  );
};

export default Home;
