import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSavedEtsyArtAsync,
  selectSavedEtsyArt,
  deleteSavedEtsyArtAsync
} from "./savedEtsyArtSlice";

const SavedEtsyArt = ({ setImageUrl }) => {
  const username = useSelector((state) => state.auth.me.username);
  const { id } = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();
  const savedEtsyArt = useSelector(selectSavedEtsyArt);

  useEffect(() => {
    dispatch(fetchSavedEtsyArtAsync(id));
  }, [dispatch, id]);


  const RenderSavedEtsyArt = () => {
    if (savedEtsyArt?.length === 0) {
      return <h2>You haven't saved any Etsy art yet.</h2>;
    }
    return (
      <div>
        <h2>You have {savedEtsyArt?.length} piece(s) of Etsy art saved.</h2>
        <div>
          {savedEtsyArt?.map((piece) => {
            return (
              <div key={piece.id}>
                <img
                  src={piece.imageUrl}
                  className="w-40 h-60 p-3 object-cover drop-shadow-md shrink"
                  onClick={() => setImageUrl(piece.imageUrl)}
                />
                <section className="img-buttons">
                  <a href={piece.purchaseUrl} target="_blank">
                    <button>Nav</button>
                  </a>
                  <button onClick={() => dispatch(deleteSavedEtsyArtAsync(piece.id))}>Unlike</button>
                </section>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <div className="savedEtsyArt-container">
      <h1>{`${username}'s Saved Etsy Art`}</h1>
      <RenderSavedEtsyArt />
    </div>
  );
};

export default SavedEtsyArt;
