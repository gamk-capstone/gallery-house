import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchWallsAsync,
  selectGalleryWall,
} from "../galleryWall/galleryWallSlice";

const SavedWalls = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const { id } = useSelector((state) => state.auth.me);
  const walls = useSelector(selectGalleryWall);
  const dispatch = useDispatch();

  const [savedWalls, setSavedWalls] = useState([]);

  useEffect(() => {
    dispatch(fetchWallsAsync(id));
    // setSavedWalls(getSavedWalls);
  }, [dispatch]);

  console.log("SAVED WALLS________", walls);

  return (
    <div className="galleryWallParentDiv">
      <div>{username}'s Saved Galleries! </div>
      {walls ? (
        walls.map((wall, i) => {
          return (
            <div key={`Inside all saved walls view: ${i}`}>
              {/* <Link to="">
                {`/user/${userId}/walls/${wallId}`} */}
                {wall.id}
              {/* </Link> */}
            </div>
          );
        })
      ) : (
        <div>
          You don't have any galleries yet. Start{" "}
          <span>
            <Link to="/create">creating!</Link>
          </span>
        </div>
      )}
    </div>
  );
};

export default SavedWalls;
