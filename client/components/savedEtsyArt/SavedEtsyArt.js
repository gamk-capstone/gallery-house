import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSavedEtsyArtAsync,
  selectSavedEtsyArt,
  deleteSavedEtsyArtAsync,
} from "./savedEtsyArtSlice";
import { useCollapse } from "react-collapsed";
import styles from "../styles/SavedEtsyArt.module.css";

const SavedEtsyArt = ({ setImageUrl, setSavedPurchaseUrl }) => {
  const username = useSelector((state) => state.auth.me.username);
  const { id } = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();
  const savedEtsyArt = useSelector(selectSavedEtsyArt);

  useEffect(() => {
    dispatch(fetchSavedEtsyArtAsync(id));
  }, [dispatch, id]);

  // Collapsed state
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  const RenderSavedEtsyArt = () => {
    if (savedEtsyArt?.length === 0) {
      return (
        <h2 className={styles.savedArtH2}>
          You haven't saved any Etsy art yet.
        </h2>
      );
    }
    return (
      <div className={styles.savedArtContainer}>
        <h2 className={styles.savedArtH2}>
          You have {savedEtsyArt?.length} piece(s) of Etsy art saved.
        </h2>
        <div className={styles.savedArtImgsContainer}>
          {savedEtsyArt?.map((piece) => {
            return (
              <div className={styles.imgContainer} key={piece.id}>
                <img src={piece.imageUrl} className={styles.savedArtImg} />
                <section className={styles.buttons}>
                <button onClick={() => {
                          setImageUrl(piece.imageUrl);
                          setSavedPurchaseUrl(piece.purchaseUrl);
                          }}>
                          <span className="material-symbols-outlined">
                            content_copy
                          </span>
                        </button>
                  <a href={piece.purchaseUrl} target="_blank">
                    <button>
                      <span className="material-symbols-outlined">
                        shopping_cart
                      </span>
                    </button>
                  </a>
                  <button
                    onClick={() => dispatch(deleteSavedEtsyArtAsync(piece.id))}
                  >
                    <span className="material-symbols-outlined">
                      heart_broken
                    </span>
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
    <div>
      <div className={styles.collapseHeader} {...getToggleProps()}>
        {isExpanded ? "Collapse ^" : "View Your Saved Etsy Art ⌄"}
      </div>
      <div {...getCollapseProps()}>
        <div>
          <div className={styles.savedArtContainer}>
            <h1
              className={styles.savedArtH1}
            >{`${username}'s Saved Etsy Art`}</h1>
            <hr className={styles.hr} />
            <RenderSavedEtsyArt />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedEtsyArt;
