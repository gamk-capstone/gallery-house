import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserWalls, fetchUserWallsAsync,
} from "./userWallsSlice";
import { Link, useParams } from "react-router-dom";
import { selectUserObject } from "../auth/authSlice";

const User = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const userWalls = useSelector(selectUserWalls);
  const userObject = useSelector(selectUserObject);
  console.log(userWalls);

  useEffect(() => {
    dispatch(fetchUserWallsAsync(userId));
  }, [dispatch]);

  return (
    <section className="container">

      <h1>Welcome, {userObject.username}</h1>
      <h2>My Saved Galleries</h2>

      <div id="userSavedGalleries">
        {userWalls.map((userWall) => (
        <div className="gallery" key={userWall.id}>
          <Link to={`/user/galleries/${userWall.id}`}>
            <h3>{userWall.name}</h3>
          </Link>
      </div>
        ))}
      </div>

    </section>
  );
};

export default User;