import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserArtAsync,
  selectUserArt,
  deleteUserArtAsync,
} from "../userArt/allUsersArtSlice";
import styles from "../styles/MyArt.module.css";

const MyArt = ({ setImageUrl, setCompColor }) => {
  const username = useSelector((state) => state.auth.me.username);
  const { id } = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();
  const art = useSelector(selectUserArt);

  useEffect(() => {
    dispatch(fetchUserArtAsync(id));
  }, [dispatch, id]);

  const handleDelete = (id) => {
    dispatch(deleteUserArtAsync(id));
  };

  const RenderArt = () => {
    if (art.length === 0) {
      return (
        <h2 className={styles.myArtH2}>You haven't uploaded any art yet.</h2>
      );
    }
    return (
      <div>
        <h2 className={styles.myArtH2}>
          You have {art.length} piece(s) of art.
        </h2>
        <div>
          {art?.map((piece) => {
            return (
              <div>
                <img
                  src={piece.s3Url}
                  className="w-40 h-60 p-3 object-cover drop-shadow-md shrink"
                  key={piece.id}
                  onClick={() => {
                    setImageUrl(piece.s3Url);
                    setCompColor(piece.complimentaryColor);
                  }}
                />
                <button onClick={() => handleDelete(piece.id)}>Delete</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <div className={styles.myArtContainer}>
      <h1 className={styles.myArtH1}>{`${username}'s Art`}</h1>
      <hr className={styles.hr} />
      <RenderArt />
    </div>
  );
};

export default MyArt;
