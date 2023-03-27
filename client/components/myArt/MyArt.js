import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserArtAsync, selectUserArt } from "../userArt/allUsersArtSlice";

/**
 * `MyArt` component
 */
const MyArt = ({ setImageUrl, setCompColor }) => {
  const dispatch = useDispatch();

  //redux state
  const username = useSelector((state) => state.auth.me.username);
  const { id } = useSelector((state) => state.auth.me);
  const art = useSelector(selectUserArt);

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
    return (
      <div>
        <h2>You have {art.length} piece(s) of art.</h2>
        <div>
          {art?.map((piece) => {
            return (
              <img
                src={piece.s3Url}
                className="w-40 h-60 p-3 object-cover drop-shadow-md shrink"
                key={piece.id}
                onClick={() => {
                  setImageUrl(piece.s3Url);
                  setCompColor(piece.complimentaryColor);
                }}
              />
            );
          })}
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
