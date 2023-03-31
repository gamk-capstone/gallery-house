import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchWallsAsync,
  selectSavedWalls,
  deleteWallById,
} from "../savedWalls/savedWallsSlice";
import styles from "../styles/SavedWalls.module.css";

const SavedWalls = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //redux state
  const username = useSelector((state) => state.auth.me.username);
  const { id } = useSelector((state) => state.auth.me);
  const walls = useSelector(selectSavedWalls);

  //a hook that dispatches a thunk to fetch all the walls assosiated with the user. Dependent on dispatch.
  useEffect(() => {
    dispatch(fetchWallsAsync(id));
  }, [dispatch]);

  //`handleDeleteWall` dispatches a thunk to delete data at /api/user/:userId/walls/:wallId and filters the local state accordingly.
  const handleDeleteWall = async (evt, wallId) => {
    evt.preventDefault();
    dispatch(deleteWallById(wallId));
    // setUpdatedWalls(walls.filter((w) => w.id !== wallId));
    navigate("/saved");
  };

  return (
    <div className={styles.savedWallsParentDiv}>
      <div className={styles.savedWallsContainer}>
        <div className={styles.savedWallsHeader}>
          {username}'s Saved Galleries!{" "}
        </div>
        {walls ? (
          walls.map((wall, i) => {
            return (
              <div
                key={`Inside all saved walls view: ${i}`}
                className={styles.savedWallContainer}
              >
                <div className={styles.singleSavedWall}>
                  <Link
                    to={`/saved/${wall.id}`}
                    className={styles.savedWallsNameLink}
                  >
                    {i + 1}. {wall.name}
                  </Link>
                  <button
                    onClick={(evt) => handleDeleteWall(evt, wall.id)}
                    className={styles.deleteBtn}
                  >
                    x
                  </button>
                </div>
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
    </div>
  );
};

export default SavedWalls;
