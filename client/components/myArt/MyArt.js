import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchUserArtAsync,
  selectUserArt,
  deleteUserArtAsync,
  createUserArtAsync,
} from "../userArt/allUsersArtSlice";
import { useCollapse } from "react-collapsed";
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

  // Collapsed state
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  /**
   * `RenderArt` component
   */
  const RenderArt = () => {
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
              You have {art.length} piece(s) of art.{" "}
            </h2>
            {art.length === 0 ? (
              <h2 className={styles.myArtH2}>
                You haven't uploaded any art yet.
              </h2>
            ) : (
              <div className={styles.userArtContainer}>
                {art?.map((piece, i) => {
                  return (
                    <div className={styles.imgContainer} key={`inside myArt list-${i}`}>
                      <img
                        src={piece.s3Url}
                        className={styles.myArtImg}
                      />
                      <section className={styles.buttons}>
                        <button onClick={() => {
                          setImageUrl(piece.s3Url);
                          setCompColor(piece.complimentaryColor);}}>
                          <span className="material-symbols-outlined">
                            content_copy
                          </span>
                        </button>
                        <button onClick={(e) => handleDelete(e, piece.id)}>
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </section>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className={styles.collapseHeader} {...getToggleProps()}>
        {isExpanded ? "Collapse ^" : "Upload and View Your Art ⌄"}
      </div>
      <div {...getCollapseProps()}>
        <div>
          <div className={styles.parentDiv}>
            <h1 className={styles.myArtH1}>{`${username}'s Art`}</h1>
            <hr className={styles.hr} />
            <RenderArt />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyArt;
