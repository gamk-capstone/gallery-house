import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchWallsAsync,
  selectGalleryWall,
} from "../galleryWall/galleryWallSlice";

const SavedWall = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const { id } = useSelector((state) => state.auth.me);
  const walls = useSelector(selectGalleryWall);
  const dispatch = useDispatch();

  // const [savedWalls, setSavedWalls] = useState([]);

  useEffect(() => {
    dispatch(fetchWallsAsync(id));
    // setSavedWalls(getSavedWals);
  }, [dispatch]);

  return (
    <div className="galleryWallParentDiv">
      <div>{username}'s Saved Galleries! </div>
      {walls ? (
        walls.map((wall) => {
          <div>{wall.id}</div>;
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

export default SavedWall;
