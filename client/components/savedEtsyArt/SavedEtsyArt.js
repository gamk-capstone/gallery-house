import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSavedEtsyArtAsync,
  selectSavedEtsyArt,
  deleteSavedEtsyArtAsync,
} from "./savedEtsyArtSlice";
import styles from "../styles/SavedEtsyArt.module.css";

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
      return (
        <h2 className={styles.savedArtH2}>
          You haven't saved any Etsy art yet.
        </h2>
      );
    }
    return (
      <div>
        <h2 className={styles.savedArtH2}>
          You have {savedEtsyArt?.length} piece(s) of Etsy art saved.
        </h2>
        <div>
          {savedEtsyArt?.map((piece) => {
            return (
              <div key={piece.id}>
                <img
                  src={piece.imageUrl}
                  className={styles.savedArtImg}
                  onClick={() => setImageUrl(piece.imageUrl)}
                />
                <section className="img-buttons">
                  <a href={piece.purchaseUrl} target="_blank">
                    <button>Nav</button>
                  </a>
                  <button
                    onClick={() => dispatch(deleteSavedEtsyArtAsync(piece.id))}
                  >
                    Unlike
                  </button>
                </section>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <div className={styles.savedArtContainer}>
      <h1 className={styles.savedArtH1}>{`${username}'s Saved Etsy Art`}</h1>
      <hr className={styles.hr} />
      <RenderSavedEtsyArt />
    </div>
  );
};

export default SavedEtsyArt;
