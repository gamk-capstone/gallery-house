import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectArt, fetchAllArtAsync } from "../../../script/art/artSlice";

const GalleryWall = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const art = useSelector(selectArt);

  useEffect(() => {
    dispatch(fetchAllArtAsync());
    setLoading(false);
  }, [dispatch]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <p>{username}'s Gallery Wall! </p>
      <p>art: {art}</p>
    </div>
  );
};

export default GalleryWall;
