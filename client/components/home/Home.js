import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";

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
    <div className={styles.homeParentContainer}>
      <div className={styles.boxContainer}>
        <h1 className={styles.homeH1}>So much color, so little time.</h1>
        <h2 className={styles.homeH2}>
          We match your art to complimentary pieces from Etsy sellers, allowing
          you to seamlessly create custom gallery walls informed by color
          theory.
        </h2>
        <button onClick={navigateToLogin} className={styles.startCreatingBtn}>
          Start Creating
        </button>
      </div>
    </div>
  );
};

export default Home;
