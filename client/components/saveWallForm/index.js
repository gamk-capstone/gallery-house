import React, { useState } from "react";

/**
 * SavedWallForm component
 */
const SavedWallForm = ({ wallName, setWallName, handleSaveWall }) => {
  return (
    <form onSubmit={handleSaveWall}>
      <label htmlFor="wallName">Give your wall a name:</label>
      <div>
        {/* Input for wallName value */}
        <input
          name="wallName"
          value={wallName}
          onChange={(e) => setWallName(e.target.value)}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default SavedWallForm;
