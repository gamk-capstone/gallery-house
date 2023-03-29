import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchWallsAsync,
  selectSavedWalls,
  deleteWallById,
} from "../savedWalls/savedWallsSlice";

const SavedWalls = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const { id } = useSelector((state) => state.auth.me);
  const walls = useSelector(selectSavedWalls);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [updatedWalls, setUpdatedWalls] = useState([]);

  useEffect(() => {
    dispatch(fetchWallsAsync(id));
    // setSavedWalls(getSavedWalls);
  }, [dispatch]);

  //`handleDeleteWall` dispatches a thunk to delete data at /api/user/:userId/walls/:wallId and filters the local state accordingly.
  const handleDeleteWall = async (evt, wallId) => {
    evt.preventDefault();
    dispatch(deleteWallById(wallId));
    // setUpdatedWalls(walls.filter((w) => w.id !== wallId));
    navigate("/saved");
  };

  return (
    <div className="savedWallsParentDiv">
      <div className="savedWallsContainer">
        <div className="savedWallsHeader">{username}'s Saved Galleries! </div>
        {walls ? (
          walls.map((wall, i) => {
            return (
              <div key={`Inside all saved walls view: ${i}`}>
                <Link to={`/saved/${wall.id}`} className="savedWallsNameLink">
                  {i + 1}. {wall.name}
                </Link>
                <button
                  onClick={(evt) => handleDeleteWall(evt, wall.id)}
                  className="deleteBtn"
                >
                  x
                </button>
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
