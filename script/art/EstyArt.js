import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectArt, fetchOneHundredListingIdsAsync } from "./estyArtSlice";

const EstyArt = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const art = useSelector(selectArt);

  useEffect(() => {
    dispatch(fetchOneHundredListingIdsAsync());
    setLoading(false);
  }, [dispatch]);

  console.log("art", art);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <p>
        {art.map((a) => {
          <a href={a.url}>{a.title}</a>;
        })}
      </p>
    </div>
  );
};

export default EstyArt;
