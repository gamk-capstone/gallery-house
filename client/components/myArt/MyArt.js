import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserArtAsync, deleteUserArtAsync, selectUserArt } from "../userArt/UserArtSlice";

const MyArt = forwardRef((props, _ref) => {
  const username = useSelector((state) => state.auth.me.username);
  const { id } = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();
  const art = useSelector(selectUserArt);
  const [imgUrl, setImgUrl] = useState(null);

  useImperativeHandle(_ref, () => ({
    getImgUrl: () => {
      return imgUrl;
    },
  }));

  useEffect(() => {
    dispatch(fetchUserArtAsync(id));
  }, [dispatch, id]);

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
            <div>
          <img src={piece.s3Url} className="w-40 h-60 p-3 object-cover drop-shadow-md shrink" key={piece.id} onClick={() => {
            setImgUrl(piece.s3Url)
          }}/>
          </div>
        )
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
});

export default React.memo(MyArt);
