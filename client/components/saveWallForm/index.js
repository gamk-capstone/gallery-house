import React, { useState } from "react";
import styles from "../styles/SavedWallForm.module.css";

/**
 * SavedWallForm component
 */
const SavedWallForm = ({ wallName, setWallName, handleSaveWall }) => {
  return (
    <form onSubmit={handleSaveWall}>
      <div className={styles.inputSubmitContainer}>
        {/* Input for wallName value */}
        <input
          name="wallName"
          value={wallName}
          onChange={(e) => setWallName(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.submitBtn}>
          Save
        </button>
      </div>
    </form>
  );
};

export default SavedWallForm;
