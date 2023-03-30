import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchUserArtAsync,
  selectUserArt,
  deleteUserArtAsync,
  createUserArtAsync,
} from "../userArt/allUsersArtSlice";
import styles from "../styles/MyArt.module.css";

/**
 * `MyArt` component
 */
const MyArt = ({ setImageUrl, setCompColor }) => {
  const dispatch = useDispatch();

  //redux state
  const username = useSelector((state) => state.auth.me.username);
  const { id } = useSelector((state) => state.auth.me);
  const art = useSelector(selectUserArt);
  const navigate = useNavigate();

  //hook that dispatchs a thunk to fetch user art. Dependent on dispatch and user id.
  useEffect(() => {
    dispatch(fetchUserArtAsync(id));
  }, [dispatch, id]);

  /**
   * `RenderArt` component
   */
  const RenderArt = () => {
    if (art.length === 0) {
      return <h2>You haven't uploaded any art yet.</h2>;
    }

    //--------------------------------------------------
    //#region User Art Feature
    //--------------------------------------------------

    const [file, setFile] = useState([]);

    const uploadFile = (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("id", id);

      dispatch(
        createUserArtAsync(formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      );
    };

    const fileSelectedHandler = (event) => {
      setFile(event.target.files[0]);
    };

    //#endregion User Art Upload Feature

    const handleDelete = (e, id) => {
      e.preventDefault();
      dispatch(deleteUserArtAsync(id));
      navigate("/create");
    };

    return (
      <div className={styles.parentDiv}>
        <hr className={styles.hr} />
        <div>
          <form
            method="post"
            action="#"
            onSubmit={uploadFile}
            className={styles.artUploader}
          >
            <label className={styles.fileUpload}>
              <input
                type="file"
                accept="image/*"
                onChange={fileSelectedHandler}
              />
              Choose file
            </label>
            <button className={styles.submitBtn}>Upload ⇪</button>
          </form>
          <div className={styles.numImagesContainer}>
            <h2 className={styles.myArtH2}>
              You have {art.length} piece(s) of art.
            </h2>
            <div className={styles.userArtContainer}>
              {art?.map((piece, i) => {
                return (
                  <div key={`inside myArt list-${i}`}>
                    <img
                      src={piece.s3Url}
                      className={styles.myArtImg}
                      onClick={() => {
                        setImageUrl(piece.s3Url);
                        setCompColor(piece.complimentaryColor);
                      }}
                    />
                    <button onClick={(e) => handleDelete(e, piece.id)}>
                      X
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className={styles.parentDiv}>
      <h1 className={styles.myArtH1}>{`${username}'s Art`}</h1>
      <RenderArt />
    </div>
  );
};

export default MyArt;
