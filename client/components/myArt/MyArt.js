import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchUserArtAsync,
  selectUserArt,
  deleteUserArtAsync,
  createUserArtAsync,
} from "../userArt/allUsersArtSlice";

const MyArt = ({ setImageUrl, setCompColor }) => {
  const username = useSelector((state) => state.auth.me.username);
  const { id } = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();
  const art = useSelector(selectUserArt);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserArtAsync(id));
  }, [dispatch, id]);

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

      console.log(formData);

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
      <div>
        <form method="post" action="#" onSubmit={uploadFile}>
          <input type="file" accept="image/*" onChange={fileSelectedHandler} />
          <button>Upload</button>
        </form>
        <div>
          <h2>You have {art.length} piece(s) of art.</h2>
          <div>
            {art?.map((piece, i) => {
              return (
                <div key={`inside myArt list-${i}`}>
                  <img
                    src={piece.s3Url}
                    className="w-40 h-60 p-3 object-cover drop-shadow-md shrink"
                    onClick={() => {
                      setImageUrl(piece.s3Url);
                      setCompColor(piece.complimentaryColor);
                    }}
                  />
                  <button onClick={(e) => handleDelete(e, piece.id)}>X</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="myArt-container">
      <h1>{`${username}'s Art`}</h1>
      <RenderArt />
    </div>
  );
};

export default MyArt;
